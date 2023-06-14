import '@/_styles/reset.scss';
export const dynamic = 'force-dynamic';
import styles from '@/_styles/rootPage.module.scss';

import { Pagination } from './_components/Pagination';
import { getChannel } from '@/channels/_lib/api/getChannel';
import { ChannelPanel } from '@/channels/_components/ChannelPanel';
import { ErrorBoundaryExtended } from '@/_components/ErrorBoundary';

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
