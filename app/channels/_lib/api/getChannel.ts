import { fetchExtend } from '@/_utile/fetch';
import { HikasenVtuber } from '@/(types)/';

export const getChannel = async (offset: string): Promise<HikasenVtuber[]> => {
  const BASE_QUERY_COUNT = 20;
  const query =
    Number(offset) === 1
      ? ''
      : `?offset=${BASE_QUERY_COUNT * (Number(offset) - 1)}&limit=20`;

  const URL = `${process.env.CHANNELLIST_URL}${query}`;
  const data = await fetchExtend<HikasenVtuber[]>({ url: URL });

  return data;
};
