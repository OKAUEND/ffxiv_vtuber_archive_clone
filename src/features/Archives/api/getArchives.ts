import axios, { AxiosResponse } from 'axios';
import { atom, selector } from 'recoil';

import { Archives } from '../types';

type timeRangeState = {
    EndTime: string;
    BeginTime: string;
};

type cacheArchives = {
    channelId: string;
    archives?: Pick<
        GoogleApiYouTubePageInfo<GoogleApiYouTubeSearchResource>,
        'items'
    >;
};

export const getArchives = <
    T extends GoogleApiYouTubePageInfo<GoogleApiYouTubeSearchResource>
>(
    channelState: string,
    timeRangeState: timeRangeState
): Promise<AxiosResponse<T, T>> => {
    const api_base = 'https://www.googleapis.com/youtube/v3/search';
    const part = 'snippet';
    const APIKey = '';
    const maxResult = 50;
    const order = 'date';
    const query = 'FF14';

    // &publishedBefore=${endTime}&publishedAfter=${beginTime}
    return axios.get(
        `${api_base}?part=${part}&channelId=${channelState}&order=${order}&q=${query}&publishedBefore=${timeRangeState.EndTime}&publishedAfter=${timeRangeState.BeginTime}&maxResults=${maxResult}&key=${APIKey}`
    );
};
