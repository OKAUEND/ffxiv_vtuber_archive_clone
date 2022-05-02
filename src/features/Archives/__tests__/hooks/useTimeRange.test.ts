import { act } from '@testing-library/react-hooks';
import { useRecoilValue } from 'recoil';
import { useTimeRange, timeRangeAtom } from '../../hook/useTimeRange';
import { renderRecoilHook } from '../../../../utility/test/renderRecoilHookd';

const useMock = () => {
    const [, createTimeRange] = useTimeRange();
    const state = useRecoilValue(timeRangeAtom);
    return { state, createTimeRange };
};

describe('useArchives TEST', () => {
    test('初期値として時刻が現在日時セットされている', () => {
        const { result } = renderHook(() => useTimeRange(), {
            wrapper: RecoilRoot,
        });
        const [timeRange] = result.current;

        expect(timeRange).toBe(true);
    });

    test('新しい時間を渡すと、重複取得防止として、1分前の時間がセットされている', () => {
        const { result } = renderHook(() => useTimeRange(), {
            wrapper: RecoilRoot,
        });
        const [timeRange, createTimeRange] = result.current;

        const testDayTime = '20200101';

        act(() => {
            createTimeRange(testDayTime);
        });

        const testDate = new Date(testDayTime);
        testDate.setMinutes(testDate.getMinutes() - 1);

        expect(timeRange.EndTime).toBe(testDate.toISOString());
    });
    test('新しい時間を渡すと、6ヶ月前の日時がセットされている', () => {
        const { result } = renderHook(() => useTimeRange(), {
            wrapper: RecoilRoot,
        });
        const [timeRange, createTimeRange] = result.current;

        const testDayTime = '20200101';

        act(() => {
            createTimeRange(testDayTime);
        });

        const testDate = new Date(testDayTime);
        testDate.setMinutes(testDate.getMonth() - 6);

        expect(timeRange.EndTime).toBe(testDate.toISOString());
    });
});
