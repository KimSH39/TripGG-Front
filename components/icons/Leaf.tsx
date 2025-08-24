import * as React from 'react';
import type { SVGProps } from 'react';

// Define a new interface to include the isSelected prop
interface LeafIconProps extends SVGProps<SVGSVGElement> {
    isSelected: boolean;
}

const SvgLeaf = ({ isSelected, ...props }: LeafIconProps) => {
    // Define color variables based on the isSelected prop
    const primaryFill = isSelected ? '#005FE2' : '#525252';
    const backgroundColor = isSelected ? '#E0F2FE' : '#F5F5F5';
    const strokeColor = isSelected ? '#E0F2FE' : '#F5F5F5';

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 42 42" {...props}>
            <path fill={backgroundColor} d="M34 0a8 8 0 0 1 8 8v26a8 8 0 0 1-8 8H8a8 8 0 0 1-8-8V8a8 8 0 0 1 8-8z" />
            <path stroke={strokeColor} d="M34 0a8 8 0 0 1 8 8v26a8 8 0 0 1-8 8H8a8 8 0 0 1-8-8V8a8 8 0 0 1 8-8z" />
            <path stroke={strokeColor} d="M31 31H11V11h20z" />
            <path
                fill={primaryFill}
                d="M21.625 14.749a6.88 6.88 0 0 0-6.55 4.785 9.6 9.6 0 0 1 4.363-1.035h3.437c.344 0 .625.281.625.625a.627.627 0 0 1-.625.625h-3.437c-.649 0-1.278.074-1.883.211a8.4 8.4 0 0 0-2.79 1.2A8.43 8.43 0 0 0 11 28.185v.625c0 .52.418.938.938.938.519 0 .937-.418.937-.937v-.626c0-1.902.809-3.613 2.102-4.812a6.876 6.876 0 0 0 6.648 5.125h.04C26.824 28.472 31 23.386 31 17.116c0-1.664-.293-3.246-.824-4.672-.102-.27-.496-.258-.633-.004a4.37 4.37 0 0 1-3.855 2.309z"
            />
        </svg>
    );
};
export default SvgLeaf;
