'use client';

import Link from 'next/link';

import styles from './pagination.module.scss';

interface Props {
  // totalCount: number;
  basePath: string;
  currentPageNumber: number;
}

export const Pagination = ({ basePath, currentPageNumber = 1 }: Props) => {
  const PER_PAGE = 5;
  const offsetPageNumber =
    currentPageNumber > PER_PAGE - 1 ? currentPageNumber - 2 : 1;

  const paginationList = () =>
    [...Array(PER_PAGE)].map((_, index) => offsetPageNumber + index);

  const toggleCurrantNumberStyle = (
    currantNumber: number,
    pageNumber: number
  ) => {
    return currantNumber === pageNumber ? styles.current : styles.pagination;
  };

  return (
    <ul className={styles.container}>
      {paginationList().map((number, index) => (
        <li
          className={toggleCurrantNumberStyle(currentPageNumber, number)}
          key={index}
        >
          {currentPageNumber === number ? (
            <div>{number}</div>
          ) : (
            <Link href={`${basePath}/${number}`} className={styles.link}>
              {number}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
};
