import { Channel } from '@/channels/_components/router';

export default async function Article({
  params,
}: {
  params: { pages: string };
}) {
  return (
    <>
      {/* @ts-expect-error Async Server Component */}
      <Channel param={params.pages} />
    </>
  );
}
