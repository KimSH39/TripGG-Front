import * as React from 'react';
import type { SVGProps } from 'react';

// Define a new interface to include the isSelected prop
interface FamilyIconProps extends SVGProps<SVGSVGElement> {
    isSelected: boolean;
}

const SvgFamily = ({ isSelected, ...props }: FamilyIconProps) => {
    // Define color variables based on the isSelected prop
    const primaryFill = isSelected ? '#005FE2' : '#525252';
    const backgroundColor = isSelected ? '#E0F2FE' : '#F5F5F5';
    const strokeColor = isSelected ? '#E0F2FE' : '#F5F5F5';

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 42 42" {...props}>
            <path fill={backgroundColor} d="M34 0a8 8 0 0 1 8 8v26a8 8 0 0 1-8 8H8a8 8 0 0 1-8-8V8a8 8 0 0 1 8-8z" />
            <path stroke={strokeColor} d="M34 0a8 8 0 0 1 8 8v26a8 8 0 0 1-8 8H8a8 8 0 0 1-8-8V8a8 8 0 0 1 8-8z" />
            <g clipPath="url(#family_svg__a)">
                <path
                    fill={primaryFill}
                    d="m22.105 11.156 11.25 6.25a1.25 1.25 0 0 1 .484 1.7 1.25 1.25 0 0 1-1.699.484L21.5 13.68l-10.645 5.914A1.25 1.25 0 0 1 9.64 17.41l11.254-6.254a1.25 1.25 0 0 1 1.215 0zM21.5 17.25a1.563 1.563 0 1 1 0 3.125 1.563 1.563 0 0 1 0-3.125M14.624 21a1.563 1.563 0 1 1 0 3.125 1.563 1.563 0 0 1 0-3.125m12.188 1.563a1.563 1.563 0 1 1 3.126 0 1.563 1.563 0 0 1-3.126 0m-8.95 7.632-1.05-1.949v1.504c0 .691-.559 1.25-1.25 1.25h-1.875c-.691 0-1.25-.559-1.25-1.25v-1.504l-1.05 1.95a.938.938 0 0 1-1.652-.887l1.48-2.746a3.44 3.44 0 0 1 3.027-1.81h.761c.637 0 1.247.177 1.774.493l1.312-2.433a3.44 3.44 0 0 1 3.028-1.81h.761a3.44 3.44 0 0 1 3.028 1.81l1.312 2.433a3.44 3.44 0 0 1 1.774-.492h.761a3.44 3.44 0 0 1 3.028 1.808l1.48 2.747a.936.936 0 0 1-.383 1.27.936.936 0 0 1-1.27-.384l-1.046-1.949v1.504c0 .691-.559 1.25-1.25 1.25h-1.875c-.691 0-1.25-.559-1.25-1.25v-1.504l-1.05 1.95a.938.938 0 0 1-1.652-.887l1.417-2.637a.9.9 0 0 1-.168-.227l-1.047-1.949v2.129c0 .691-.559 1.25-1.25 1.25h-1.875c-.691 0-1.25-.559-1.25-1.25v-2.129l-1.05 1.95a1 1 0 0 1-.169.226l1.418 2.637a.936.936 0 0 1-.383 1.27.936.936 0 0 1-1.27-.384z"
                />
            </g>
            <defs>
                <clipPath id="family_svg__a">
                    <path fill="#fff" d="M9 11h25v20H9z" />
                </clipPath>
            </defs>
        </svg>
    );
};
export default SvgFamily;
