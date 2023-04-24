import { rest } from 'msw';

export const GoogleYoutubeFactory = (
    name: string = 'Mock',
    token: string = 'FirstToken'
): GoogleApiYouTubePaginationInfo<GoogleApiYouTubeSearchResource> => {
    return {
        kind: name,
        etag: name,
        nextPageToken: token,
        prevPageToken: 'prev',

        pageInfo: {
            totalResults: 0,
            resultsPerPage: 0,
        },
        items: YoutubeResourceFactory(name),
    };
};

const generateDate = (
    name: string = 'Mock',
    livetitle: string = 'React Coding Live'
) => {
    return {
        kind: name,
        etag: name,
        id: {
            kind: name,
            videoId: name,
            channelId: name,
            playlistId: name,
        },
        snippet: {
            publishedAt: '2020-01-01T12:00:00Z',
            channelId: name,
            title: livetitle,
            description: name,
            thumbnails: {
                default: {
                    url: name,
                    width: 99,
                    height: 99,
                },
                high: {
                    url: name,
                    width: 99,
                    height: 99,
                },
                medium: {
                    url: '/mock/image/hddefault.jpg',
                    width: 336,
                    height: 188,
                },
            },
            channelTitle: name,
        },
    };
};

export const YoutubeResourceFactory = (
    name: string = 'Mock'
): GoogleApiYouTubeSearchResource[] => {
    const reacts = Array.from({ length: 5 }, () => generateDate(name));
    const ff14 = Array.from({ length: 10 }, (_, index) =>
        generateDate(name, `[FF14]Ultimate ${name} ${index}Day`)
    );
    const ffxiv = Array.from({ length: 10 }, (_, index) =>
        generateDate(name, `-FFXIV- StoryLive ${name} ${index}Day`)
    );
    return [...reacts, ...ff14, ...ffxiv];
};

const path = () => 'https://www.googleapis.com/youtube/v3/search';

type Data = GoogleApiYouTubePaginationInfo<GoogleApiYouTubeSearchResource>;

type Error = {
    message: string;
    status: number;
};

export const youtubePostHandler = (status: 200 | 400 | 500 = 200) => {
    return rest.get<Data, { id: string }, Data | Error>(
        path(),
        async (req, res, ctx) => {
            const channelId = req.url.searchParams.get('channelId');
            const nextPageToken = req.url.searchParams.get('nextPagetoken');

            if (status === 400) {
                return res(
                    ctx.status(400),
                    ctx.json({
                        message: 'Bad Request',
                        status: 400,
                        error: true,
                    })
                );
            }

            if (status === 500) {
                return res(
                    ctx.status(status),
                    ctx.json({
                        message: 'Internal Server Error',
                        status: 500,
                        error: true,
                    })
                );
            }

            if (channelId && nextPageToken) {
                return res(
                    ctx.status(status),
                    ctx.json(GoogleYoutubeFactory(channelId, nextPageToken))
                );
            }

            return res(
                ctx.status(status),
                ctx.json(GoogleYoutubeFactory(channelId))
            );
        }
    );
};

export const archiveAPIRouterHandler = (status: 200 | 400 | 500 = 200) => {
    return rest.get<Data, { id: string }, Data | Error>(
        '/api/archives',
        async (req, res, ctx) => {
            const channelId = req.url.searchParams.get('channelId');
            const beginTime = req.url.searchParams.get('publishedBefore');
            if (status === 400) {
                return res(
                    ctx.status(400),
                    ctx.json({ message: 'Bad Request', status: 400 })
                );
            }

            if (status === 500) {
                return res(
                    ctx.status(status),
                    ctx.json({
                        message: 'Internal Server Error',
                        status: 500,
                    })
                );
            }

            return res(
                ctx.status(status),
                ctx.json({
                    item: GoogleYoutubeFactory(channelId),
                    status: 200,
                    message: 'Success',
                })
            );
        }
    );
};
