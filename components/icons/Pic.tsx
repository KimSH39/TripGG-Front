import * as React from 'react';
import type { SVGProps } from 'react';

// Define a new interface to include the isSelected prop
interface PicIconProps extends SVGProps<SVGSVGElement> {
    isSelected: boolean;
}

const SvgPic = ({ isSelected, ...props }: PicIconProps) => {
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
                d="m16.824 13.531-.406 1.219H13.5a2.5 2.5 0 0 0-2.5 2.5v10c0 1.379 1.121 2.5 2.5 2.5h15c1.379 0 2.5-1.121 2.5-2.5v-10c0-1.379-1.121-2.5-2.5-2.5h-2.918l-.406-1.219a1.87 1.87 0 0 0-1.778-1.281h-4.796a1.87 1.87 0 0 0-1.778 1.281M21 18.5a3.75 3.75 0 1 1 0 7.5 3.75 3.75 0 0 1 0-7.5"
            />
        </svg>
    );
};
export default SvgPic;
