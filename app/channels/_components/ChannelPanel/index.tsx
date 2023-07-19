import Link from 'next/link';

import styles from '@/channels/_style/channelPanel/channelPanel.module.scss';
import { Icon } from '@/_components/Elements/Icon';
import { HikasenVtuber } from '@/(types)';
import DayTime from '@/_utile/convert/DayTime';

type Props = {
  channels: HikasenVtuber[];
};

export const ChannelPanel = ({ channels }: Props) => {
  const youtubeIconURL = process.env.YOUTUBE_CHANNEL_ICON_URL;
  return (
    <ul className={styles.container}>
      {channels.map((channel) => (
        <li key={channel.channelID} className={styles.channel_list}>
          <Link href={`/archives/${channel.channelID}`}>
            <div className={styles.channel_content}>
              <div className={styles.channel_icon}>
                <Icon
                  src={`${youtubeIconURL}${channel.channelIconURL}`}
                  alt={`${channel.name}のチャンネルアイコン`}
                />
              </div>
              <div className={styles.channel_info}>
                <div className={styles.info_title}>
                  <span className={styles.info_text}>{channel.name}</span>
                  <span className={styles.info_channelName}>
                    {channel.channelName}
                  </span>
                </div>

                <span className={styles.channel_since}>
                  {DayTime(channel.beginTime)}
                </span>
              </div>
              <div className={styles.channel_tag}></div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};
