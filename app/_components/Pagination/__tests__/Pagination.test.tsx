import { describe, test } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Pagination } from '..';

describe('Pagination Component TEST', () => {
  const generateArray = (begin: number) => {
    const offsetNumber = begin - 2;
    return [...Array(5)].map((_, index) => offsetNumber + index);
  };

  test('現在ページが1だった場合', () => {
    render(<Pagination basePath="./" currentPageNumber={1} />);

    const paginationItems = screen.getAllByRole('listitem');
    expect(paginationItems).toHaveLength(5);

    // ページ番号のテキストを検証
    const pageNumbers = paginationItems.map((item) => item.textContent);
    expect(pageNumbers).toEqual(['1', '2', '3', '4', '5']);
  });
  test('現在ページが4だった場合', () => {
    render(<Pagination basePath="./" currentPageNumber={4} />);

    const paginationItems = screen.getAllByRole('listitem');
    expect(paginationItems).toHaveLength(5);

    // ページ番号のテキストを検証
    ['1', '2', '3', '4', '5'].forEach((number) => {
      expect(screen.getByText(number.toString()).textContent).toEqual(
        number.toString()
      );
    });
  });
  test('現在ページが5だった場合', () => {
    render(<Pagination basePath="./" currentPageNumber={5} />);

    const paginationItems = screen.getAllByRole('listitem');
    expect(paginationItems).toHaveLength(5);

    // ページ番号のテキストを検証
    generateArray(5).forEach((number) => {
      expect(screen.getByText(number.toString()).textContent).toEqual(
        number.toString()
      );
    });
  });
  test('現在ページが10だった場合', () => {
    render(<Pagination basePath="./" currentPageNumber={10} />);

    const paginationItems = screen.getAllByRole('listitem');
    expect(paginationItems).toHaveLength(5);

    // ページ番号のテキストを検証
    generateArray(10).forEach((number) => {
      expect(screen.getByText(number.toString()).textContent).toEqual(
        number.toString()
      );
    });
  });
});
