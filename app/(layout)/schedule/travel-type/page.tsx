'use client';

import { useState, useRef } from 'react';
import { ChevronLeft } from 'lucide-react';

interface TravelTypeCard {
    id: number;
    title: string;
    description: string;
    image: string;
}

export default function TravelTypePage() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [currentX, setCurrentX] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const travelTypes: TravelTypeCard[] = [
        {
            id: 1,
            title: '서울',
            description: '서울 전체를 중심으로 여행해요',
            image: '/seoul-pic.png'
        },
        {
            id: 2,
            title: '경기도',
            description: '경기도 지역을 중심으로 여행해요',
            image: '/gg-pic.png'
        },
        {
            id: 3,
            title: '서울+경기',
            description: '서울과 경기도를 함께 여행해요',
            image: '/seoul-gg-pic.png'
        },
        {
            id: 4,
            title: '기타',
            description: '다른 지역을 선택해요',
            image: '/placeholder-1llmm.png'
        }
    ];

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
        <div className="min-h-screen bg-white" style={{ 
            height: '100svh',
            overflow: 'hidden',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
        }}>
            {/* 헤더 */}
            <div className="bg-white p-4">
                <div className="relative flex items-center justify-center">
                    <button className="absolute left-4 p-1">
                        <ChevronLeft className="h-6 w-6" />
                    </button>
                    <div className="text-center">
                        <h1 className="text-lg font-bold">여행 일정 만들기</h1>
                        <p className="text-sm text-gray-600">타입 선택</p>
                    </div>
                </div>
            </div>

            {/* 메인 콘텐츠 */}
            <div className="p-4">
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">여행할 지역을 정해 주세요</h2>
                    <p className="text-gray-600 text-sm">선택하신 지역을 바탕으로 추천 장소를 찾아드려요</p>
                </div>

                {/* 카드 컨테이너 */}
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
                                            <h3 className="text-4xl font-bold mb-2 tracking-wider">
                                                {type.title}
                                            </h3>
                                            <p className="text-sm font-semibold tracking-wide">
                                                {type.description}
                                            </p>
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
                                index === currentIndex 
                                    ? 'bg-gray-600' 
                                    : 'bg-gray-300'
                            }`}
                            onClick={() => setCurrentIndex(index)}
                        />
                    ))}
                </div>


            </div>
        </div>
    );
}
