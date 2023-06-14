import { Suspense } from 'react';
import '@testing-library/jest-dom';
import { describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ErrorBoundary, ErrorBoundaryExtended } from '../ErrorBoundary';
import { FallBackProps } from '../type/ErrorMessage';

describe('ErrorBoundary Component Unit TEST', () => {
  const ChildComponent = () => <div>ChildComponent</div>;
  const ErrorComponent = () => {
    throw new Error('404 TEST ERROR');
  };

  //エラー
  const FallBackComponent = ({ message }: FallBackProps) => {
    return <div>{message}</div>;
  };

  //オリジナルを一旦退避させる
  //テスト実行時に必ず出力されるConcole.errorがあり、出力画面を汚してしまうのでMockで置き換えて出さないようにする
  // eslint-disable-next-line no-console
  const originalConsoleError = console.error;

  beforeEach(() => {
    //テスト実行時に必ず出力されるConcole.errorがあり、出力画面を汚してしまうのでMockで置き換えて出さないようにする
    // eslint-disable-next-line no-console
    console.error = vi.fn();
  });

  afterEach(() => {
    //テスト実行時に必ず出力されるConcole.errorがあり、出力画面を汚してしまうのでMockで置き換えて出さないようにする
    // eslint-disable-next-line no-console
    console.error = originalConsoleError; // テスト後に元のconsole.errorに戻す
  });

  test('レンダーエラー', () => {
    render(
      <ErrorBoundary fallback={FallBackComponent}>
        <Suspense>
          <ChildComponent />
        </Suspense>
      </ErrorBoundary>
    );

    expect(screen.getByText('ChildComponent')).toBeInTheDocument();
  });

  test('catches and displays error message', () => {
    render(
      <ErrorBoundary fallback={FallBackComponent}>
        <Suspense>
          <ErrorComponent />
        </Suspense>
      </ErrorBoundary>
    );

    expect(screen.getByText('404')).toBeInTheDocument();
  });
});

describe('ErrorBoundaryExtended Component Unit TEST', () => {
  test('拡張要素が正しく子を表示できるか', () => {
    render(
      <ErrorBoundaryExtended>
        <div>Hello World</div>
      </ErrorBoundaryExtended>
    );
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });
});
