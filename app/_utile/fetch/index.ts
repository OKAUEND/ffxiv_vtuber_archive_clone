export type FetchError = {
  hasError: boolean;
  status: number;
  message: string;
};

interface IUseFetch {
  url: string;
  store?: boolean;
}

export const fetchExtend = async <T>({
  url,
  store = true,
}: IUseFetch): Promise<T> => {
  const storeFlag: RequestInit = store
    ? { cache: 'force-cache', method: 'GET' }
    : { cache: 'no-store', method: 'GET' };

  const res = await fetch(url, storeFlag);
  if (!res.ok) {
    throw new Error(`${res.status}`);
  }

  const data: T = await res.json();

  if (typeof data === 'number') {
    throw new Error(`${data}`);
  }

  return data;
};
