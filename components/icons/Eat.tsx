import * as React from 'react';
import type { SVGProps } from 'react';

// Define a new interface to include the isSelected prop
interface EatIconProps extends SVGProps<SVGSVGElement> {
    isSelected: boolean;
}

const SvgEat = ({ isSelected, ...props }: EatIconProps) => {
    // Define color variables based on the isSelected prop
    const primaryFill = isSelected ? '#005FE2' : '#525252';
    const backgroundColor = isSelected ? '#E0F2FE' : '#F5F5F5';
    const strokeColor = isSelected ? '#E0F2FE' : '#F5F5F5';

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 42 42" {...props}>
            <path fill={backgroundColor} d="M34 0a8 8 0 0 1 8 8v26a8 8 0 0 1-8 8H8a8 8 0 0 1-8-8V8a8 8 0 0 1 8-8z" />
            <path stroke={strokeColor} d="M34 0a8 8 0 0 1 8 8v26a8 8 0 0 1-8 8H8a8 8 0 0 1-8-8V8a8 8 0 0 1 8-8z" />
            <path stroke={strokeColor} d="M29.5 31H12V11h17.5z" />
            <g clipPath="url(#eat_svg__a)">
                <path
                    fill={primaryFill}
                    d="M28.25 11c-.625 0-5 1.25-5 6.875v4.375c0 1.379 1.121 2.5 2.5 2.5H27v5c0 .691.559 1.25 1.25 1.25s1.25-.559 1.25-1.25v-17.5c0-.691-.559-1.25-1.25-1.25m-13.75.625a.623.623 0 0 0-.559-.621.62.62 0 0 0-.675.484l-1.184 5.325a3.44 3.44 0 0 0 3.043 4.172v8.765c0 .691.559 1.25 1.25 1.25s1.25-.559 1.25-1.25v-8.766a3.44 3.44 0 0 0 3.043-4.172l-1.184-5.324a.625.625 0 0 0-1.234.137v5.242a.383.383 0 0 1-.766.031l-.488-5.328a.62.62 0 0 0-.621-.57.62.62 0 0 0-.621.57l-.484 5.328a.383.383 0 0 1-.766-.031v-5.242zm1.887 5.938h-.024l.012-.028z"
                />
            </g>
            <defs>
                <clipPath id="eat_svg__a">
                    <path fill="#fff" d="M12 11h17.5v20H12z" />
                </clipPath>
            </defs>
        </svg>
    );
};
export default SvgEat;
