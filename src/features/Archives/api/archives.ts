import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

type Handler = (request: NextApiRequest, response: NextApiResponse) => void;

export const handler: Handler = async (request, response) => {
    const { method, query } = request;
    const APIKey = process.env.API_KEY;

    type QueryParams = typeof query;

    const createYoutubeURL = (query: QueryParams): string => {
        const channelId =
            typeof query.channelId === 'string'
                ? `channelId=${query.channelId}`
                : ``;
        const beginTime = `&publishedBefore=${new Date().toISOString()}`;

        return `${process.env.YOUTUBE_API_URL}?${channelId}&key=${APIKey}&part=snippet&type=video&order=date&q=FF14|FFXIV&maxResults=25`;
    };

    switch (method) {
        case 'GET':
            try {
                if (query.channelId === '') {
                    return response.status(400).json({
                        message: 'Method ChannelID Not Allowed',
                        status: 400,
                        error: true,
                    });
                }
                const res = await axios.get<
                    GoogleApiYouTubePaginationInfo<GoogleApiYouTubeSearchResource>
                >(createYoutubeURL(query));

                return response
                    .status(res.status)
                    .json({ item: res.data, status: res.status });
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    return response.status(err.response.status).json({
                        ...err.response.data,
                        error: true,
                        channelId: query.channelId,
                    });
                }
                return response.status(500).json({});
            }

        default:
            response.setHeader('Allow', ['GET']);
            response.status(405).end(`Method ${method} Not Allowed`);
            break;
    }
};
