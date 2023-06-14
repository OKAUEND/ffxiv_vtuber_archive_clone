import { describe, test, expect } from 'vitest';

import { fetchExtend } from '@/_utile/fetch/';
import { createFetchMock, initMock } from '@/_mock/fetch';

describe('fetchExtend TEST', () => {
  initMock();
  test('通信成功時は、Resultがあり値が存在している', async () => {
    createFetchMock({
      success: true,
      status: 200,
      data: { result: 'Success' },
    });
    type result = {
      result: string;
    };
    const result = fetchExtend<result>({ url: '/MockTEST' });

    const data = await result;

    expect(data.result).toEqual('Success');
  });
  test('通信失敗:400', async () => {
    createFetchMock({
      success: false,
      status: 400,
    });
    expect(fetchExtend({ url: '/MockTEST' })).rejects.toThrowError(`400`);
  });

  test('通信失敗:403', async () => {
    createFetchMock({
      success: false,
      status: 403,
    });

    expect(fetchExtend({ url: '/MockTEST' })).rejects.toThrowError(
      new Error(`${403}`)
    );
  });

  test('通信失敗:404', async () => {
    createFetchMock({
      success: false,
      status: 404,
    });

    expect(fetchExtend({ url: '/MockTEST' })).rejects.toThrowError(
      new Error(`${404}`)
    );
  });

  test('通信失敗:429', async () => {
    createFetchMock({
      success: false,
      status: 429,
    });

    expect(fetchExtend({ url: '/MockTEST' })).rejects.toThrowError(
      new Error(`429`)
    );
  });
});
