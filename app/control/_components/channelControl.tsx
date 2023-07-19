'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

import styles from '@/control/_styles/channelList.module.scss';
import { ChannelList } from '@/control/_components/channelList';

interface IProps {
  isAdmin: boolean;
}

const ChannelControl = ({ isAdmin }: IProps) => {
  const router = useRouter();

  //管理者以外でログインしている場合があるため、強制ログアウトを実行しログアウトさせる
  const signOut = async () => {
    const supabase = createClientComponentClient();
    await supabase.auth.signOut();
  };

  //管理者以外はトップページへ強制的に遷移させ、アクセスさせない
  if (!isAdmin) {
    signOut();
    router.push('/');
  }

  return (
    <section className={styles.container}>
      <h2>配信者一覧</h2>
      <ChannelList />
    </section>
  );
};

export default ChannelControl;
