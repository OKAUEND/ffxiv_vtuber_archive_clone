import { HikasenVtuber, Tags } from '@/(types)/';
import { getChannelCount, getChannelOffset } from '@/_utile/prisma';

export const getChannel = async (
  offset: string
): Promise<readonly [HikasenVtuber<Tags>[], number]> => {
  //モバイルでのみやすさも考慮し、20件ほどに絞る。10件だけはPCやタブレットで見るには少なすぎる
  const BASE_QUERY_COUNT = 20;
  //何も指定がないときのためのガード構文
  const offsetNumber = offset ? Number(offset) : 1;

  //ページ番号よりOffsetでずらす件数を作成し、+1することで、同じ要素の重複取得を防ぐ
  const skip =
    offsetNumber === 1 ? 0 : BASE_QUERY_COUNT * (offsetNumber - 1) + 1;

  const channels = await getChannelOffset(skip);
  const count = await getChannelCount();

  return [channels, count] as const;
};
