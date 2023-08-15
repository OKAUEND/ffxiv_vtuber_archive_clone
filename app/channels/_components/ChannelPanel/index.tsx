import Link from 'next/link';

import styles from '@/channels/_style/channelPanel/channelPanel.module.scss';
import { Icon } from '@/_components/Elements/Icon';
import { HikasenVtuber, Tags } from '@/(types)';
import DayTime from '@/_utile/convert/DayTime';

type Props = {
  channels: HikasenVtuber<Tags>[];
};

export const ChannelPanel = ({ channels }: Props) => {
  const youtubeIconURL = process.env.YOUTUBE_CHANNEL_ICON_URL;
  return (
    <ul className={styles.container}>
      {channels.map((channel) => (
        <li key={channel.channelID} className={styles.channel_list}>
          <div className={styles.channel_content}>
            <Link
              href={`https://www.youtube.com/channel/${channel.channelID}`}
              target="_blank"
            >
              <div className={styles.channel_icon}>
                <Icon
                  src={`${youtubeIconURL}${channel.channelIconURL}`}
                  alt={`${channel.name}のチャンネルアイコン`}
                />
              </div>
            </Link>
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
            <div className={styles.channel_tag}>
              <ul className={styles.playstyle}>
                {channel.tags.content.map((content) => (
                  <li key={content.id}>{content.name}</li>
                ))}
              </ul>
              <ul className={styles.playstyle}>
                {channel.tags.party.map((party) => (
                  <li key={party.id}>{party.name}</li>
                ))}
              </ul>
              <ul className={styles.playstyle}>
                {channel.tags.timezone.map((timezone) => (
                  <li key={timezone.id}>{timezone.name}</li>
                ))}
              </ul>
              <div className={styles.playstyle}>
                {`${channel.dataCenter} ${channel.server}`}
              </div>
              <div className={styles.info_link}>詳しくみる→</div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};
