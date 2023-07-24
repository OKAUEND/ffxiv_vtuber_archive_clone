import styles from '@/_styles/rootPage.module.scss';

import { getChannel } from '@/channels/_lib/api/getChannel';
import { ChannelIndex } from '@/channels/_components/ChannelIndex';
import Link from 'next/link';

export default async function Article({
  params,
}: {
  params: { pages: string };
}) {
  const [channels, count] = await getChannel(params.pages);
  return (
    <div className={styles.content}>
      <div className={styles.search_container}>
        <Link className={styles.link} href={'/channels/search'}>
          配信者を探す→
        </Link>
      </div>
      <ChannelIndex
        totalCount={count}
        channels={channels}
        page={params.pages}
      />
    </div>
  );
}
