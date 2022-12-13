import React from 'react';
import {ProfileInfo} from "@/model/profile";
import {classNames} from "@/lib/utils";

export enum AvatarSize {
    SMALL,
    LARGE
}

const AvatarSizeList: Record<AvatarSize, {container: {h: string, w: string}, image: {h: string, w: string}}> = {
    [AvatarSize.SMALL]: {container: {h: 'h-6', w: 'w-6'}, image: {h: 'h-4', w: 'w-4'}},
    [AvatarSize.LARGE]: {container: {h: 'h-20', w: 'w-20'}, image: {h: 'h-16', w: 'w-16'}},
}

export type AvatarProps = {
    profile: ProfileInfo,
    size: AvatarSize
};

const Avatar = ({profile, size}: AvatarProps) => {

    const containerSize = AvatarSizeList[size].container;
    const imageSize = AvatarSizeList[size].image;

    return (
        <span className={classNames(containerSize.h, containerSize.w, 'overflow-hidden rounded-full bg-white flex flex-row justify-center items-center')}>
            <img
                className={classNames(imageSize.h, imageSize.w)}
                src={`/public/avatar/${profile.avatar}.png`}
                alt={profile.name}
            />
        </span>
    );
};

export default Avatar;

