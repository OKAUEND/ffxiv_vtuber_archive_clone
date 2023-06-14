import { renderHook } from '@testing-library/react';
import { describe, test } from 'vitest';
import { RecoilRoot } from 'recoil';
import { useErrorState } from '../hook/useErrorState';

describe('useErrorState', () => {
  test('エラーコード400', () => {
    const { result } = renderHook(() => useErrorState('400'), {
      wrapper: RecoilRoot,
    });

    expect(result.current).toEqual({
      message: 'データ取得時に不具合が発生しました。',
      subMessage: 'Bad request',
    });
  });

  test('エラーコード403', () => {
    const { result } = renderHook(() => useErrorState('403'), {
      wrapper: RecoilRoot,
    });

    expect(result.current).toEqual({
      message: '通信が失敗しました。',
      subMessage: 'Forbidden',
    });
  });

  test('エラーコード404', () => {
    const { result } = renderHook(() => useErrorState('404'), {
      wrapper: RecoilRoot,
    });

    expect(result.current).toEqual({
      message: 'データが存在しません。',
      subMessage: 'Not Found',
    });
  });

  test('エラーコード429', () => {
    const { result } = renderHook(() => useErrorState('429'), {
      wrapper: RecoilRoot,
    });

    expect(result.current).toEqual({
      message:
        'アクセス過多で通信が行えません。しばらくお時間をおいてください。',
      subMessage: 'Too Many Requests',
    });
  });

  test('エラーコード500', () => {
    const { result } = renderHook(() => useErrorState('500'), {
      wrapper: RecoilRoot,
    });

    expect(result.current).toEqual({
      message: 'サーバー側で不具合が発生しました。',
      subMessage: 'Internal server error',
    });
  });

  test('不明なエラー', () => {
    const { result } = renderHook(() => useErrorState('999'), {
      wrapper: RecoilRoot,
    });

    expect(result.current).toEqual({
      message: '不明なエラーが発生しました',
      subMessage: 'Unknown error',
    });
  });
});
