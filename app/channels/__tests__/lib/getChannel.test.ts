import { describe, test, expect } from 'vitest';

import { getChannel } from '@/channels/_lib/api/getChannel';
import { createFetchMock } from '@/_mock/fetch';
import { createHikasenVtuberData } from '@/channels/__tests__/_mock';

describe('getChannel API Unit TEST', () => {
  test('初期データを返すか', async () => {
    const mockData = createHikasenVtuberData('Mock');
    createFetchMock({ success: true, status: 200, data: mockData });
    const result = getChannel('1');
    const data = await result;
    expect(data).toEqual(mockData);
  });
});
