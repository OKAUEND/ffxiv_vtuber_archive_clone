import dynamic from 'next/dynamic';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import ControlSignIn from '@/control/_components/controlSignIn';

const DynamicControlClientComponent = dynamic(
  () => import('@/control/_components/channelControl'),
  { ssr: false }
);

/**
 * ユーザー認証をサーバー側で行う
 * @param cookies
 * @returns user , boolean
 */
const getUserSession = async (cookies) => {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user = session?.user || null;

  const isAdmin = session?.user.id === process.env.ADMIN_ID;

  return [user, isAdmin] as const;
};

export default async function Index() {
  const [user, isAdmin] = await getUserSession(cookies);

  return (
    <div>
      <div>
        {/* ログインされていない場合は、ログイン画面への遷移を促す */}
        {user ? (
          <DynamicControlClientComponent isAdmin={isAdmin} />
        ) : (
          <>
            <div>
              ログイン認証が必要なページです。ログイン認証を行ってください
            </div>
            <ControlSignIn />
          </>
        )}
      </div>
    </div>
  );
}
