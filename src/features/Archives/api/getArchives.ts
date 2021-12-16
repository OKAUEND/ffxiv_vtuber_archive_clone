import axios, { AxiosResponse, AxiosAdapter } from 'axios';
import { atom, selector } from 'recoil'
export type timeRangetype = {
    EndTime: string;
    BeginTime: string;
};

export const axiosYoutubeInstance = axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3/search',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 2000,
});

export const createYoutubeQuery = (
    channelState: string,
    timeRangeState: timeRangetype
): string => {
    const part = 'snippet';
    const APIKey = '';
    const maxResult = 50;
    const order = 'date';
    const query = 'FF14';

    return `?part=${part}&channelId=${channelState}&order=${order}&q=${query}&publishedBefore=${timeRangeState.EndTime}&publishedAfter=${timeRangeState.BeginTime}&maxResults=${maxResult}&key=${APIKey}`;
};

export const fetchYoutube = async (
    channelId: string,
    TimeRange: timeRangetype
) => {
    const query = createYoutubeQuery(channelId, TimeRange);
    const response = await axiosYoutubeInstance.get<
        GoogleApiYouTubePageInfo<GoogleApiYouTubeSearchResource>
    >(query);
    return response.data.items;
};

const ArchivesList = new Map<string, GoogleApiYouTubeSearchResource[]>();

export const setArchives = (
    key: string,
    newArchives: GoogleApiYouTubeSearchResource[]
) => {
    ArchivesList.set(key, newArchives);
};

export const getArchives = (key: string): GoogleApiYouTubeSearchResource[] => {
    const result = ArchivesList.get(key);
    if (result === undefined) return [];
    return result;
};

export const currentChannelIDState = atom({
    key: 'CurrentChannelID',
    default: 'UC6oDys1BGgBsIC3WhG1BovQ',
});

const DefaultDate = new Date();
const HalfMonth = new Date();
HalfMonth.setMonth(HalfMonth.getMonth() - 6);

export const timeRangeState = atom<timeRangetype>({
    key: 'TimeRange',
    default: {
        EndTime: DefaultDate.toISOString(),
        BeginTime: HalfMonth.toISOString(),
    },
});

export const isPeriod = <T extends Date>(
    lastArchiveDayTime: T,
    BeginTime: T
): boolean => {
    return lastArchiveDayTime <= BeginTime;
};

export const useArchives = selector({
    key: 'Archives',
    get: async ({ get }) => {
        const youtubeData = await get(useYoutubeAxios);
        const channelState = get(currentChannelIDState);

        return youtubeData;
    },
});
