'use client';

import { useAccordion } from './(hook)/useAccordion';
import styles from './accordion.module.scss';

interface IProps {
  title: string;
  children: React.ReactNode;
}

export const Accordion = ({ title, children }: IProps) => {
  const [isHidden, accordionStyle, changeVisible] = useAccordion();
  return (
    <div className={styles.container}>
      <button
        className={`${styles.accordion_event} ${accordionStyle}`}
        onClick={changeVisible}
      >
        {title}
      </button>
      <div className={`${styles.body}`}>{isHidden ? <></> : children}</div>
    </div>
  );
};
