import styles from '@/_styles/rootPage.module.scss';

import { Pagination } from './_components/Pagination';
import { ChannelPanel } from '@/channels/_components/ChannelPanel';
import { ErrorBoundaryExtended } from '@/_components/ErrorBoundary';
import { HikasenVtuber } from './(types)';
import { getChannelOffset, getChannelCount } from './_utile/prisma';
import Link from 'next/link';

const getChannel = async (): Promise<readonly [HikasenVtuber[], number]> => {
  const channels = await getChannelOffset(0);
  const count = await getChannelCount();

  return [channels, count] as const;
};

export default async function Home() {
  const [channels, totalCount] = await getChannel();
  return (
    <section className={styles.content}>
      <div className={styles.search_container}>
        <Link className={styles.link} href={'/channels/search'}>
          配信者を探す→
        </Link>
      </div>
      <ErrorBoundaryExtended>
        <ChannelPanel channels={channels} />

        <Pagination
          basePath="channels"
          currentPageNumber={1}
          totalCount={totalCount}
        />
      </ErrorBoundaryExtended>
    </section>
  );
}
