import { ErrorBoundaryExtended } from '@/_components/ErrorBoundary';
import { ChannelSearchParams } from '@/channels/(types)';
import { ChannelPanel } from '../ChannelPanel';
import { Pagination } from '@/_components/Pagination';
import { HikasenVtuber } from '@/(types)';

interface IProps {
  channels: HikasenVtuber[];
  page?: string;
  totalCount: number;
  params?: ChannelSearchParams;
  link?: string;
}

export const ChannelIndex = ({
  channels,
  page,
  totalCount,
  params,
  link = '',
}: IProps) => {
  return (
    <ErrorBoundaryExtended>
      <ChannelPanel channels={channels} />

      <Pagination<ChannelSearchParams>
        basePath={`channels${link}`}
        query={params}
        currentPageNumber={Number(page)}
        totalCount={totalCount}
      />
    </ErrorBoundaryExtended>
  );
};
