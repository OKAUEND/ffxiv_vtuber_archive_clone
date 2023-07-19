'use client';

import { Icon } from '@/_components/Elements/Icon';
import styles from '@/control/_styles/channelList.module.scss';
import { useAdminControl } from '@/control/(hooks)/useAdminControl';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import DayTime from '@/_utile/convert/DayTime';

import { MatchFilter } from '@/control/_components/channels/MatchFilter';

export const ChannelList = () => {
  const [channels, selectedChannels, selectedChannel, updateDataBase] =
    useAdminControl();
  const youtubeIconURL = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ICON_URL
    ? process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ICON_URL
    : '';

  const supabase = createClientComponentClient();

  const changeStyles = (isAllMatched: boolean): string => {
    if (isAllMatched)
      return `${styles.channel_sever} ${styles.channel_hasServer}`;
    return `${styles.channel_sever}`;
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };
  return (
    <>
      {selectedChannels.length}件のチャンネルを更新予定
      <button onClick={() => updateDataBase()}>DBを更新する</button>
      <button onClick={() => signOut()}>ログアウト</button>
      <MatchFilter />
      <ul>
        {channels.map((channel, index) => (
          <li className={styles.channels} key={index}>
            <div className={changeStyles(channel.isAllMatched)}>
              {channel.isAllMatched ? <>◯</> : <>✕</>}
            </div>
            <div className={styles.channel_icon}>
              <Icon
                src={`${youtubeIconURL}${channel.channelIconURL}`}
                alt={`${channel.name}のチャンネルアイコン`}
              />
            </div>
            <div className={styles.channel_info}>
              <h3 className={styles.title}>{channel.name}</h3>
              <span>{channel.channelName}</span>
              <span>{DayTime(channel.beginTime)}</span>
            </div>
            <div className={styles.channel_action}>
              <button onClick={() => selectedChannel(channel)}>追加する</button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};
