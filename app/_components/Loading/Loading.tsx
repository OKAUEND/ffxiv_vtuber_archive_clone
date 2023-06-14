'use client';

import styles from './Loading.module.scss';

export const LoadingBasicAnimation = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loading}></div>
    </div>
  );
};
