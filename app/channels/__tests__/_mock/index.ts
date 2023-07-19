import { HikasenVtuber } from '@/(types)';

const HikasenVtuberResourceFactory = (name: string): HikasenVtuber => {
  return {
    channelID: name,
    channelIconID: '/public/mock/image/icon.png',
    channelName: `${name} Channel`,
    name: name,
    twitter: '',
    twitch: '',
    ffxiv: {
      dataCenter: 'test',
      server: 'test',
    },
  };
};

export const createHikasenVtuberData = (name: string): HikasenVtuber[] => {
  const array = Array.from({ length: 5 }, (_, index) =>
    HikasenVtuberResourceFactory(`${name}${index}`)
  );
  return array;
};
