import { HikasenVtuber } from '@/(types)';
import { Tagging } from '@prisma/client';

const HikasenVtuberResourceFactory = (
  name: string
): HikasenVtuber<Tagging[]> => {
  return {
    channelID: name,
    channelIconURL: '/public/mock/image/icon.png',
    channelName: `${name} Channel`,
    name: name,
    Twitter: '',
    Twitch: '',
    dataCenter: 'test',
    server: 'test',
    isOfficial: false,
    beginTime: '',
    tags: [],
  };
};

export const createHikasenVtuberData = (
  name: string
): HikasenVtuber<Tagging[]>[] => {
  const array = Array.from({ length: 5 }, (_, index) =>
    HikasenVtuberResourceFactory(`${name}${index}`)
  );
  return array;
};
