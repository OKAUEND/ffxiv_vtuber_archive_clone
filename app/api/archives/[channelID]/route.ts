import { NextRequest } from 'next/server';
import { fetchExtend } from '@/_utile/fetch';

type Youtube = GoogleApiYouTubePaginationInfo<GoogleApiYouTubeSearchResource>;

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: { channelID: string };
  }
) {
  const APIKey = process.env.API_KEY;
  const beginTime = request.nextUrl.searchParams.get('begin');
  const slug = params.channelID;

  const url = `${process.env.YOUTUBE_API_URL}?channelId=${slug}&key=${APIKey}&publishedBefore=${beginTime}&part=snippet&type=video&order=date&q=FF14|FFXIV&maxResults=25`;

  if (slug === '' || slug === undefined) {
    return new Response(JSON.stringify('Not REQUEST'), {
      status: 400,
    });
  }
  const res = await fetchExtend<Youtube>({ url });
  return new Response(JSON.stringify(res));
}
