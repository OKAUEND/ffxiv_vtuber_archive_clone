import { useEffect } from 'react';
import {
    atomFamily,
    noWait,
    selectorFamily,
    useRecoilCallback,
    useRecoilValue,
} from 'recoil';
import useSWR from 'swr';
import { useFetch } from '@/src/hooks/useFetch';

//---------------------------------------------------------------------------

type Archive = GoogleApiYouTubeSearchResource;

type YoutubeDate =
    GoogleApiYouTubePaginationInfo<GoogleApiYouTubeSearchResource>;

type ApiResult = {
    item: YoutubeDate;
    status: number;
};

type QueryInput = {
    channelId: string;
    beginTime: string;
};
//---------------------------------------------------------------------------

/**
 * 1ページで読み込みを行う値
 */
//50件だと取得回数が多すぎる、25件未満だと除外されたアーカイブがあった場合、
//1度に表示する件数が少なすぎるため、25件で固定する(※後ほど可変型にしてもいいかもしれない)
export const pageSize = 25;

/**
 * 検索したいクエリワード
 */
//配信の概要欄にクエリワードがあると、Youtubeの性質上取得されてしまうので、
//取得後にフィルタリングするために、抽出させたい単語をまとめておいた
const queryWorld = `FF14|FFXIV`;

//---------------------------------------------------------------------------

export const createQuery = ({ channelId, beginTime }: QueryInput): string => {
    const time = beginTime === '' ? new Date().toISOString() : beginTime;

    return `/api/archives?channelId=${channelId}&publishedBefore=${time}`;
};

const createNextBeginTime = (Archive: Archive[]): string => {
    //配列最後列の動画の日時より1分前を設定する
    //1分前にしないと、重複した動画を再取得してしまうため
    const baseTime = new Date(Archive.slice(-1)[0].snippet.publishedAt);
    const targetTime = new Date(baseTime.getTime() - 60 * 1000);
    return targetTime.toISOString();
};

const converRawResultToArchives = (response: YoutubeDate): Archive[] => {
    return response.items;
};

//---------------------------------------------------------------------------
/**
 *
 * @param channelId 対象の配信者のYoutubeChannelID
 * @returns {Array} 取得済みの過去配信(アーカイブ)
 */
export const useArchives = (channelId: string) => {
    const fetcher = async (url: string): Promise<ApiResult> => {
        const resonse = await fetch(url);
        return resonse.json();
    };

    const { data, error } = useSWR(
        `/api/archives?channelId=${channelId}`,
        fetcher,
        {
            suspense: true,
        }
    );

    return { archives: data.item.items };
};
