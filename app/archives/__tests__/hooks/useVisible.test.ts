import { describe, test, expect, vi } from 'vitest';
import { act, renderHook, waitFor } from '@testing-library/react';
import { RecoilRoot } from 'recoil';

import { useVisible } from '@/archives/(hooks)/useArchives';
import * as fecthUtile from '@/_utile/fetch';
import { GoogleYoutubeFactory } from '@/archives/__tests__/hooks/mock';

describe('useVisible TEST', () => {
  const spy = vi.spyOn(fecthUtile, 'fetchExtend');
  const mockYoutubeData = GoogleYoutubeFactory(30);
  spy.mockImplementation(() => {
    return new Promise((resolve) => {
      resolve(mockYoutubeData);
    });
  });
  test('トータル件数が取得件数より多い場合は表示可能としTrueになっているか', async () => {
    const { result } = renderHook(() => useVisible('Mock'), {
      wrapper: RecoilRoot,
    });
    await waitFor(() => {
      expect(result.current.isVisible).toEqual(true);
    });
  });
  test('トータル件数が取得件数より少ない場合は非表示としFalseになっているか', async () => {
    const { result } = renderHook(() => useVisible('Mock'), {
      wrapper: RecoilRoot,
    });
    await waitFor(() => {
      expect(result.current.isVisible).toEqual(true);
    });

    await act(() => {
      result.current.loadNextList('Mock');
    });

    await waitFor(() => {
      expect(result.current.isVisible).toEqual(false);
    });
  });
});
