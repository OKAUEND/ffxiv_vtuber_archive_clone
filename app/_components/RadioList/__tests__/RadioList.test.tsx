import { describe, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RadioList } from '../RadioList';

describe('RadioList', () => {
  const categories = [
    { key: 'Category1', name: 'Category 1' },
    { key: 'Category2', name: 'Category 2' },
    { key: 'Category3', name: 'Category 3' },
  ];
  const selected = 'Category 1';
  const group = 'category';
  const changeHandler = vi.fn();

  test('渡された文字列分のラジオボタンが描画できているか', () => {
    render(
      <RadioList
        categories={categories}
        selected={selected}
        group={group}
        changeHandler={changeHandler}
      />
    );

    const radioButtons = screen.getAllByRole('listitem');
    expect(radioButtons.length).toBe(categories.length);

    const labels = radioButtons.map((item) => item.textContent);
    const CategoryNames = categories.map((item) => item.name);
    expect(labels).toEqual(CategoryNames);
  });

  test('ラジオボタンがクリックされた時、引数として渡された変更関数が呼び出されているか', async () => {
    render(
      <RadioList
        categories={categories}
        selected={selected}
        group={group}
        changeHandler={changeHandler}
      />
    );

    const user = userEvent.setup();

    const targetValue = categories[1]; // Select the second category

    const targetRadio = screen.getByLabelText(targetValue.name);

    expect(changeHandler).toHaveBeenCalledTimes(0);

    await user.click(targetRadio);

    expect(changeHandler).toHaveBeenCalledTimes(1);
  });
});
