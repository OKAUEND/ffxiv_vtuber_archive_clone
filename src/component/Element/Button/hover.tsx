import React from 'react';

type size = 'small' | 'medium' | 'large';

const ElementSize = (size: size): string => {
    switch (size) {
        case 'small':
            return 'w-16 h-16';
        case 'medium':
            return 'w-28 h-28';
        case 'large':
            return 'w-40 h-40';
    }
};

type radius = 'none' | 'full';

const ElementRadius = (radius: radius): string => {
    switch (radius) {
        case 'none':
            return 'rounded-none';
        case 'full':
            return 'rounded-full';
    }
};

interface Props {
    children: ReactNode;
    handler: () => void;
    size: size;
    radius: radius;
}

export const Hover = (Props: Props) => {
    const handlerClick = () => {
        Props.handler();
    };

    return (
        <button
            onClick={handlerClick}
            className={`${ElementSize(Props.size)} ${ElementRadius(
                Props.radius
            )} hover:bg-gray-400`}>
            {Props.children}
        </button>
    );
};
