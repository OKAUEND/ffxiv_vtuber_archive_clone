import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RecoilRoot } from 'recoil';
import { describe, expect, test } from 'vitest';
import { ErrorBoundaryFallBack } from '../ErrorMessage';

describe('ErrorBoundaryFallBack', () => {
  test('画面にメッセージが表示できているか', () => {
    const status = '400';
    render(
      <RecoilRoot>
        <ErrorBoundaryFallBack message={status} />
      </RecoilRoot>
    );

    expect(
      screen.getByText('データ取得時に不具合が発生しました。')
    ).toBeInTheDocument();
  });

  test('画面にエラーステータスが表示できているか', () => {
    const status = '403 TEST Forbidden';
    render(
      <RecoilRoot>
        <ErrorBoundaryFallBack message={status} />
      </RecoilRoot>
    );

    expect(screen.getByText(status)).toBeInTheDocument();
  });
});
