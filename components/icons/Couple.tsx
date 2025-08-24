import * as React from 'react';
import type { SVGProps } from 'react';

// Define a new interface to include the isSelected prop
interface CoupleIconProps extends SVGProps<SVGSVGElement> {
    isSelected: boolean;
}

const SvgCouple = ({ isSelected, ...props }: CoupleIconProps) => {
    // Define color variables based on the isSelected prop
    const primaryFill = isSelected ? '#005FE2' : '#525252';
    const backgroundColor = isSelected ? '#E0F2FE' : '#F5F5F5';
    const strokeColor = isSelected ? '#E0F2FE' : '#F5F5F5';

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 42 42" {...props}>
            <path fill={backgroundColor} d="M34 0a8 8 0 0 1 8 8v26a8 8 0 0 1-8 8H8a8 8 0 0 1-8-8V8a8 8 0 0 1 8-8z" />
            <path stroke={strokeColor} d="M34 0a8 8 0 0 1 8 8v26a8 8 0 0 1-8 8H8a8 8 0 0 1-8-8V8a8 8 0 0 1 8-8z" />
            <path stroke={strokeColor} d="M32.5 31H10V11h22.5z" />
            <g clipPath="url(#couple_svg__a)">
                <path
                    fill={primaryFill}
                    d="m11.86 22.734 7.058 6.59a1.586 1.586 0 0 0 2.164 0l.102-.094a6.875 6.875 0 0 1 5.691-10.73c1.105 0 2.148.262 3.074.723q.052-.38.051-.766v-.227a5.583 5.583 0 0 0-9.531-3.949L20 14.75l-.469-.469A5.585 5.585 0 0 0 10 18.231v.226c0 1.621.672 3.172 1.86 4.277M26.874 31a5.625 5.625 0 1 0 0-11.25 5.625 5.625 0 0 0 0 11.25m.625-8.125v1.875h1.875c.344 0 .625.281.625.625a.627.627 0 0 1-.625.625H27.5v1.875a.627.627 0 0 1-.625.625.627.627 0 0 1-.625-.625V26h-1.875a.627.627 0 0 1-.625-.625c0-.344.281-.625.625-.625h1.875v-1.875c0-.344.281-.625.625-.625s.625.281.625.625"
                />
            </g>
            <defs>
                <clipPath id="couple_svg__a">
                    <path fill="#fff" d="M10 11h22.5v20H10z" />
                </clipPath>
            </defs>
        </svg>
    );
};
export default SvgCouple;
