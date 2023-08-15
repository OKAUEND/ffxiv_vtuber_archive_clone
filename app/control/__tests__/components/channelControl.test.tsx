import { vi, describe, test, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import ChannelControl from '@/control/_components/channelControl';
import { createHikasenVtuberData } from '@/channels/__tests__/_mock';
import * as hookMock from '@/control/(hooks)/useAdminControl';

describe('Control Channel Component UI TEST', () => {
  const spy = vi.spyOn(hookMock, 'useAdminControl');
  spy.mockImplementation(() => {
    return createHikasenVtuberData('Control');
  });
  test('Hookから取得した要素をリストで表示できているか', () => {
    render(<ChannelControl isAdmin={true} />);

    const list = screen.getByRole('list');

    const { getAllByRole } = within(list);
    const items = getAllByRole('listitem');
    expect(items.length).toBe(5);
  });
  test('配信者名を表示できているか', () => {
    render(<ChannelControl isAdmin={true} />);

    const list = screen.getByRole('list');

    const { getAllByRole } = within(list);
    const elements = getAllByRole('heading', { level: 3 });
    expect(elements.length).toBe(5);

    const heads = screen.getAllByText(/^Control[0-9] Channel$/);
    expect(heads.length).toEqual(5);
  });
  test('配信者のアイコンは表示出来ているか', () => {
    render(<ChannelControl isAdmin={true} />);

    const imageElement = screen.getAllByAltText(/のチャンネルアイコン$/);
    expect(imageElement.length).toEqual(5);
  });
});
