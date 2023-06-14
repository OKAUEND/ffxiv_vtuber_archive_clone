'use client';

import { usePage } from '@/archives/(hooks)/useArchives';
import styles from './NextLoad.module.scss';

interface IProps {
  channelID: string;
}

export const NextLoad = ({ channelID }: IProps) => {
  const [loadNextList] = usePage();
  return (
    <button onClick={() => loadNextList(channelID)} className={styles.load}>
      更に取得
    </button>
  );
};
