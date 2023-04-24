import { useRouter } from 'next/router';

import NextLoad from '../component/NextLoad';

import { ArchiveList } from '../component/ArchiveList';
import { useArchives } from '../hook/useArchive';
import { useEffect } from 'react';

export const Archive = () => {
    const router = useRouter();

    //String[] or Stringなので、配列を除外しStringに型を定める
    const query = Array.isArray(router.query.channelId)
        ? router.query.channelId[0]
        : router.query.channelId;

    const { archives, setChannelID, reset } = useArchives();

    useEffect(() => {
        if (router.isReady) {
            setChannelID(query);
        }
    }, [router.isReady, router.query.channelId]);

    const onHandler = () => {
        reset();
        router.push({
            pathname: '/',
        });
    };

    return (
        <div className="bg-gray-800 flex justify-center content-center">
            <div>
                <button onClick={() => onHandler()}>戻る</button>
            </div>
            <div className="w-full md:w-1/2">
                <ArchiveList Archives={[...archives]} />
            </div>
            <div>
                <button onClick={() => {}}>Next</button>
            </div>
        </div>
    );
};
