'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import BusIcon from '@/components/icons/BusIcon';
import CarIcon from '@/components/icons/CarIcon';
import QuestionIcon from '@/components/icons/QuestionIcon';

interface RegionTravelSelectionProps {
    selectedRegion: string;
    setSelectedRegion: (region: string) => void;
    selectedTravelStyle: string;
    setSelectedTravelStyle: (style: string) => void;
    regions: { id: string; name: string }[];
    nextStep: () => void;
}

export default function RegionTravelSelection({
    selectedRegion,
    setSelectedRegion,
    selectedTravelStyle,
    setSelectedTravelStyle,
    regions,
    nextStep,
}: RegionTravelSelectionProps) {
    return (
        <>
            <div className="p-4">
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">여행 지역을 골라 주세요</h2>
                    <p className="text-gray-600 text-sm">선택하신 지역을 바탕으로 추천 장소를 찾아드려요</p>
                </div>
                <div className="grid grid-cols-4 gap-2 mb-8">
                    {regions.map((region) => (
                        <button
                            key={region.id}
                            onClick={() => setSelectedRegion(region.id)}
                            className={`
                                p-2 rounded-full text-center transition-colors border
                                ${
                                    selectedRegion === region.id
                                        ? 'bg-blue-50 text-blue-600 border-blue-500'
                                        : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
                                }
                            `}
                        >
                            <div className="text-sm font-medium">{region.name}</div>
                        </button>
                    ))}
                </div>
            </div>
            <div className="p-4">
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">어떤 이동 수단을 원하시나요?</h2>
                    <p className="text-gray-600 text-sm">선택하신 교통 수단을 바탕으로 이동 경로를 구성할게요</p>
                </div>
                <div className="space-y-4 mb-8">
                    <button
                        onClick={() => setSelectedTravelStyle('car')}
                        className={`
                            w-full p-4 rounded-lg border-2 transition-colors text-left
                            ${
                                selectedTravelStyle === 'car'
                                    ? 'border-blue-500 bg-blue-50'
                                    : 'border-gray-200 hover:border-gray-300'
                            }
                        `}
                    >
                        <div className="flex items-center space-x-4">
                            <CarIcon isSelected={selectedTravelStyle === 'car'} />
                            <div>
                                <div className="font-semibold">자차</div>
                                <div className="text-sm text-gray-600 mt-1">개인 차량 이용</div>
                            </div>
                        </div>
                    </button>
                    <button
                        onClick={() => setSelectedTravelStyle('public')}
                        className={`
                            w-full p-4 rounded-lg border-2 transition-colors text-left
                            ${
                                selectedTravelStyle === 'public'
                                    ? 'border-blue-500 bg-blue-50'
                                    : 'border-gray-200 hover:border-gray-300'
                            }
                        `}
                    >
                        <div className="flex items-center space-x-4">
                            <BusIcon isSelected={selectedTravelStyle === 'public'} />
                            <div>
                                <div className="font-semibold">대중교통</div>
                                <div className="text-sm text-gray-600 mt-1">버스, 지하철 등</div>
                            </div>
                        </div>
                    </button>
                    <button
                        onClick={() => setSelectedTravelStyle('undecided')}
                        className={`
                            w-full p-4 rounded-lg border-2 transition-colors text-left
                            ${
                                selectedTravelStyle === 'undecided'
                                    ? 'border-blue-500 bg-blue-50'
                                    : 'border-gray-200 hover:border-gray-300'
                            }
                        `}
                    >
                        <div className="flex items-center space-x-4">
                            <QuestionIcon isSelected={selectedTravelStyle === 'undecided'} />
                            <div>
                                <div className="font-semibold">상관없음</div>
                                <div className="text-sm text-gray-600 mt-1">추천에 따라 결정</div>
                            </div>
                        </div>
                    </button>
                </div>
            </div>
            <Button
                onClick={nextStep}
                disabled={!selectedRegion || !selectedTravelStyle}
                className="w-full bg-blue-500 hover:bg-blue-600 h-12 mb-20"
            >
                여행 일정 만들기
            </Button>
        </>
    );
}
