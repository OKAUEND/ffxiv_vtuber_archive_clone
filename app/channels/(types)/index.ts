import { Prisma } from '@prisma/client';

export interface ChannelSearchParams {
  orderBy: string;
  year: string;
  content: string[];
  play: string[];
  timezone: [];
}

export interface PrismaQuery {
  query: {
    content: Prisma.ChannelWhereInput;
    play: Prisma.ChannelWhereInput;
    timeZone: Prisma.ChannelWhereInput;
  };
  year: Prisma.ChannelWhereInput;
  orderBy: Prisma.SortOrder;
}
