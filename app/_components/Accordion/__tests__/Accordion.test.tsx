import { describe, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RecoilRoot } from 'recoil';

import { Accordion } from '../Accordion';

describe('Accordion Component TEST', () => {
  const TestComponent = () => <div>Component TEST</div>;
  test('ボタンにPropsのTitleの要素が表示されているか', async () => {
    render(
      <RecoilRoot>
        <Accordion title="Accordion Button">
          <TestComponent />
        </Accordion>
      </RecoilRoot>
    );

    const ButtonTEXT = await screen.getByText('Accordion Button');
    expect(ButtonTEXT.textContent).toEqual('Accordion Button');
    expect(screen.queryByText('Component TEST')).toBeNull();
  });
  test('開閉ボタンを押下した時、子の要素は表示されるか', async () => {
    render(
      <RecoilRoot>
        <Accordion title="Accordion Button">
          <TestComponent />
        </Accordion>
      </RecoilRoot>
    );

    const user = userEvent.setup();

    expect(screen.queryByText('Component TEST')).toBeNull();

    const AccButton = await screen.getByText('Accordion Button');

    await user.click(AccButton);

    const ChildTEXT = screen.getByText('Component TEST');
    expect(ChildTEXT.textContent).toEqual('Component TEST');
  });
  test('開閉ボタンを2回押下した時、子の要素は表示されない状態になっているか', async () => {
    render(
      <RecoilRoot>
        <Accordion title="Accordion Button">
          <TestComponent />
        </Accordion>
      </RecoilRoot>
    );

    const user = userEvent.setup();

    expect(screen.queryByText('Component TEST')).toBeNull();

    const AccButton = await screen.getByText('Accordion Button');

    await user.click(AccButton);

    const ChildTEXT = screen.getByText('Component TEST');
    expect(ChildTEXT.textContent).toEqual('Component TEST');

    await user.click(AccButton);

    expect(screen.queryByText('Component TEST')).toBeNull();
  });
});
