import Link from 'next/link';

import styles from '@/channels/_style/channelPanel/channelPanel.module.scss';
import { Icon } from '@/_components/Elements/Icon';
import { HikasenVtuber } from '@/(types)';

type Props = {
  channels: HikasenVtuber[];
};

export const ChannelPanel = ({ channels }: Props) => {
  return (
    <ul className={styles.container}>
      {channels.map((channel) => (
        <li key={channel.channelID} className={styles.channel_list}>
          <div className={styles.channel_content}>
            <div className={styles.channel_icon}>
              <Link href={`/archives/${channel.channelID}`}>
                <Icon
                  src={channel.channelIconID}
                  alt={`${channel.name}のチャンネルアイコン`}
                />
              </Link>
            </div>
            <div className={styles.channel_info}>
              <Link href={`/archives/${channel.channelID}`}>
                <div className={styles.info_title}>
                  <span className={styles.info_text}>{channel.name}</span>
                  <span className={styles.info_channelName}>
                    {channel.channelName}
                  </span>
                </div>
              </Link>
              <span className={styles.channel_since}>Since 2013/8/24</span>
            </div>
            <div className={styles.channel_tag}></div>
          </div>
        </li>
      ))}
    </ul>
  );
};
