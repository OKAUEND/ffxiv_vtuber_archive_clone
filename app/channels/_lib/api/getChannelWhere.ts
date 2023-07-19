import { getChannelWhereCount, getChannelWhereOffset } from '@/_utile/prisma';
import { ChannelSearchParams } from '@/channels/(types)';
import { Prisma } from '@prisma/client';

const createWhereQuery = (
  params: ChannelSearchParams
): Prisma.ChannelWhereInput => {
  const keys = Object.entries(params);

  const query = keys.reduce((acc, currentKey) => {
    //ページ数をParameterで
    if (currentKey[0] === 'orderBy') return acc;

    console.log(currentKey[1]);

    //まずは配信時間のWhere文だけを作成する
    //後にタグ検索とかを行いたいので、改修はしようね
    const beginDayTime = new Date(currentKey[1]);
    const endDayTime = new Date(currentKey[1]);
    endDayTime.setMonth(12);
    endDayTime.setSeconds(-1);

    const where: Prisma.ChannelWhereInput = {
      beginTime: {
        //開始日時
        gte: beginDayTime,
        //終了日時
        lt: endDayTime,
      },
    };

    return where;
  }, {});

  return query;
};

export const getChannelWhere = async (
  params: ChannelSearchParams,
  page: string
) => {
  const query = createWhereQuery(params);
  //モバイルでのみやすさも考慮し、20件ほどに絞る。10件だけはPCやタブレットで見るには少なすぎる
  const BASE_QUERY_COUNT = 20;
  //何も指定がないときのためのガード構文
  const offsetNumber = page ? Number(page) : 1;

  //ページ番号よりOffsetでずらす件数を作成し、+1することで、同じ要素の重複取得を防ぐ
  const skip =
    offsetNumber === 1 ? 0 : BASE_QUERY_COUNT * (offsetNumber - 1) + 1;

  const res = await getChannelWhereOffset(skip, query, 'desc');
  const count = await getChannelWhereCount(query);

  return [res, count] as const;
};
