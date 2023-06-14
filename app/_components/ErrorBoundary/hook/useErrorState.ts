import { selectorFamily, useRecoilValue } from 'recoil';

import { ErrorMessage } from '../type/ErrorMessage';

const createErrorMessage = (
  message: string,
  subMessage: string
): ErrorMessage => {
  return { message: message, subMessage: subMessage };
};

const errorMessage = selectorFamily<ErrorMessage, string>({
  key: 'data/error-message',
  get: (message: string) => () => {
    const status = parseInt(message.substring(0, 3), 10);

    //それぞれのステータスで文面を変えたいので、ステータスをスイッチで判別させる
    switch (status) {
      case 400:
        return createErrorMessage(
          'データ取得時に不具合が発生しました。',
          'Bad request'
        );
      case 403:
        return createErrorMessage('通信が失敗しました。', 'Forbidden');
      case 404:
        return createErrorMessage('データが存在しません。', 'Not Found');
      case 429:
        return createErrorMessage(
          'アクセス過多で通信が行えません。しばらくお時間をおいてください。',
          'Too Many Requests'
        );
      case 500:
        return createErrorMessage(
          'サーバー側で不具合が発生しました。',
          'Internal server error'
        );
      default:
        //扱っていないステータスコードが存在した場合は不明なエラーに分類させる
        return createErrorMessage(
          '不明なエラーが発生しました',
          'Unknown error'
        );
    }
  },
});

export const useErrorState = (message: string) => {
  return useRecoilValue(errorMessage(message));
};
