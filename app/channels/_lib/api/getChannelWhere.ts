import { getChannelWhereCount, getChannelWhereOffset } from '@/_utile/prisma';
import { ChannelSearchParams } from '@/channels/(types)';
import { createWhereQuery } from '../prisma/createChannelQuery';

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

  const res = await getChannelWhereOffset(skip, query);
  const count = await getChannelWhereCount(skip, query);

  return [res, count] as const;
};
