import * as React from 'react';
import type { SVGProps } from 'react';

// Define a new interface to include the isSelected prop
interface EmotionIconProps extends SVGProps<SVGSVGElement> {
    isSelected: boolean;
}

const SvgEmotion = ({ isSelected, ...props }: EmotionIconProps) => {
    // Define color variables based on the isSelected prop
    const primaryFill = isSelected ? '#005FE2' : '#525252';
    const backgroundColor = isSelected ? '#E0F2FE' : '#F5F5F5';
    const strokeColor = isSelected ? '#E0F2FE' : '#F5F5F5';

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 42 42" {...props}>
            <path fill={backgroundColor} d="M34 0a8 8 0 0 1 8 8v26a8 8 0 0 1-8 8H8a8 8 0 0 1-8-8V8a8 8 0 0 1 8-8z" />
            <path stroke={strokeColor} d="M34 0a8 8 0 0 1 8 8v26a8 8 0 0 1-8 8H8a8 8 0 0 1-8-8V8a8 8 0 0 1 8-8z" />
            <path stroke={strokeColor} d="M31 31H11V11h20z" />
            <path stroke={strokeColor} d="M31 31H11V11h20z" />
            <path
                fill={primaryFill}
                d="m12.86 22.734 7.058 6.59a1.586 1.586 0 0 0 2.164 0l7.059-6.59A5.84 5.84 0 0 0 31 18.457v-.227a5.583 5.583 0 0 0-9.531-3.949L21 14.75l-.469-.469A5.585 5.585 0 0 0 11 18.231v.226c0 1.621.672 3.172 1.86 4.277"
            />
        </svg>
    );
};
export default SvgEmotion;
