import { fetchExtend } from '@/_utile/fetch';
export const useTESTHook = async () => {
  const result = await fetchExtend({ url: '/hogehoge' });

  return result;
};
