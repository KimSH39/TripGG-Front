import * as React from 'react';
import type { SVGProps } from 'react';

// Define a new interface to include the isSelected prop
interface SelfIconProps extends SVGProps<SVGSVGElement> {
    isSelected: boolean;
}

const SvgSelf = ({ isSelected, ...props }: SelfIconProps) => {
    // Define color variables based on the isSelected prop
    const primaryFill = isSelected ? '#005FE2' : '#404040';
    const backgroundColor = isSelected ? '#E0F2FE' : '#F2F4F8';
    const strokeColor = isSelected ? '#E0F2FE' : '#E5E7EB';

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 51 48" {...props}>
            <path
                fill={backgroundColor}
                d="M27 0c13.255 0 24 10.745 24 24S40.255 48 27 48h-3C10.745 48 0 37.255 0 24S10.745 0 24 0z"
            />
            <path
                stroke={strokeColor}
                d="M27 0c13.255 0 24 10.745 24 24S40.255 48 27 48h-3C10.745 48 0 37.255 0 24S10.745 0 24 0z"
            />
            <path stroke={strokeColor} d="M39 39H12V10h27z" />
            <path stroke={strokeColor} d="M39 36H12V12h27z" />
            <path
                fill={primaryFill}
                d="m30 34.317-9-2.574v-18.06l9 2.573zm1.5-.057V16.143l5.958-2.386A1.124 1.124 0 0 1 39 14.803v15.693c0 .46-.281.872-.708 1.046L31.5 34.256zM12.708 16.457l6.792-2.714v18.113l-5.958 2.386A1.124 1.124 0 0 1 12 33.196V17.503c0-.46.281-.872.708-1.046"
            />
        </svg>
    );
};
export default SvgSelf;
