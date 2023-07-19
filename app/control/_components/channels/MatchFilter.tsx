import { RadioList } from '@/_components/RadioList';
import { useFilterOption } from '@/control/(hooks)/useAdminControl';

import { FilterOption } from '@/control/(types)';

interface Option {
  key: FilterOption;
  name: string;
}

const option: Option[] = [
  { key: 'All', name: '全て' },
  { key: 'Match', name: '登録済み' },
  { key: 'UnRegister', name: '未登録' },
];

export const MatchFilter = () => {
  const [matchLevel, changeFilterOption] = useFilterOption();

  return (
    <RadioList
      categories={option}
      selected={matchLevel}
      group="match"
      changeHandler={() => changeFilterOption}
    />
  );
};
