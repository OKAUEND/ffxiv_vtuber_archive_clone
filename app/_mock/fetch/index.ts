import { vi, afterAll } from 'vitest';

interface IResponse<T> {
  success: boolean;
  status: number;
  data?: T;
}

export const initMock = () => {
  afterAll(() => {
    vi.clearAllMocks();
  });
};

export const createFetchMock = <T>({ success, status, data }: IResponse<T>) => {
  const dataMock = () => {
    return new Promise((resolve) => {
      resolve({
        ok: success,
        status: status,
        json: async () => data,
      });
    });
  };
  global.fetch = vi.fn().mockImplementation(dataMock);
};

// export const createFetchOffsetMock = <T>({
//   success,
//   status,
//   data,
// }: IResponse<T>) => {
//   const dataMock = () =>
//     new Promise((resolve) => {
//       resolve({
//         ok: success,
//         status: status,
//         json: async () => data,
//       });
//     });
//   global.fetch = vi.fn().mockImplementation(dataMock);

//   const test = dataMock.call[0][0];
// };
