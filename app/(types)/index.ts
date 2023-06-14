export interface HikasenVtuber {
  channelID: string;
  name: string;
  channelName: string;
  channelIconID: string;
  twitter: string;
  twitch: string;
  ffxiv: FFXIV;
}

interface FFXIV {
  dataCenter: string;
  server: string;
}
