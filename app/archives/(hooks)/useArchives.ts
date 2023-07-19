import {
  atomFamily,
  noWait,
  selectorFamily,
  useRecoilCallback,
  useRecoilValue,
} from 'recoil';
import { fetchExtend } from '@/_utile/fetch';

//---------------------------------------------------------------------------

type Archive = GoogleApiYouTubeSearchResource;

type YoutubeDate =
  GoogleApiYouTubePaginationInfo<GoogleApiYouTubeSearchResource>;

type ArchiveListState = {
  archives: readonly Archive[];
  totalArchives: number;
  mightHaveMore: boolean;
  loading: boolean;
};

type Offset = {
  channelId: string;
  beginTime?: string;
  requestedItems: number;
  offset: number;
};

type QueryInput = {
  channelId: string;
  beginTime: string;
};
//---------------------------------------------------------------------------

/**
 * 1ページで読み込みを行う値
 */
//50件だと取得回数が多すぎる、25件未満だと除外されたアーカイブがあった場合、
//1度に表示する件数が少なすぎるため、25件で固定する(※後ほど可変型にしてもいいかもしれない)
export const pageSize = 25;

/**
 * 検索したいクエリワード
 */
//配信の概要欄にクエリワードがあると、Youtubeの性質上取得されてしまうので、
//取得後にフィルタリングするために、抽出させたい単語をまとめておいた
const queryWorld = `FF14|FFXIV`;

//---------------------------------------------------------------------------

export const createQuery = ({ channelId, beginTime }: QueryInput): string => {
  const time = beginTime === '' ? new Date().toISOString() : beginTime;

  return `/api/archives/${channelId}?begin=${time}`;
};

const createNextBeginTime = (Archive: Archive[]): string => {
  //配列最後列の動画の日時より1分前を設定する
  //1分前にしないと、重複した動画を再取得してしまうため
  const baseTime = new Date(Archive.slice(-1)[0].snippet.publishedAt);
  const targetTime = new Date(baseTime.getTime() - 60 * 1000);
  return targetTime.toISOString();
};

const convertRawResultToArchives = (response: YoutubeDate): Archive[] => {
  return response.items;
};

//---------------------------------------------------------------------------

/**
 * 配信者毎に現在読み込みを行った現在値
 */
export const totalItems = atomFamily({
  key: 'data-flow/archiveList/totalItems',
  default: pageSize,
});

//---------------------------------------------------------------------------

const archiveListQuery = selectorFamily<YoutubeDate, QueryInput>({
  key: 'data-flow/archiveListQuery',
  get:
    ({ channelId, beginTime }) =>
    async () => {
      const query = createQuery({ channelId, beginTime });
      const archives = await fetchExtend<YoutubeDate>({ url: query });

      return archives;
    },
});

const isArchives = selectorFamily<boolean, QueryInput>({
  key: 'data-flow/isArchives',
  get:
    ({ channelId, beginTime = '' }) =>
    ({ get }) => {
      const result = get(archiveListQuery({ channelId, beginTime }));
      const archives = get(archiveList(channelId));
      return result.pageInfo.totalResults > archives.totalArchives;
    },
});

//
const formattedVtuberArchiveQuery = selectorFamily<
  { filteredArchive: Archive[]; originalLength: number },
  QueryInput
>({
  key: 'data-flow/archiveListQuery',
  get:
    (query) =>
    ({ get }) => {
      const archives = convertRawResultToArchives(get(archiveListQuery(query)));
      //概要欄にFF14関連の記載がある場合、Queryで絞っていても該当するため、
      //改めて放送タイトル文にFF14関連の文言が該当するものをフィルタリングする
      const reg = new RegExp(queryWorld);
      const filteredArchive = archives.filter((archive) => {
        return reg.test(archive.snippet.title);
      });

      return {
        filteredArchive: filteredArchive,
        originalLength: archives.length,
      };
    },
});

const archiveListRecursion = selectorFamily<ArchiveListState, Offset>({
  key: 'data-flow/archiveListRecursion',
  get:
    ({ channelId, beginTime, requestedItems, offset }) =>
    ({ get }): ArchiveListState => {
      //取得予定件数を、要求件数より今のオフセットよりひくことで、決定させる
      const limit = Math.min(requestedItems - offset, pageSize);

      //現在のチャンネルIDと取得開始時間を渡し、YoutubeAPIから過去のライブを取得する
      //対象以外のアーカイブはこの時点で除外されていることに注意
      //初回呼び出しだと、beginTimeはなにも指定されていないが、2回目のループからは日時を持っている
      const youtubeArchive = get(
        formattedVtuberArchiveQuery({
          channelId,
          beginTime: beginTime ?? '',
        })
      );

      //除外した配列の数で判定をすると、予定件数より必ず短い値になるため、取得完了と判定されるから
      //不足分を再取得するとその分APIのコール数が多くなるため、できるならば避けたいため、再取得はしない
      if (youtubeArchive.originalLength < limit) {
        return {
          archives: youtubeArchive.filteredArchive,
          totalArchives: youtubeArchive.originalLength,
          mightHaveMore: false,
          loading: false,
        };
      }

      //今回の要求数と一致していたら、取得を終了
      if (requestedItems === offset + limit) {
        return {
          archives: youtubeArchive.filteredArchive,
          totalArchives: youtubeArchive.originalLength,
          mightHaveMore: true,
          loading: false,
        };
      }

      //条件を満たさなかった場合、更に取得する必要があるため、自身を呼び出し再帰ループに入る
      const rest = get(
        noWait(
          archiveListRecursion({
            channelId,
            beginTime: createNextBeginTime(youtubeArchive.filteredArchive),
            requestedItems,
            offset: offset + limit,
          })
        )
      );

      //ReactのトランジクションはRecoilはまだ対応していないため、Lodableで対応する
      switch (rest.state) {
        case 'hasError': {
          throw rest.errorMaybe();
        }
        case 'loading': {
          return {
            archives: youtubeArchive.filteredArchive,
            totalArchives: youtubeArchive.originalLength,
            mightHaveMore: true,
            loading: true,
          };
        }
        case 'hasValue': {
          return {
            //読み込みが完了した場合、配列をマージしリターンで戻っていく
            archives: [
              ...youtubeArchive.filteredArchive,
              ...rest.contents.archives,
            ],
            totalArchives:
              youtubeArchive.originalLength + rest.contents.totalArchives,
            mightHaveMore: rest.contents.mightHaveMore,
            loading: false,
          };
        }
      }
    },
});

const archiveList = selectorFamily<ArchiveListState, string>({
  key: 'data-flow/archiveList',
  get:
    (channelId) =>
    ({ get }) => {
      return get(
        //ここで検索開始日時を引数で渡さないのは、日時を生成すると時刻(秒単位でも)変わると、
        //Selectorが別キャッシュとして判定し、無限に呼び出しを行うため
        archiveListRecursion({
          channelId,
          requestedItems: get(totalItems(channelId)),
          offset: 0,
        })
      );
    },
});

//---------------------------------------------------------------------------

//---------------------------------------------------------------------------
/**
 *
 * @param channelId 対象の配信者のYoutubeChannelID
 * @returns {Array} 取得済みの過去配信(アーカイブ)
 */
export const useArchives = (channelId: string) => {
  const archives = useRecoilValue(archiveList(channelId));
  /**
   * 取得件数を一定数インクリメントする
   * @param channelId sting 現在の配信者チャンネルID
   */
  const loadNextList = useRecoilCallback(({ set }) => (channelId: string) => {
    set(totalItems(channelId), (count) => count + pageSize);
  });

  return { archives, loadNextList };
};

/**
 *
 * @returns {Void} 現在の要求数をインクリメントする関数
 */
export const usePage = () => {
  /**
   * 取得予定件数をインクリメントする
   * @param channelId sting 現在の配信者チャンネルID
   */
  const loadNextList = useRecoilCallback(({ set }) => (channelId: string) => {
    set(totalItems(channelId), (count) => count + pageSize);
  });
  /**
   * 取得予定件数をデクリメントする
   * @param channelId sting 現在の配信者チャンネルID
   */
  const decrementPageSize = useRecoilCallback(
    ({ set }) =>
      (channelId: string) => {
        set(totalItems(channelId), (count) => count - pageSize);
      }
  );
  return [loadNextList, decrementPageSize];
};

/**
 *
 * @returns {boolean} 次に取得する内容が存在するかどうか
 */
export const useVisible = (channelId: string) => {
  const isVisible = useRecoilValue(isArchives({ channelId, beginTime: '' }));

  const loadNextList = useRecoilCallback(({ set }) => (channelId: string) => {
    set(totalItems(channelId), (count) => count + pageSize);
  });

  return { isVisible, loadNextList };
};
