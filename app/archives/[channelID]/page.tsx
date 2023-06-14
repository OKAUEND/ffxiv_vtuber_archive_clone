import dynamic from 'next/dynamic';

const DynamicArchiveClientComponent = dynamic(
  () => import('@/archives/_components'),
  { ssr: false }
);

export default async function Article({
  params,
}: {
  params: { channelID: string };
}) {
  return <DynamicArchiveClientComponent channelID={params.channelID} />;
}
