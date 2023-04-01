import React, { Suspense } from 'react';

import link from 'next/link';

import NextLoad from '../component/NextLoad';

import { ArchiveList } from '../component/ArchiveList';
import { useArchives } from '../hook/useArchive';
import { useFirstLiveDayTime } from '../hook/useFirstLiveDayTime';

import { Error } from '@/src/component/Error';

const typeGuard = (target: string | undefined) => {
    if (target === undefined) {
        return 'error';
    }
    return target;
};

export const ArchiveRouter = () => {
    // const { channelID } = useParams<'channelID'>();
    // const navigate = useNavigate();

    //TypeGuardでundefinedを除外する
    // const targetChannelID = typeGuard(channelID);

    const Archives = useArchives('channelId');
    const loadNextList = usePage();

    const isError = () => {
        if (!error) return false;
        return Archives.length > 0 && error.error;
    };

    if (Archives.length === 0 && error)
        return <Error status={error.status} message={error.message} />;
    return (
        <div className="bg-gray-800 flex justify-center content-center">
            {isError() && <div>Error</div>}
            <div>
                {/* <button onClick={() => navigate(-1)}>戻る</button> */}
            </div>
            <div className="w-full md:w-1/2">
                <ArchiveList Archives={[...Archives.archives]} />
            </div>
            <div>
                <button onClick={() => loadNextList('channelId')}>Next</button>
            </div>
        </div>
    );
};
