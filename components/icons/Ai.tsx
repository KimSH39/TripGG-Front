import * as React from 'react';
import type { SVGProps } from 'react';

// Define a new interface to include the isSelected prop
interface AiIconProps extends SVGProps<SVGSVGElement> {
    isSelected: boolean;
}

const SvgAi = ({ isSelected, ...props }: AiIconProps) => {
    // Define color variables based on the isSelected prop
    const primaryFill = isSelected ? '#005FE2' : '#525252';
    const backgroundColor = isSelected ? '#E0F2FE' : '#F5F5F5';
    const strokeColor = isSelected ? '#E0F2FE' : '#F5F5F5';

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 54 48" {...props}>
            <path
                fill={backgroundColor}
                d="M30 0c13.255 0 24 10.745 24 24S43.255 48 30 48h-6C10.745 48 0 37.255 0 24S10.745 0 24 0z"
            />
            <path
                stroke={strokeColor}
                d="M30 0c13.255 0 24 10.745 24 24S43.255 48 30 48h-6C10.745 48 0 37.255 0 24S10.745 0 24 0z"
            />
            <path stroke={strokeColor} d="M42 39H12V10h30z" />
            <g clipPath="url(#ai_svg__a)">
                <path
                    fill={primaryFill}
                    d="M27 12c.83 0 1.5.67 1.5 1.5v3h5.625a3.373 3.373 0 0 1 3.375 3.375v12.75A3.373 3.373 0 0 1 34.125 36h-14.25a3.373 3.373 0 0 1-3.375-3.375v-12.75a3.373 3.373 0 0 1 3.375-3.375H25.5v-3c0-.83.67-1.5 1.5-1.5m-5.25 18a.75.75 0 0 0-.75.75c0 .413.337.75.75.75h1.5c.413 0 .75-.337.75-.75a.75.75 0 0 0-.75-.75zm4.5 0a.75.75 0 0 0-.75.75c0 .413.337.75.75.75h1.5c.413 0 .75-.337.75-.75a.75.75 0 0 0-.75-.75zm4.5 0a.75.75 0 0 0-.75.75c0 .413.337.75.75.75h1.5c.413 0 .75-.337.75-.75a.75.75 0 0 0-.75-.75zm-6.375-6a1.875 1.875 0 1 0-3.75 0 1.875 1.875 0 0 0 3.75 0m7.125 1.875a1.875 1.875 0 1 0 0-3.75 1.875 1.875 0 0 0 0 3.75M14.25 22.5H15v9h-.75A2.25 2.25 0 0 1 12 29.25v-4.5a2.25 2.25 0 0 1 2.25-2.25m25.5 0A2.25 2.25 0 0 1 42 24.75v4.5a2.25 2.25 0 0 1-2.25 2.25H39v-9z"
                />
            </g>
            <defs>
                <clipPath id="ai_svg__a">
                    <path fill="#fff" d="M12 12h30v24H12z" />
                </clipPath>
            </defs>
        </svg>
    );
};
export default SvgAi;
