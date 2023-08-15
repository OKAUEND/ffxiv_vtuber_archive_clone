import { Tag } from '@/(types)';
import { convertTagsToCategoryTags } from '@/_utile/convert/tags';

export const tags: Tag[] = [
  {
    id: 1,
    name: 'ストーリー',
    code: 'story',
    type: 'content',
  },
  {
    id: 2,
    name: '極・幻',
    code: 'primal',
    type: 'content',
  },
  {
    id: 3,
    name: '高難易度',
    code: 'raid',
    type: 'content',
  },
  {
    id: 4,
    name: 'ハウジング',
    code: 'housing',
    type: 'content',
  },
  {
    id: 5,
    name: '世界設定',
    code: 'lore',
    type: 'content',
  },
  {
    id: 6,
    name: '地図',
    code: 'treasure',
    type: 'content',
  },
  {
    id: 7,
    name: 'SS',
    code: 'treasure',
    type: 'content',
  },
  {
    id: 8,
    name: 'ギャザクラ',
    code: 'disciples',
    type: 'content',
  },
  {
    id: 9,
    name: 'ユーザーイベント',
    code: 'event',
    type: 'content',
  },
  {
    id: 10,
    name: 'エウレカ・ボズヤ系',
    code: 'filed',
    type: 'content',
  },
  {
    id: 11,
    name: 'PvP',
    code: 'pvp',
    type: 'content',
  },
  {
    id: 12,
    name: 'ダンジョン',
    code: 'dungeon',
    type: 'content',
  },
  {
    id: 13,
    name: '参加型',
    code: 'party',
    type: 'play',
  },
  {
    id: 14,
    name: 'ソロ',
    code: 'solo',
    type: 'play',
  },
  {
    id: 15,
    name: 'npc芸歓迎',
    code: 'npcplay',
    type: 'play',
  },
  {
    id: 16,
    name: '攻略',
    code: 'raiders',
    type: 'play',
  },
  {
    id: 17,
    name: '周回',
    code: 'farm',
    type: 'play',
  },
  {
    id: 18,
    name: '早朝',
    code: 'earylmorning',
    type: 'timezone',
  },
  {
    id: 19,
    name: '朝',
    code: 'morning',
    type: 'timezone',
  },
  {
    id: 20,
    name: '昼',
    code: 'midday',
    type: 'timezone',
  },
  {
    id: 21,
    name: '夕方',
    code: 'evening',
    type: 'timezone',
  },
  {
    id: 22,
    name: '夜',
    code: 'night',
    type: 'timezone',
  },
  {
    id: 23,
    name: '深夜',
    code: 'midnight',
    type: 'timezone',
  },
];

export const getTags = () => {
  return tags;
};
