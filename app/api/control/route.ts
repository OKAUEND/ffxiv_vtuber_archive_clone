import { fetchExtend } from '@/_utile/fetch';
import { HikasenVtuber } from '@/(types)/';
import { Tagging } from '@prisma/client';

import prisma from '@/_utile/prisma';

export async function GET() {
  const url = `${process.env.CHANNELLIST_URL}`;

  const gas = await fetchExtend<HikasenVtuber<Tagging>[]>({
    url,
    store: false,
  });
  const convertChannels: HikasenVtuber<Tagging>[] = gas.map((channel) => {
    //スプレッドシートからの取得ではJTCではなくUTCになっているため、9時間をたしてJTCにする
    const time = new Date(channel.beginTime);
    time.setHours(time.getHours() + 9);
    const convertTime = time.toISOString();

    return {
      channelID: channel.channelID,
      channelIconURL: channel.channelIconURL,
      channelName: channel.channelName,
      isOfficial: channel.isOfficial,
      name: channel.name,
      Twitter: channel.Twitter,
      Twitch: channel.Twitch,
      dataCenter: channel.dataCenter,
      server: channel.server,
      beginTime: convertTime,
    };
  });
  const db = await prisma.channel.findMany();
  const response = { gas: convertChannels, db: db };
  return new Response(JSON.stringify(response));
}

export async function POST(request: Request) {
  const channel: HikasenVtuber<Tagging>[] = await request.json();
  await prisma.channel.createMany({
    data: channel,
    skipDuplicates: true,
  });
  return new Response(JSON.stringify('Success'));
}

// export async function DELETE(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const name = searchParams.get('name');
//   const test = await prisma.user.deleteMany({
//     where: {
//       email: {
//         contains: `Hiroshi@${name}`,
//       },
//     },
//   });
// }

// export async function PUT(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const name = searchParams.get('name');
//   const time = new Date('2013-08-13T12:00:00Z').toISOString();
//   const test = await prisma.user.update({
//     where: {
//       email: `Hiroshi@HQ`,
//     },
//     data: {
//       create_at: time,
//     },
//   });
// }
