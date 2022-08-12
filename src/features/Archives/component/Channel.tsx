import React from 'react';
import { IconElement } from '../../../component/Element/Image';
import { VtuberDetail } from '../types';

import { Twitter, Youtube, Twitch } from '../../../component/Element/Icon';
const iconURL = import.meta.env.VITE_YOUTUBE_CHANNEL_ICON_URL;

interface IProps {
    channelDetail: VtuberDetail;
}

export const Channel = ({ channelDetail }: IProps) => {
    return (
        <div className="grid grid-cols-3 grid-rows-2 md:w-6/12">
            <div className="col-span-1 row-span-3 grid justify-items-end mr-3">
                <IconElement
                    src={`${iconURL}${channelDetail.channelIconID}`}
                    size="Small"
                    radius="full"></IconElement>
            </div>
            <span className="col-span-2 row-span-1 text-gray-100 text-lg text-left text-xl pt-4">
                {channelDetail.channelName}
            </span>
            <nav className="col-span-2 row-span-2 flex flex-row gap-2 justify-start">
                {channelDetail.twitter != '' && (
                    <a href={channelDetail.twitter}>
                        <Twitter />
                    </a>
                )}
                {/**
                 * Youtubeのチャンネルが存在しないは、対象配信者となりえないので、
                 * Youtubeのリンクは常に表示させる
                 */}
                <a href={channelDetail.channelID}>
                    <Youtube />
                </a>
                {channelDetail.twitch != '' && (
                    <a href={channelDetail.twitch}>
                        <Twitch />
                    </a>
                )}
            </nav>
        </div>
    );
};
