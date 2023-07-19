import { ChannelSearchParams } from '@/channels/(types)';
import { ChannelResult } from '@/channels/_components/Result/router';
import { Prisma } from '@prisma/client';

const createWhereQuery = (params: ChannelSearchParams) => {
  const time = new Date(params.year);

  //まずは配信時間のWhere文だけを作成する
  //後にタグ検索とかを行いたいので、改修はしようね
  const beginDayTime = new Date(time);
  const endDayTime = new Date(time);
  endDayTime.setMonth(12);
  endDayTime.setSeconds(-1);

  const where: Prisma.ChannelWhereInput = {
    beginTime: {
      //開始日時
      gte: beginDayTime.toISOString(),
      //終了日時
      lt: endDayTime.toISOString(),
    },
  };
  return beginDayTime;
};

const getChannelWhere = (params: ChannelSearchParams, page: string) => {
  const query = createWhereQuery(params);

  return query;
};

export default async function ChannelResultIndex({
  params,
  searchParams,
}: {
  params: { pages: string };
  searchParams: ChannelSearchParams;
}) {
  const query = getChannelWhere(searchParams, '');
  return (
    <>
      {query.toISOString()}
      {/* <ChannelResult page={params.pages} params={searchParams} /> */}
    </>
  );
}
