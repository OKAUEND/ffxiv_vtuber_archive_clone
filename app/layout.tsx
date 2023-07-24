import React from 'react';
import 'sanitize.css';
import '@/_styles/reset.scss';
import { Metadata } from 'next';
import { Zen_Kaku_Gothic_New } from 'next/font/google';

import styles from '@/_styles/rootLayout.module.scss';
import RecoilProvider from '@/_utile/recoil';
import { BasicHeader } from '@/_components/Header';

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  title: 'FFXIV HIKASEN Vtuber Archives',
  description: 'FF14で配信を行っているVtuberの検索サイト。',
};

const Zen = Zen_Kaku_Gothic_New({
  weight: '400',
  preload: false,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="jp">
      <body className={`${styles.rootLayout} ${Zen.className}`}>
        <header className={styles.header}>
          <BasicHeader></BasicHeader>
        </header>
        <main className={styles.main_container}>
          <RecoilProvider>{children}</RecoilProvider>
        </main>
      </body>
    </html>
  );
}
