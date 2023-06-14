'use client';

import styles from '@/archives/_styles/archives.module.scss';

interface IProps {
  Archives: GoogleApiYouTubeSearchResource[];
}

export const ArchiveList = ({ Archives }: IProps) => {
  const convertDayTime = (time: string) => {
    const date = new Date(time);
    return `${date.getFullYear()}年 ${
      date.getMonth() + 1
    }月${date.getDate()}日`;
  };

  return (
    <ul className={styles.container}>
      {Archives.map((archive, index) => (
        <li key={index} className={styles.panel}>
          <div className={styles.thumbnail}>
            <a
              href={`https://www.youtube.com/watch?v=${archive.id.videoId}`}
              target="_blank"
              rel="noreferrer"
            >
              <img src={archive.snippet.thumbnails.medium.url} />
            </a>
          </div>
          <div className={styles.info}>
            <p className={styles.archive_title}>{archive.snippet.title}</p>
            <div className={styles.live_daytime}>
              {convertDayTime(archive.snippet.publishedAt)}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};
