import Link from 'next/link';

import styles from '@/about/about.module.scss';
export const About = () => {
  return (
    <section className={styles.container}>
      <h1 className={styles.title_text}>当サイトについて</h1>
      <p>
        当サイトは、
        <Link
          className={styles.about_link}
          href={'https://jp.finalfantasyxiv.com/'}
        >
          ファイナルファンタジーXIV
        </Link>
        (以下、FFXIV)で配信されているVtuberの方を応援するファンサイトです。
      </p>
      <p>
        FFXIV運営会社のスクエア・エニックス様及びその関係者、Vtuberが所属している会社及びグループと関係者、その他関係者とは一切関係がございません。
      </p>
      <section className={styles.content}>
        <h2 className={styles.subtitle}>免責事項</h2>
        <p>
          当サイトで掲載されている画像及び動画、また肖像権については各権利者に帰属します。
        </p>
        <p>
          当サイトのコンテンツ及びVtuber一覧などの情報に関しては、最新で及び正確な情報を提供するように努めておりますが、最新の情報に対する正確性などを保証をするものではございません。
        </p>
        <p>
          また、Vtuberの一覧への登録については、以下の条件を見て登録させていただいております事をご了承ください。
        </p>
        <ul className={styles.warning}>
          <li>FFXIVのパッケージを購入されている方</li>
          <li>蒼天のイシュガルドのメインストーリーに入られている方</li>
        </ul>
      </section>
    </section>
  );
};
