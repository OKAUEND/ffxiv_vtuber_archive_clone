import React from 'react';

//アイコンのサイズをPropsで指定したいので型の内容を制限する
type size = 'Large' | 'Medium' | 'Small';

type ImageProps = JSX.IntrinsicElements['img'];

type Props = ImageProps & {
    size: size;
    isRadius: boolean;
};

export const IconElement = (props: Props): JSX.Element => {
    const elementSize = () => {
        switch (props.size) {
            case 'Large':
                return '.w-8 .h-8';
            case 'Medium':
                return '.w-4 .h-4';
            case 'Small':
                return '.w-2 .h-2';
        }
    };

    const elementRadius = () => {
        return props.isRadius ? '.rounded-full' : '.rounded-none';
    };

    return (
        <div className={`${elementRadius()} ${elementSize()}`}>
            <img {...props} />
        </div>
    );
};
