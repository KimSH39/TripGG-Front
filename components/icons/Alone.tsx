// 예시: SvgAlone.tsx
import * as React from 'react';
import type { SVGProps } from 'react';

// isSelected prop을 추가하여 선택 상태를 전달받음
interface AloneIconProps {
    isSelected: boolean;
}

const SvgAlone = ({ isSelected }: AloneIconProps) => {
    // isSelected 값에 따라 색상 값 동적 할당
    const primaryColor = isSelected ? '#005FE2' : '#525252';
    const backgroundColor = isSelected ? '#E0F2FE' : '#F5F5F5';
    const strokeColor = isSelected ? '#E0F2FE' : '#F5F5F5';

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 42 42">
            <path fill={backgroundColor} d="M34 0a8 8 0 0 1 8 8v26a8 8 0 0 1-8 8H8a8 8 0 0 1-8-8V8a8 8 0 0 1 8-8z" />
            <path stroke={strokeColor} d="M34 0a8 8 0 0 1 8 8v26a8 8 0 0 1-8 8H8a8 8 0 0 1-8-8V8a8 8 0 0 1 8-8z" />
            <path stroke={strokeColor} d="M27.5 31H15V11h12.5z" />
            <g clipPath="url(#alone_svg__a)">
                <path
                    fill={primaryColor}
                    d="M21.25 12.875a1.875 1.875 0 1 1 3.75 0 1.875 1.875 0 0 1-3.75 0m-1.309 5.91-.113.047-.312.137a2.5 2.5 0 0 0-1.356 1.492l-.101.305a1.25 1.25 0 0 1-1.582.789 1.25 1.25 0 0 1-.79-1.582l.102-.305A5 5 0 0 1 18.5 16.68l.313-.137a6.4 6.4 0 0 1 2.582-.547 4.31 4.31 0 0 1 3.98 2.652l.602 1.442.835.418a1.249 1.249 0 1 1-1.117 2.234l-1.047-.52a1.87 1.87 0 0 1-.89-.956l-.375-.899-.754 2.559 1.933 2.11c.211.23.36.507.438.812l.898 3.597a1.249 1.249 0 1 1-2.425.606l-.86-3.442-2.761-3.011a2.5 2.5 0 0 1-.575-2.332l.66-2.48zm-2.257 7.762.976-2.438c.082.118.176.227.274.336l1.59 1.735-.567 1.414c-.094.234-.234.449-.414.629l-2.41 2.41a1.252 1.252 0 0 1-1.77-1.77z"
                />
            </g>
            <defs>
                <clipPath id="alone_svg__a">
                    <path fill="#fff" d="M15 11h12.5v20H15z" />
                </clipPath>
            </defs>
        </svg>
    );
};
export default SvgAlone;
