import { describe, test } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Pagination } from '..';

describe('Pagination Component TEST', () => {
  const generateArray = (begin: number) => {
    const offsetNumber = begin - 2;
    return [...Array(5)].map((_, index) => `${offsetNumber + index}`);
  };

  test('現在ページが1だった場合', () => {
    render(<Pagination basePath="./" currentPageNumber={1} totalCount={100} />);

    const paginationItems = screen.getAllByRole('listitem');
    expect(paginationItems).toHaveLength(5);

    // ページ番号のテキストを検証
    const pageNumbers = paginationItems.map((item) => item.textContent);
    expect(pageNumbers).toEqual(['1', '2', '3', '4', '5']);
  });
  test('現在ページが4だった場合', () => {
    const list = ['1', '2', '3', '4', '5'];
    render(<Pagination basePath="./" currentPageNumber={4} totalCount={100} />);

    const paginationItems = screen.getAllByRole('listitem');
    expect(paginationItems).toHaveLength(5);

    const contentTexts = paginationItems.map((list) => list.textContent);

    expect(contentTexts).toEqual(list);
  });
  test('現在ページが5だった場合', () => {
    render(<Pagination basePath="./" currentPageNumber={5} totalCount={100} />);

    const paginationItems = screen.getAllByRole('listitem');
    expect(paginationItems).toHaveLength(5);

    const contentTexts = paginationItems.map((list) => list.textContent);

    // ページ番号のテキストを検証
    expect(contentTexts).toEqual(generateArray(5));
  });
  test('現在ページが10だった場合', () => {
    render(
      <Pagination basePath="./" currentPageNumber={10} totalCount={100} />
    );

    const paginationItems = screen.getAllByRole('listitem');
    expect(paginationItems).toHaveLength(5);

    const contentTexts = paginationItems.map((list) => list.textContent);

    // ページ番号のテキストを検証
    expect(contentTexts).toEqual(generateArray(10));
  });
  test('トータル件数が20件だった場合、ページネーションのボタンは1つだけ表示されている', () => {
    render(<Pagination basePath="./" currentPageNumber={1} totalCount={20} />);

    const paginationItems = screen.getAllByRole('listitem');
    expect(paginationItems).toHaveLength(1);

    const contentTexts = paginationItems.map((list) => list.textContent);

    // ページ番号のテキストを検証
    expect(contentTexts).toEqual(['1']);
  });
  test('トータル件数が40件だった場合、ページネーションのボタンは2つだけ表示されている', () => {
    render(<Pagination basePath="./" currentPageNumber={1} totalCount={40} />);

    const paginationItems = screen.getAllByRole('listitem');
    expect(paginationItems).toHaveLength(2);

    const contentTexts = paginationItems.map((list) => list.textContent);

    // ページ番号のテキストを検証
    expect(contentTexts).toEqual(['1', '2']);
  });
  test('トータル件数が40件だった場合、ページネーションのボタンは2つだけ表示されている', () => {
    render(<Pagination basePath="./" currentPageNumber={1} totalCount={80} />);

    const paginationItems = screen.getAllByRole('listitem');
    expect(paginationItems).toHaveLength(4);

    const contentTexts = paginationItems.map((list) => list.textContent);

    // ページ番号のテキストを検証
    expect(contentTexts).toEqual(['1', '2', '3', '4']);
  });

  test('トータル件数が200件だった場合、ページネーションのボタンは5つだけ表示されている', () => {
    render(<Pagination basePath="./" currentPageNumber={1} totalCount={200} />);

    const paginationItems = screen.getAllByRole('listitem');
    expect(paginationItems).toHaveLength(5);

    const contentTexts = paginationItems.map((list) => list.textContent);

    // ページ番号のテキストを検証
    expect(contentTexts).toEqual(['1', '2', '3', '4', '5']);
  });

  test('トータル件数が75件の小数点が発生する場合、ページネーションのボタンは4つだけ表示されている', () => {
    render(<Pagination basePath="./" currentPageNumber={1} totalCount={75} />);

    const paginationItems = screen.getAllByRole('listitem');
    expect(paginationItems).toHaveLength(4);

    const contentTexts = paginationItems.map((list) => list.textContent);

    // ページ番号のテキストを検証
    expect(contentTexts).toEqual(['1', '2', '3', '4']);
  });
});
