import { ChannelSearchParams } from '@/channels/(types)';
import { ChannelResult } from '@/channels/_components/Result/router';

export default async function ChannelResultIndex({
  params,
  searchParams,
}: {
  params: { pages: string };
  searchParams: ChannelSearchParams;
}) {
  return (
    <>
      {searchParams.sort}
      {searchParams.year}
      {/* @ts-expect-error Async Server Component */}
      <ChannelResult page={params.pages} params={searchParams} />
    </>
  );
}
