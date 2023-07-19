import { ChannelSearchParams } from '@/channels/(types)';
import { ChannelResult } from '@/channels/_components/Result/router';

const createWhereQuery = (params: ChannelSearchParams) => {
  return params.year;
};

const getChannelWhere = (params: ChannelSearchParams, page: string) => {
  const query = createWhereQuery(params);

  return query;
};

export default async function ChannelResultIndex({
  params,
  searchParams,
}: {
  params: { pages: string };
  searchParams: ChannelSearchParams;
}) {
  const res = getChannelWhere(searchParams, '');
  return (
    <>
      {res}
      {/* <ChannelResult page={params.pages} params={searchParams} /> */}
    </>
  );
}
