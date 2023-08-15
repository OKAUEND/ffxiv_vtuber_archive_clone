import { HikasenVtuber, Tags } from '@/(types)';

export interface Channels {
  gas: HikasenVtuber<Tags>[];
  db: HikasenVtuber<Tags>[];
}

/**
 * フィルタリング対象の状態
 */
export type FilterOption = 'All' | 'Match' | 'UnRegister';
