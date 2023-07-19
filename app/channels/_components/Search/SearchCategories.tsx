'use client';
import { useEffect } from 'react';

import { RadioList } from '@/_components/RadioList';

import {
  useChannelSearchOption,
  useChannelSearchBeginYear,
  useInitChannelSearch,
} from '@/channels/(hooks)/Search/useChannelSearchCategories';
import { ChannelSearchParams } from '@/channels/(types)';

import styles from '@/channels/_style/search/search.module.scss';

interface IProps {
  params?: ChannelSearchParams;
}

export const SearchCategories = ({ params }: IProps) => {
  const [initCategories] = useInitChannelSearch();
  const [selectedOption, sortData, changeOption] = useChannelSearchOption();
  const [selectedYear, years, changeYear] = useChannelSearchBeginYear();

  useEffect(() => {
    initCategories(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form action="/api/form" method="GET" className={styles.container}>
      <div>
        <h2>絞り込み</h2>
        <fieldset>
          <legend>並び</legend>
          <RadioList
            categories={sortData}
            selected={selectedOption.key}
            group="sort"
            changeHandler={changeOption}
          />
        </fieldset>
      </div>
      <div>
        <h2>カテゴリー検索</h2>
        <fieldset>
          <legend>配信開始年</legend>
          <RadioList
            categories={years}
            selected={selectedYear.key}
            group="year"
            changeHandler={changeYear}
          />
        </fieldset>
      </div>
      <div className={styles.search_event}>
        <button className={styles.search}>検索する</button>
      </div>
    </form>
  );
};
