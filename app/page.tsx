import '@/_styles/reset.scss';
import styles from '@/_styles/rootPage.module.scss';

import { Pagination } from './_components/Pagination';
import { ChannelPanel } from '@/channels/_components/ChannelPanel';
import { ErrorBoundaryExtended } from '@/_components/ErrorBoundary';
import { HikasenVtuber } from './(types)';
import { fetchExtend } from './_utile/fetch';

const getChannel = async (offset: string): Promise<HikasenVtuber[]> => {
  const BASE_QUERY_COUNT = 20;
  const query =
    Number(offset) === 1
      ? ''
      : `?offset=${BASE_QUERY_COUNT * (Number(offset) - 1)}&limit=20`;

  const URL = `${process.env.CHANNELLIST_URL}`;
  const res = await fetch(URL);
  if (!res.ok) {
    throw new Error(`${res.status}`);
  }

  const data = await res.json();

  if (typeof data === 'number') {
    throw new Error(`${data}`);
  }

  return data;
};

export default async function Home() {
  const channels = await getChannel('1');
  return (
    <section className={styles.content}>
      <ErrorBoundaryExtended>
        <ChannelPanel channels={channels} />

        <Pagination basePath="channels" currentPageNumber={1} />
      </ErrorBoundaryExtended>
    </section>
  );
}
