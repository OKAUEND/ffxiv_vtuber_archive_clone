import { getChannelWhere } from '@/channels/_lib/api/getChannelWhere';
import { ChannelPanel } from '@/channels/_components/ChannelPanel';
import { ChannelSearchParams } from '@/channels/(types)';
import { Pagination } from '@/_components/Pagination';
import { ErrorBoundaryExtended } from '@/_components/ErrorBoundary';
import { Accordion } from '@/_components/Accordion';

import { SearchCategories } from '@/channels/_components/Search/SearchCategories';

import { ChannelIndex } from '@/channels/_components/ChannelIndex';

import styles from '@/_styles/rootPage.module.scss';

interface IProps {
  page: string;
  params: ChannelSearchParams;
}

export const ChannelResult = async ({ page, params }: IProps) => {
  const [channels, count] = await getChannelWhere(params, page);

  return (
    <section className={styles.content}>
      <Accordion title="さらにVtuberを探す">
        <SearchCategories params={params} />
      </Accordion>
      <ChannelIndex
        page={page}
        totalCount={count}
        channels={channels}
        params={params}
      />
    </section>
  );
};
