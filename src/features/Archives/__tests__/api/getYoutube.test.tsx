import { act, renderHook } from '@testing-library/react-hooks';
import { RecoilRoot, snapshot_UNSTABLE, useRecoilValue } from 'recoil';
import { waitFor } from '@testing-library/react';

import * as AxiosInstanceModule from '../../../../utility/axios/index';
import { AxiosStatusFactory } from '../../../../utility/test/AxiosResult';
import { useYoutube, useArchives, archivesAtom } from '../../api/getYoutube';
import { renderRecoilHook } from '../../../../utility/test/renderRecoilHookd';

const GoogleYoutubeFactory = (
    name: string
): GoogleApiYouTubePageInfo<GoogleApiYouTubeSearchResource> => {
    return {
        kind: name,
        etag: name,
        items: [
            {
                kind: name,
                etag: name,
                id: {
                    kind: name,
                    videoId: name,
                    channelId: name,
                    playlistId: name,
                },
                snippet: {
                    publishedAt: name,
                    channelId: name,
                    title: name,
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
                            url: name,
                            width: 99,
                            height: 99,
                        },
                    },
                    channelTitle: name,
                },
            },
        ],
    };
};

const YoutubeResourceFactory = (
    name: string
): GoogleApiYouTubeSearchResource => {
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
            publishedAt: name,
            channelId: name,
            title: name,
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
                    url: name,
                    width: 99,
                    height: 99,
                },
            },
            channelTitle: name,
        },
    };
};

describe('getYoutube Custom Hook TEST', () => {
    test('Atom - ArchivesAtomFamilyに対してID毎に配列を追加できるか', () => {
        const initRecoilSnapShot = snapshot_UNSTABLE(({ set }) => {
            set(archivesAtom('test'), [YoutubeResourceFactory('test')]);
        });
        expect(
            initRecoilSnapShot.getLoadable(archivesAtom('test')).valueOrThrow()
        ).toEqual([YoutubeResourceFactory('test')]);
    });
    test('Atom - 別IDを指定した時、追加した内容が出ていないこと', () => {
        const initRecoilSnapShot = snapshot_UNSTABLE(({ set }) => {
            set(archivesAtom('test'), [YoutubeResourceFactory('test')]);
        });
        expect(
            initRecoilSnapShot.getLoadable(archivesAtom('test2')).valueOrThrow()
        ).not.toEqual([YoutubeResourceFactory('test')]);
    });

    test('クエリ作成関数をコールしたら、APIをコールし値を取得できるか', async () => {
        const mock = jest
            .spyOn(AxiosInstanceModule, 'get')
            .mockImplementationOnce(() => {
                return Promise.resolve(
                    AxiosStatusFactory(200, true, GoogleYoutubeFactory('test'))
                );
            });

        expect(mock).toHaveBeenCalledTimes(0);

        const { result } = renderHook(() => useYoutube('testchannel'), {
            wrapper: RecoilRoot,
        });

        await waitFor(() => {
            const [response, setQuery] = result.current;

            //初期はクエリがなにもないので空配列が帰ってくる事
            expect(response.length).toBe(0);

            setQuery();

            expect(mock).toHaveBeenCalledTimes(1);
        });
    });
});

const useArchivesMock = () => {
    const [archives] = useArchives('testchannel');
    const ArchiveAtom = useRecoilValue(archivesAtom('testchannel'));
    return { archives, ArchiveAtom };
};

describe('useArchives TEST', () => {
    test('初期値の何も格納がされていない場合は、APIをコールし初期値を取得すること', async () => {
        const testData = GoogleYoutubeFactory('test');

        const mock = jest
            .spyOn(AxiosInstanceModule, 'get')
            .mockImplementationOnce(() => {
                return Promise.resolve(AxiosStatusFactory(200, true, testData));
            });

        const { result } = renderHook(() => useArchives('testchannel'), {
            wrapper: RecoilRoot,
        });
        await waitFor(() => {
            const [response] = result.current;

            expect(mock).toHaveBeenCalledTimes(1);

            expect(response).toEqual([testData.items]);
        });
    });
    test('addArchivesへ新しい配列を渡すと、その値を保存するか', () => {
        const { result } = renderRecoilHook(useArchivesMock);
        expect(result.current.ArchiveAtom).toEqual([]);

        const testData = GoogleYoutubeFactory('test');

        act(() => {
            result.current.addArchives([testData]);
        });

        expect(result.current.ArchiveAtom).toEqual([testData]);
    });

    test('existsでは、値の有無で真偽値が返ってくるか', () => {
        const { result } = renderRecoilHook(useArchivesMock);
        expect(result.current.ArchiveAtom).toEqual([]);
        expect(result.current.exists()).toEqual(false);

        const testData = GoogleYoutubeFactory('test');

        act(() => {
            result.current.addArchives([testData]);
        });

        expect(result.current.ArchiveAtom).toEqual([testData]);
        expect(result.current.exists()).toEqual(true);
    });
});
