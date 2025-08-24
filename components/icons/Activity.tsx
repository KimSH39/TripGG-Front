import * as React from 'react';
import type { SVGProps } from 'react';

// Define a new interface to include the isSelected prop
interface ActivityIconProps extends SVGProps<SVGSVGElement> {
    isSelected: boolean;
}

const SvgActivity = ({ isSelected, ...props }: ActivityIconProps) => {
    // Define color variables based on the isSelected prop
    const primaryFill = isSelected ? '#005FE2' : '#525252';
    const backgroundColor = isSelected ? '#E0F2FE' : '#F5F5F5';
    const strokeColor = isSelected ? '#E0F2FE' : '#F5F5F5';

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 42 42" {...props}>
            <path fill={backgroundColor} d="M34 0a8 8 0 0 1 8 8v26a8 8 0 0 1-8 8H8a8 8 0 0 1-8-8V8a8 8 0 0 1 8-8z" />
            <path stroke={strokeColor} d="M34 0a8 8 0 0 1 8 8v26a8 8 0 0 1-8 8H8a8 8 0 0 1-8-8V8a8 8 0 0 1 8-8z" />
            <g clipPath="url(#activity_svg__a)">
                <path
                    fill={primaryFill}
                    d="M21.5 12.875a1.875 1.875 0 1 1 3.75 0 1.875 1.875 0 0 1-3.75 0m2.003 7.137-.746 2.98 1.942 1.942c.351.351.55.828.55 1.324v3.492c0 .691-.558 1.25-1.25 1.25-.69 0-1.25-.559-1.25-1.25v-3.23l-2.886-2.887a2.49 2.49 0 0 1-.66-2.356l.797-3.28a2.47 2.47 0 0 1 2.996-1.813c.742.187 1.39.64 1.812 1.277l1.11 1.664h1.207v-.937c0-.52.418-.938.937-.938s.938.418.938.938v11.875c0 .519-.418.937-.938.937a.935.935 0 0 1-.937-.937v-8.438h-1.54a1.87 1.87 0 0 1-1.558-.836l-.52-.781zm-6.335 9.422 1.414-5.387q.177.247.394.465l1.637 1.636-1.031 3.918a1.25 1.25 0 1 1-2.418-.636zm2.168-13.516L17.96 21.41a.94.94 0 0 1-1.063.7l-1.871-.313a.94.94 0 0 1-.75-1.172l.969-3.57a3.13 3.13 0 0 1 3.015-2.305h.164c.61 0 1.059.574.91 1.164z"
                />
            </g>
            <defs>
                <clipPath id="activity_svg__a">
                    <path fill="#fff" d="M14 11h15v20H14z" />
                </clipPath>
            </defs>
        </svg>
    );
};
export default SvgActivity;
