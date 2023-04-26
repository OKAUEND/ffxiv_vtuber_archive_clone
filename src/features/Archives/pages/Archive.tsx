import { useRouter } from 'next/router';

import NextLoad from '../component/NextLoad';

import { ArchiveList } from '../component/ArchiveList';
import { useArchives } from '../hook/useArchive';
import { useEffect } from 'react';

export const Archive = () => {
    const router = useRouter();
    const query = router;

    const { archives, setChannelID, reset } = useArchives();

    useEffect(() => {
        if (router.isReady) {
            //String[] or Stringなので、配列を除外しStringに型を定める
            const channelID = Array.isArray(router.query.channelId)
                ? router.query.channelId[0]
                : router.query.channelId;
            console.log({ channelID });
            setChannelID(channelID);
        }
    }, [query, router]);

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
