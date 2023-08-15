import { Prisma } from '@prisma/client';
import { tags } from '../api/getTags';
import { ChannelSearchParams, PrismaQuery } from '@/channels/(types)';

/**
 * クエリパラメータの文字列(Code)の配列を、該当するTag情報のIDの配列へ変換をする
 * @param params
 * @returns
 */
const convertTags = (params: string | string[]): number[] => {
  //交差テーブルにはIDで紐付けられているので、codeをIDに変更をするため、データを操作し対象を探しIDを取り出す
  const targetIDs: number[] = [];

  //複数条件のクエリパラメータの場合、パラメータが配列になるが、単体だと文字列である。
  //複数条件だった場合、全てIDが存在しているかを確認する必要があり、ループでチェックをしている。
  //単体の文字列も、インデックスが1の配列にすることで、同じロジックでチェック出来るようにする
  const targetParams = Array.isArray(params) ? params : [params];

  /**
   * Tag一覧に、クエリパラメータのコードが存在するかを確認し、IDを返す事で存在していないコードを除外する
   */
  targetParams.forEach((contentCode) => {
    const target = tags.find((tag) => tag.code === contentCode);

    //存在しない場合は不正入力の可能性があるため、追加しない
    if (typeof target === 'undefined') return;

    targetIDs.push(target.id);
  });

  return targetIDs;
};

/**
 * TagIDが交差テーブルTaggingテーブルに存在するかを検索するために、
 * TaggingテーブルをLeftJoinをしたWere文を作成する。
 * @param tagIds
 * @returns
 */
export const createWhereQueryJoinTagging = <T>(
  tagIds: T[]
): Prisma.ChannelWhereInput => {
  //検索対象が存在しない場合は、Where文のORで作成すると対象レコード無しのOR文が作成され、
  //対象無しの場合は全件対象にしたいのにそれができないため、空のオブジェクトを返す
  if (tagIds.length === 0) return {};

  const ids: Prisma.TaggingWhereInput[] = tagIds.map((id) => {
    return {
      tag_id: id,
    };
  });

  return { tags: { some: { OR: [...ids] } } };
};

export const createWhereQuery = (params: ChannelSearchParams): PrismaQuery => {
  const keys: [string, string | string[]][] = Object.entries(params);

  //クエリパラメータをループで処理し、queryオブジェクトにマージしていくことで、1つの検索条件オブジェクトとする
  let year: Prisma.ChannelWhereInput = {};
  let orderBy: Prisma.SortOrder = 'desc';
  let contentQuery: Prisma.ChannelWhereInput = {};
  let playQuery: Prisma.ChannelWhereInput = {};
  let timezoneQuery: Prisma.ChannelWhereInput = {};

  keys.forEach((value) => {
    switch (value[0]) {
      case 'sort':
        if (Array.isArray(value[1])) return;

        if (value[1] === 'asc') return (orderBy = 'desc');

        orderBy = 'asc';
        break;
      case 'year': {
        if (Array.isArray(value[1])) return;

        const time = new Date(value[1]);

        //まずは配信時間のWhere文だけを作成する
        //後にタグ検索とかを行いたいので、改修はしようね
        const beginDayTime = new Date(time);
        const endDayTime = new Date(time);
        endDayTime.setMonth(12);
        endDayTime.setSeconds(-1);

        const where: Prisma.ChannelWhereInput = {
          beginTime: {
            //開始日時
            gte: beginDayTime.toISOString(),
            //終了日時
            lt: endDayTime.toISOString(),
          },
        };
        year = { ...where };
        break;
      }
      case 'content':
        contentQuery = createWhereQueryJoinTagging(convertTags(value[1]));
        break;
      case 'play':
        playQuery = createWhereQueryJoinTagging(convertTags(value[1]));
        break;
      case 'timezone':
        timezoneQuery = createWhereQueryJoinTagging(convertTags(value[1]));
        break;
      default:
        break;
    }
  });

  return {
    query: {
      content: contentQuery,
      play: playQuery,
      timeZone: timezoneQuery,
    },
    year: year,
    orderBy: orderBy,
  };
};
