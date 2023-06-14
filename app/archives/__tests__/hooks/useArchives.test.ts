import { describe, test, expect } from 'vitest';
import {} from 'msw';
import { act, renderHook, waitFor } from '@testing-library/react';
import { RecoilRoot } from 'recoil';

import { useArchives } from '@/archives/(hooks)/useArchives';
import { createFetchMock, initMock } from '@/_mock/fetch';
import { GoogleYoutubeFactory } from '@/archives/__tests__/hooks/mock';

describe('useArchive TEST', () => {
  initMock();
  const mockYoutubeData = GoogleYoutubeFactory();
  test('初期取得で値を取得できているか', async () => {
    createFetchMock({ success: true, status: 200, data: mockYoutubeData });
    const { result } = renderHook(() => useArchives('Mock'), {
      wrapper: RecoilRoot,
    });
    await waitFor(() => {
      expect(result.current.archives.archives.length > 0).toEqual(true);
    });
  });
  test('放送タイトルがFF14に関係ないものだった場合、配列から除外できているか', async () => {
    createFetchMock({ success: true, status: 200, data: mockYoutubeData });
    const { result } = renderHook(() => useArchives('Mock'), {
      wrapper: RecoilRoot,
    });
    await waitFor(() => {
      const reg = new RegExp(`FF14|FFXIV`);
      result.current.archives.archives.forEach((archive) => {
        expect(reg.test(archive.snippet.title)).toEqual(true);
      });
    });
  });
  test('更新をした時件数が増えているか', async () => {
    createFetchMock({ success: true, status: 200, data: mockYoutubeData });
    const archiveResult = renderHook(() => useArchives('Mock'), {
      wrapper: RecoilRoot,
    });

    await act(() => {
      archiveResult.result.current.loadNextList('Mock');
    });

    await waitFor(() => {
      expect(archiveResult.result.current.archives.archives.length).toEqual(40);
    });
  });
});
