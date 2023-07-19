import { describe, test, expect, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { RecoilRoot } from 'recoil';

import * as fecthUtile from '@/_utile/fetch';
import { createHikasenVtuberData } from '@/channels/__tests__/_mock';
import { useAdminControl } from '@/control/(hooks)/useAdminControl';

describe('useAdminControl Unit TEST', () => {
  const spy = vi.spyOn(fecthUtile, 'fetchExtend');
  const data = createHikasenVtuberData('Mock');

  beforeEach(() => {
    vi.resetAllMocks();
  });
  afterEach(() => {
    vi.resetAllMocks();
  });

  test('値が取れているか', async () => {
    spy.mockReturnValue(
      new Promise((resolve) => {
        resolve({ gas: data, db: [] });
      })
    );
    const { result } = renderHook(() => useAdminControl(), {
      wrapper: RecoilRoot,
    });
    await waitFor(() => {
      expect(result.current[0].length).toEqual(5);
    });
  });
  test('DB側に値がない場合は、一致しているかのフラグが偽になっているか', async () => {
    spy.mockReturnValue(
      new Promise((resolve) => {
        resolve({ gas: data, db: [] });
      })
    );
    const { result } = renderHook(() => useAdminControl(), {
      wrapper: RecoilRoot,
    });
    await waitFor(() => {
      result.current[0].forEach((channel) => {
        expect(channel.isAllMatched).toEqual(false);
      });
    });
  });
  //Mockのリセットが上手くいかないので相談ポイント
  test('DB側に値があった場合は、全要素が一致していればフラグが真になっているか', async () => {
    spy.mockReturnValue(
      new Promise((resolve) => {
        resolve({ gas: data, db: data });
      })
    );
    const { result } = renderHook(() => useAdminControl(), {
      wrapper: RecoilRoot,
    });
    await waitFor(() => {
      result.current[0].forEach((channel) => {
        expect(channel.isAllMatched).toEqual(true);
      });
    });
  });
  // test('DB側に値があった場合は、一部要素が違っていればフラグが偽になっているか', () => {});
});
