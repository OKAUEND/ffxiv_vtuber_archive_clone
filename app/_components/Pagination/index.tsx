'use client';

import Link from 'next/link';

import styles from './pagination.module.scss';

interface Props<T> {
  // totalCount: number;
  basePath: string;
  query?: T;
  currentPageNumber: number;
  totalCount: number;
}

const MAX_PAGE = 5;

/**
 * ページ番号の上限数を作成する(Max:5)
 * @param totalCount
 * @returns
 */
const createPageNumber = (totalCount: number) => {
  if (20 > totalCount) return 0;
  const totalPageNumber = Math.ceil(totalCount / 20);
  if (totalPageNumber > MAX_PAGE) return MAX_PAGE;

  return totalPageNumber;
};

/**
 * 遷移先のページ番号を生成する
 * @param pageNumber
 * @param currantNumber
 * @returns
 */
const createOffsetNumber = (pageNumber: number, currantNumber: number) => {
  //2以下は2つ分の以前のページ番号を表示する必要がないため、そのまま値を返す
  if (pageNumber <= 2) return currantNumber;

  return currantNumber > pageNumber - 1 ? currantNumber - 2 : 1;
};

/**
 * クエリパラメータがあるページへの遷移が必要な場合、動的に文字列のクエリパラメータを作成する
 * @param query
 * @returns
 */
const createQueryParameter = <T,>(query: T): string => {
  if (!query || query === '') return '';

  if (typeof query === 'object') {
    const keys = Object.entries(query);
    return keys.reduce((acc, currentValue, index) => {
      if (index === 0) return `/?${currentValue[0]}=${currentValue[1]}`;

      return `${acc}&${currentValue[0]}=${currentValue[1]}`;
    }, '');
  }
};

export const Pagination = <T,>({
  basePath,
  query,
  currentPageNumber = 1,
  totalCount,
}: Props<T>) => {
  const maxPage = createPageNumber(totalCount);
  const offsetPageNumber = createOffsetNumber(maxPage, currentPageNumber);
  const queryParameter = createQueryParameter<T>(query);

  const paginationList = () =>
    [...Array(maxPage)].map((_, index) => offsetPageNumber + index);

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
            <Link
              href={`${basePath}/${number}${queryParameter}`}
              className={styles.link}
            >
              {number}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
};
