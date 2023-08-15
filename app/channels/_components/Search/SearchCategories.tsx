'use client';
import { useEffect } from 'react';

import { RadioList } from '@/_components/RadioList';
import { CheckBoxList } from '@/_components/CheckBoxList';

import {
  useChannelSearchOption,
  useChannelSearchBeginYear,
  useInitChannelSearch,
  useTags,
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
  const tags = useTags();

  useEffect(() => {
    initCategories(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form action="/api/form" method="GET" className={styles.container}>
      <div>
        <h2>絞り込み</h2>
        <fieldset className={styles.category_field}>
          <legend className={styles.title}>並び</legend>
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
        <fieldset className={styles.category_field}>
          <legend className={styles.title}>配信開始年</legend>
          <RadioList
            categories={years}
            selected={selectedYear.key}
            group="year"
            changeHandler={changeYear}
          />
        </fieldset>
        <fieldset>
          <legend>プレイスタイル</legend>
          <CheckBoxList
            values={tags.content}
            changeHandler={() => {
              return;
            }}
          ></CheckBoxList>
        </fieldset>
        <fieldset>
          <legend>PTプレイ</legend>
          <CheckBoxList
            values={tags.party}
            changeHandler={() => {
              return;
            }}
          ></CheckBoxList>
        </fieldset>
        <fieldset>
          <legend>配信時間帯</legend>
          <CheckBoxList
            values={tags.timezone}
            changeHandler={() => {
              return;
            }}
          ></CheckBoxList>
        </fieldset>
      </div>
      <div className={styles.search_event}>
        <button className={styles.search}>検索する</button>
      </div>
    </form>
  );
};
