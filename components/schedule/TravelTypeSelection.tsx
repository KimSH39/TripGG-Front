'use client';

import { useState, useRef } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export interface TravelTypeCard {
    id: number;
    title: string;
    description: string;
    image: string;
}

interface TravelTypeSelectionProps {
    selectedTravelType: TravelTypeCard | null;
    setSelectedTravelType: (travelType: TravelTypeCard) => void;
    nextStep: () => void;
    prevStep: () => void;
}

export default function TravelTypeSelection({
    selectedTravelType,
    setSelectedTravelType,
    nextStep,
    prevStep,
}: TravelTypeSelectionProps) {
    const { t } = useTranslation();
    const containerRef = useRef<HTMLDivElement>(null);

    const travelTypes: TravelTypeCard[] = [
        {
            id: 1,
            title: t('travelData.seoul_city.name'),
            description: t('travelData.seoul_city.desc'),
            image: '/seoul-pic.png',
        },
        {
            id: 2,
            title: t('travelData.seoul_nearby.name'),
            description: t('travelData.seoul_nearby.desc'),
            image: '/gg-pic.png',
        },
        {
            id: 3,
            title: t('travelData.gyeonggi_hotspots.name'),
            description: t('travelData.gyeonggi_hotspots.desc'),
            image: '/seoul-gg-pic.png',
        },
        {
            id: 4,
            title: t('travelData.capital_area_mix.name'),
            description: t('travelData.capital_area_mix.desc'),
            image: '/placeholder-1llmm.png',
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(
        selectedTravelType ? travelTypes.findIndex((type) => type.id === selectedTravelType.id) : 0
    );
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [currentX, setCurrentX] = useState(0);

    const handleTouchStart = (e: React.TouchEvent) => {
        setIsDragging(true);
        setStartX(e.touches[0].clientX);
        setCurrentX(e.touches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging) return;
        setCurrentX(e.touches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (!isDragging) return;

        const diff = startX - currentX;
        const threshold = 50;

        if (Math.abs(diff) > threshold) {
            if (diff > 0 && currentIndex < travelTypes.length - 1) {
                setCurrentIndex(currentIndex + 1);
            } else if (diff < 0 && currentIndex > 0) {
                setCurrentIndex(currentIndex - 1);
            }
        }

        setIsDragging(false);
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setStartX(e.clientX);
        setCurrentX(e.clientX);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        setCurrentX(e.clientX);
    };

    const handleMouseUp = () => {
        if (!isDragging) return;

        const diff = startX - currentX;
        const threshold = 50;

        if (Math.abs(diff) > threshold) {
            if (diff > 0 && currentIndex < travelTypes.length - 1) {
                setCurrentIndex(currentIndex + 1);
            } else if (diff < 0 && currentIndex > 0) {
                setCurrentIndex(currentIndex - 1);
            }
        }

        setIsDragging(false);
    };

    const handleCardClick = (index: number) => {
        setCurrentIndex(index);
    };

    return (
        <div
            className="bg-white"
            // style={{
            //     height: '100svh',
            //     overflow: 'hidden',
            //     position: 'fixed',
            //     top: 0,
            //     left: 0,
            //     right: 0,
            //     bottom: 0,
            // }}
        >
            {/* 메인 콘텐츠 */}
            <div className="p-4">
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">{t('schedule.regionSelection.title')}</h2>
                    <p className="text-gray-600 text-sm">{t('schedule.regionSelection.subtitle')}</p>
                </div>

                {/* 카드 컨테iner */}
                <div
                    ref={containerRef}
                    className="relative w-full max-w-[400px] mx-auto mb-8 overflow-hidden"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                >
                    <div className="relative h-[500px] w-[400px]">
                        {travelTypes.map((type, index) => {
                            const isActive = index === currentIndex;
                            const isNext = index === currentIndex + 1;
                            const isPrev = index === currentIndex - 1;

                            let transform = '';
                            let opacity = 0;
                            let zIndex = 0;

                            if (isActive) {
                                transform = 'translateX(0) scale(1)';
                                opacity = 1;
                                zIndex = 20;
                            } else if (isNext) {
                                transform = 'translateX(100%) scale(0.9)';
                                opacity = 0.7;
                                zIndex = 10;
                            } else if (isPrev) {
                                transform = 'translateX(-100%) scale(0.9)';
                                opacity = 0.7;
                                zIndex = 10;
                            }

                            return (
                                <div
                                    key={type.id}
                                    className={`absolute inset-0 transition-all duration-500 ease-out cursor-pointer`}
                                    style={{
                                        transform,
                                        opacity,
                                        zIndex,
                                    }}
                                    onClick={() => handleCardClick(index)}
                                >
                                    <div className="h-full w-full overflow-hidden border-0 shadow-lg rounded-[10px] relative">
                                        {/* 배경 이미지 */}
                                        <div
                                            className="absolute inset-0 bg-cover bg-center"
                                            style={{
                                                backgroundImage: `url(${type.image})`,
                                                filter: 'blur(1px)',
                                                backgroundSize: '250% 250%',
                                            }}
                                        />

                                        {/* 오버레이 */}
                                        <div className="absolute inset-0 bg-black/40 rounded-[10px]" />

                                        {/* 카드 내용 */}
                                        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center p-6 text-white">
                                            <h3 className="text-4xl font-bold mb-2 tracking-wider">{type.title}</h3>
                                            <p className="text-sm font-semibold tracking-wide">{type.description}</p>
                                            <div className="absolute bottom-6 left-0 right-0 px-6">
                                                <button
                                                    onClick={() => {
                                                        setSelectedTravelType(travelTypes[currentIndex]);
                                                        nextStep();
                                                    }}
                                                    className="w-full py-3 bg-white/20 backdrop-blur-sm text-white text-lg font-semibold rounded-[16px] transition-all duration-300 hover:bg-white/30 border border-[#838383]"
                                                >
                                                    {t('schedule.travelStyleSelection.selectButton')}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* 페이지네이션 인디케이터 */}
                <div className="flex justify-center items-center space-x-2 mb-8">
                    {travelTypes.map((_, index) => (
                        <button
                            key={index}
                            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                                index === currentIndex ? 'bg-gray-600' : 'bg-gray-300'
                            }`}
                            onClick={() => setCurrentIndex(index)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
