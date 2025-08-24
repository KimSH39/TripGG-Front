import * as React from 'react';
import type { SVGProps } from 'react';

// Define a new interface to include the isSelected prop
interface HistoryIconProps extends SVGProps<SVGSVGElement> {
    isSelected: boolean;
}

const SvgHistory = ({ isSelected, ...props }: HistoryIconProps) => {
    // Define color variables based on the isSelected prop
    const primaryFill = isSelected ? '#005FE2' : '#525252';
    const backgroundColor = isSelected ? '#E0F2FE' : '#F5F5F5';
    const strokeColor = isSelected ? '#E0F2FE' : '#F5F5F5';

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 42 42" {...props}>
            <path fill={backgroundColor} d="M34 0a8 8 0 0 1 8 8v26a8 8 0 0 1-8 8H8a8 8 0 0 1-8-8V8a8 8 0 0 1 8-8z" />
            <path stroke={strokeColor} d="M34 0a8 8 0 0 1 8 8v26a8 8 0 0 1-8 8H8a8 8 0 0 1-8-8V8a8 8 0 0 1 8-8z" />
            <path stroke={strokeColor} d="M31 31H11V11h20z" />
            <g clipPath="url(#history_svg__a)">
                <path
                    fill={primaryFill}
                    d="M20.38 11.164a1.26 1.26 0 0 1 1.242 0l6.71 3.832.168.066v.036l1.872 1.07a1.25 1.25 0 0 1-.617 2.336H12.25a1.25 1.25 0 0 1-.617-2.336l1.867-1.07v-.036l.172-.062zM13.5 19.75H16v7.5h1.563v-7.5h2.5v7.5h1.875v-7.5h2.5v7.5H26v-7.5h2.5v7.668a1 1 0 0 1 .07.043l1.876 1.25c.457.305.664.875.504 1.402-.16.528-.649.887-1.2.887h-17.5a1.248 1.248 0 0 1-.691-2.29l1.875-1.25c.024-.015.047-.026.07-.042V19.75z"
                />
            </g>
            <defs>
                <clipPath id="history_svg__a">
                    <path fill="#fff" d="M11 11h20v20H11z" />
                </clipPath>
            </defs>
        </svg>
    );
};
export default SvgHistory;
