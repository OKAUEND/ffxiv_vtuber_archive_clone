import React, { Suspense } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { Archive } from './Archive';

import NextLoad from '../component/NextLoad';
import { Hover } from '../../../component/Element/Button';
import { LeftArrow } from '../../../component/Element/Icon';

const typeGuard = (target: string | undefined) => {
    if (target === undefined) {
        return 'error';
    }
    return target;
};

export const ArchiveRouter = () => {
    const { channelID } = useParams<'channelID'>();
    const navigate = useNavigate();

    //TypeGuardでundefinedを除外する
    const targetChannelID = typeGuard(channelID);

    return (
        <div>
            <div className="flex justify-start">
                <Hover handler={() => navigate(-1)} size="small" radius="full">
                    <div className="text-gray-100">
                        <LeftArrow />
                    </div>
                </Hover>
            </div>
            <div>
                <Suspense fallback={<p>Loading...</p>}>
                    <Archive channelId={targetChannelID} />
                </Suspense>
            </div>
            <div className="mt-2 mb-2">
                <Suspense fallback={<p>Loading...</p>}>
                    <NextLoad channelId={targetChannelID} />
                </Suspense>
            </div>
        </div>
    );
};
