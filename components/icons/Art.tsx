import * as React from 'react';
import type { SVGProps } from 'react';

// Define a new interface to include the isSelected prop
interface ArtIconProps extends SVGProps<SVGSVGElement> {
    isSelected: boolean;
}

const SvgArt = ({ isSelected, ...props }: ArtIconProps) => {
    // Define color variables based on the isSelected prop
    const primaryFill = isSelected ? '#005FE2' : '#525252';
    const backgroundColor = isSelected ? '#E0F2FE' : '#F5F5F5';
    const strokeColor = isSelected ? '#E0F2FE' : '#F5F5F5';

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 42 42" {...props}>
            <path fill={backgroundColor} d="M34 0a8 8 0 0 1 8 8v26a8 8 0 0 1-8 8H8a8 8 0 0 1-8-8V8a8 8 0 0 1 8-8z" />
            <path stroke={strokeColor} d="M34 0a8 8 0 0 1 8 8v26a8 8 0 0 1-8 8H8a8 8 0 0 1-8-8V8a8 8 0 0 1 8-8z" />
            <path stroke={strokeColor} d="M31 31H11V11h20z" />
            <g clipPath="url(#art_svg__a)">
                <path
                    fill={primaryFill}
                    d="M31 21v.105c-.016 1.426-1.312 2.395-2.738 2.395h-3.825a1.875 1.875 0 0 0-1.835 2.262c.082.398.253.781.421 1.168.239.539.473 1.074.473 1.64 0 1.242-.844 2.371-2.086 2.422q-.204.007-.414.008C15.476 31 11 26.523 11 21s4.477-10 10-10 10 4.477 10 10m-15 1.25a1.25 1.25 0 1 0-2.5 0 1.25 1.25 0 0 0 2.5 0m0-3.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5m6.25-3.75a1.25 1.25 0 1 0-2.5 0 1.25 1.25 0 0 0 2.5 0M26 18.5a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5"
                />
            </g>
            <defs>
                <clipPath id="art_svg__a">
                    <path fill="#fff" d="M11 11h20v20H11z" />
                </clipPath>
            </defs>
        </svg>
    );
};
export default SvgArt;
