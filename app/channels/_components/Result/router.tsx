import { getChannelWhere } from '@/channels/_lib/api/getChannelWhere';
import { ChannelPanel } from '@/channels/_components/ChannelPanel';
import { ChannelSearchParams } from '@/channels/(types)';
import { Pagination } from '@/_components/Pagination';
import { ErrorBoundaryExtended } from '@/_components/ErrorBoundary';
import { Accordion } from '@/_components/Accordion';

import { SearchCategories } from '@/channels/_components/Search/SearchCategories';

import styles from '@/_styles/rootPage.module.scss';
import { Prisma } from '@prisma/client';

interface IProps {
  page: string;
  params: ChannelSearchParams;
  query: Prisma.ChannelWhereInput;
}

export const ChannelResult = async ({ page, params, query }: IProps) => {
  const [channels, count, test] = await getChannelWhere(query, params, page);

  return (
    <section className={styles.content}>
      <Accordion title="さらにVtuberを探す">
        <SearchCategories params={params} />
      </Accordion>
      <ErrorBoundaryExtended>
        <ChannelPanel channels={channels} />

        <Pagination<ChannelSearchParams>
          basePath="channels/result/"
          query={params}
          currentPageNumber={Number(page)}
          totalCount={count}
        />
      </ErrorBoundaryExtended>
    </section>
  );
};
