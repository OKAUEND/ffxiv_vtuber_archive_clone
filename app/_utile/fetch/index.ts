export type FetchError = {
  hasError: boolean;
  status: number;
  message: string;
};

interface IUseFetch<> {
  method?: string;
  url: string;
  store?: boolean;
  body?: object | [];
}

export const fetchExtend = async <T>({
  method = 'GET',
  url,
  store = true,
  body,
}: IUseFetch): Promise<T> => {
  const storeMode: RequestCache = store ? 'force-cache' : 'no-store';

  const bodyData: RequestInit =
    method === 'POST' ? { body: JSON.stringify(body) } : {};

  const res = await fetch(url, {
    method: method,
    cache: storeMode,
    ...bodyData,
  });

  if (!res.ok) {
    throw new Error(`${res.status}`);
  }

  const data: T = await res.json();

  if (typeof data === 'number') {
    throw new Error(`${data}`);
  }

  return data;
};
