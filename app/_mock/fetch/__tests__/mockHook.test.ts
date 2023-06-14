import { describe, test } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useTESTHook } from './mockHook';
import { createFetchMock, initMock } from '@/_mock/fetch';

describe('FetchをMockするテスト', () => {
  initMock();
  test('正常系のテスト', async () => {
    const mockData = { hoge: 'ほげ' };
    createFetchMock({ success: true, status: 200, data: mockData });
    const { result } = renderHook(() => useTESTHook());
    const data = await result.current;
    expect(data).toEqual({ hoge: 'ほげ' });
  });

  test('失敗系のテスト', async () => {
    createFetchMock({ success: false, status: 400 });
    expect(useTESTHook()).rejects.toThrowError();
  });
});
