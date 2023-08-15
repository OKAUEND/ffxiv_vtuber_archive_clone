export interface HikasenVtuber<T> {
  channelID: string;
  name: string;
  channelName: string;
  channelIconURL: string;
  isOfficial: boolean;
  Twitter: string;
  Twitch: string;
  dataCenter: string;
  server: string;
  beginTime: string | Date;
  tags?: T;
}

export interface Tags {
  content: Tag[];
  party: Tag[];
  timezone: Tag[];
}

export interface Tag {
  id: number;
  name: string;
  code: string;
  type: string;
}
