import { getChannel } from '@/channels/_lib/api/getChannel';
import { ChannelPanel } from '@/channels/_components/ChannelPanel';

interface IProps {
  param: string;
}

export const Channel = async ({ param }: IProps) => {
  const channels = await getChannel(param);
  return <ChannelPanel channels={channels} />;
};
