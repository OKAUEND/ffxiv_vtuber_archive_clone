import React from 'react';
import { RecoilRoot } from 'recoil';
import { ChannelPanel } from '../component/ChannelPanel';

import { useChannels } from '../hook/useChannel';
import { HikasenVtuber } from '../types';

import { useRouter } from 'next/router';

type Props = {
    ChannelsFirstPagenation: HikasenVtuber[];
};

export const Channels = ({ ChannelsFirstPagenation }: Props) => {
    // const [channels, resultStatus, reload] = useChannels();
    const [channels] = useChannels(ChannelsFirstPagenation);
    const router = useRouter();

    const onhandler = (selectedId: string = '') => {
        if (selectedId === '') return;
        router.push({
            pathname: '/Archives',
            query: { channelId: selectedId },
        });
    };

    return (
        <div className="grid grid-cols-main">
            <ChannelPanel channels={channels} onhandler={onhandler} />
        </div>
    );
};
