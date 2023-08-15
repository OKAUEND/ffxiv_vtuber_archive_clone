import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  //標準値を弾くために、一度クエリパラメータを配列にする
  const queries = request.nextUrl.searchParams.entries();

  //デフォ値のクエリパラメータは結果画面のURLにのせたくないため、除外して生成し直す
  let param = '';
  let year = '';
  let content = '';
  let play = '';
  let timezone = '';
  [...queries].forEach((query, index) => {
    if (query[1] === 'none' || query[1] === '0000') return;

    if (index === 0) return (param = `?${query[0]}=${query[1]}`);

    switch (query[0]) {
      case 'sort':
        return (param = `?sort=${query[1]}`);
      case 'year':
        return (year = `${year}&year=${query[1]}`);
      case 'content':
        return (content = `${content}&content=${query[1]}`);
      case 'play':
        return (play = `${play}&play=${query[1]}`);
      case 'timezone':
        return (timezone = `${timezone}&timezone=${query[1]}`);
    }
  });

  //作成したパスで結果画面へアクセスする。
  //値の取得自体は結果画面で行うため、ここではクエリの作成だけをする
  redirect(`/channels/result${param}${year}${content}${play}${timezone}`);
}
