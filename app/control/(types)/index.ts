import { HikasenVtuber } from '@/(types)';

export interface Channels {
  gas: HikasenVtuber[];
  db: HikasenVtuber[];
}

/**
 * フィルタリング対象の状態
 */
export type FilterOption = 'All' | 'Match' | 'UnRegister';
