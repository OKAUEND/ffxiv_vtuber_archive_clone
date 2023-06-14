import { Channel } from '@/channels/_components/router';

export default async function Article() {
  return (
    <>
      {/* @ts-expect-error Async Server Component */}
      <Channel />
    </>
  );
}
