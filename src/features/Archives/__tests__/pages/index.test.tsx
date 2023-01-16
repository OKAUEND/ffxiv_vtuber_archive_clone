import { vi, describe, test, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import {} from '@testing-library/jest-dom';
import { RecoilRoot } from 'recoil';

import { setupMockServer } from '@/src/mock/test/setup';
import { handlers } from '@/src/mock/handlers';
import _fetch from 'node-fetch';

import { ArchiveRouter } from '@/src/features/Archives/pages';
import { Suspense } from 'react';

function flushPromisesAndTimers(): Promise<void> {
    return act(
        () =>
            new Promise((resolve) => {
                setTimeout(resolve, 500);
                vi.useFakeTimers();
                vi.runAllTimers();
            })
    );
}

const server = setupMockServer(handlers);

describe('Archives Component TEST', () => {
    // @ts-ignore
    global.fetch = _fetch;

    test(
        '初期インスタンス生成時に通信エラーが発生した時、子の要素は表示されずエラーコンポーネントが表示されるか'
    );
    test(
        '次の取得が選ばれた時、APIより新しい値を取得し、要素へ反映できているか'
    );
    test(
        '次の取得が選ばれた時、エラーが発生した場合、取得済みの値を表示しつつエラー通知しているか'
    );
});
