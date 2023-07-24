import styles from '@/_styles/rootPage.module.scss';

import { ChannelIndex } from '@/channels/_components/ChannelIndex';
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
      <ChannelIndex totalCount={totalCount} channels={channels} page="1" />
    </section>
  );
}
