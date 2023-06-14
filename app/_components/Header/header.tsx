import styles from './header.module.scss';
import { useHeader } from './hook';

export const BasicHeader = () => {
  const items = useHeader();
  return (
    <nav className={styles.container}>
      <ul className={styles.header_list}>
        {items.map((item, index) => (
          <li className={styles.header_links} key={index}>
            {item}
          </li>
        ))}
      </ul>
    </nav>
  );
};
