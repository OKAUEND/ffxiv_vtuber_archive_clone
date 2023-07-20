import { getChannelWhereCount, getChannelWhereOffset } from '@/_utile/prisma';
import { ChannelSearchParams } from '@/channels/(types)';
import { Prisma } from '@prisma/client';

type TEST = {
  order?: string;
  beginDayTime?: Date;
  endDayTime?: Date;
};

const createWhereQuery = (params: ChannelSearchParams) => {
  const keys: [string, string][] = Object.entries(params);

  let query: Prisma.ChannelWhereInput = {};
  keys.forEach((value) => {
    switch (value[0]) {
      case 'orderBy':
      case 'sort':
        break;
      case 'year': {
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
        query = { ...query, ...where };
        break;
      }
      default:
        break;
    }
  });

  return query;
};

export const getChannelWhere = async (
  params: Prisma.ChannelWhereInput,
  test: ChannelSearchParams,
  page: string
) => {
  const query = createWhereQuery(test);
  //モバイルでのみやすさも考慮し、20件ほどに絞る。10件だけはPCやタブレットで見るには少なすぎる
  const BASE_QUERY_COUNT = 20;
  //何も指定がないときのためのガード構文
  const offsetNumber = page ? Number(page) : 1;

  //ページ番号よりOffsetでずらす件数を作成し、+1することで、同じ要素の重複取得を防ぐ
  const skip =
    offsetNumber === 1 ? 0 : BASE_QUERY_COUNT * (offsetNumber - 1) + 1;

  const res = await getChannelWhereOffset(skip, query, 'desc');
  const count = await getChannelWhereCount(params);

  return [res, count, query] as const;
};
