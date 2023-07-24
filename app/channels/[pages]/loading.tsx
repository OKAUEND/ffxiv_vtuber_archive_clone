import styles from '@/_styles/loading.module.scss';
import { LoadingBasicAnimation } from '@/_components/Loading';

export default function Loading() {
  return (
    <div className={styles.loading}>
      <LoadingBasicAnimation />
    </div>
  );
}
