import { getChannel } from '@/channels/_lib/api/getChannel';
import { ChannelPanel } from '@/channels/_components/ChannelPanel';

export const Channel = async () => {
  const channels = await getChannel('1');
  return <ChannelPanel channels={channels} />;
};
