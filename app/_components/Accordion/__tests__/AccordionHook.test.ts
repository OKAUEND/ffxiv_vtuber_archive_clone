import { describe, test } from 'vitest';
import { renderHook, act } from '@testing-library/react';

import { useAccordion } from '../(hook)/useAccordion';
import { RecoilRoot } from 'recoil';

describe('Accordion Hook TEST', () => {
  test('Hookの初期状態で、値が文字列のクローズ状態なのを示している', () => {
    const { result } = renderHook(() => useAccordion(), {
      wrapper: RecoilRoot,
    });

    expect(result.current[0]).toEqual(true);
    expect(result.current[1]).toMatch(/hidden/);
  });

  test('Changeイベントを呼び出したら、値の文字列がオープンの状態を示しているか', () => {
    const { result, rerender } = renderHook(() => useAccordion(), {
      wrapper: RecoilRoot,
    });

    rerender();

    expect(result.current[0]).toEqual(true);
    expect(result.current[1]).toMatch(/hidden/);

    act(() => {
      result.current[2]();
    });

    expect(result.current[0]).not.toEqual(true);
    expect(result.current[1]).not.toMatch(/hidden/);
    expect(result.current[0]).toEqual(false);
    expect(result.current[1]).toMatch(/open/);
  });
});
