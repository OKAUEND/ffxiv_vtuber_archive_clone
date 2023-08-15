import { render, screen } from '@testing-library/react';
import useEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { describe, vi, test } from 'vitest';
import { CheckBox } from './index';

describe('CheckBox Component', () => {
  test('チェックボックスがクリックされた時にPropsの関数が呼び出されていること', async () => {
    const onChange = vi.fn();
    render(<CheckBox label={'TESTCity'} value={1} changeHandler={onChange} />);

    const use = useEvent.setup();
    const checkboxMock = screen.getByLabelText('TESTCity');
    await use.click(checkboxMock);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  test('初期状態のチェックボックスはチェック状態ではないこと', () => {
    const onChange = vi.fn();
    render(<CheckBox label={'TESTCity'} value={1} changeHandler={onChange} />);

    const checkboxMock = screen.getByLabelText('TESTCity');
    expect(checkboxMock).not.toBeChecked();
  });

  test('チェックボックスがクリックされたら、チェック状態になっていること', async () => {
    const onChange = vi.fn();
    render(<CheckBox label={'TESTCity'} value={1} changeHandler={onChange} />);

    const use = useEvent.setup();
    const checkboxMock = screen.getByLabelText('TESTCity');
    await use.click(checkboxMock);
    expect(checkboxMock).toBeChecked();
  });
});
