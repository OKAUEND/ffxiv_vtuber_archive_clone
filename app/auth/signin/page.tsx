import styles from '@/auth/_styles/signin.module.scss';
import { SignIn } from '@/_components/Sign';

export default function AuthSignIn() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.message}>
          <span>お持ちのアカウントを使いログインをします</span>
          <span>※現在ログイン機能は停止中です</span>
        </div>
        <SignIn provider="github">
          <span className={styles.signin_text}>Googleでログイン</span>
        </SignIn>
      </div>
    </div>
  );
}
