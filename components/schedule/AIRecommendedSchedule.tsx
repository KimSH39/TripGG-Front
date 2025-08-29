'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface AIRecommendedScheduleProps {
    aiRecommendedScheduleByDay: {
        [key: number]: {
            time: string;
            endTime: string;
            name: string;
            category: string;
            description: string;
            address: string;
        }[];
    };
}

export default function AIRecommendedSchedule({ aiRecommendedScheduleByDay }: AIRecommendedScheduleProps) {
    const [selectedDay, setSelectedDay] = useState(1);

    const categoryColors = {
        관광: 'bg-green-500',
        카페: 'bg-purple-500',
        식사: 'bg-orange-500',
        기타: 'bg-blue-500',
    };

    const getCategoryStats = () => {
        const stats = { 관광: 0, 식사: 0, 카페: 0, 기타: 0 };

        if (!aiRecommendedScheduleByDay || !aiRecommendedScheduleByDay[selectedDay]) {
            return stats; // 데이터 없으면 기본값 리턴
        }

        const currentSchedule = aiRecommendedScheduleByDay[selectedDay] || [];

        currentSchedule.forEach((item: any) => {
            const startTime = new Date(`2000-01-01 ${item.time}:00`);
            const hour = startTime.getHours();

            if (hour >= 9 && hour < 12) stats['관광']++;
            else if (hour >= 12 && hour < 14) stats['식사']++;
            else if (hour >= 14 && hour < 17) stats['카페']++;
            else stats['기타']++;
        });

        return stats;
    };

    const categoryStats = getCategoryStats();
    const currentSchedule = aiRecommendedScheduleByDay[selectedDay] || [];

    return (
        <div className="pb-20">
            <div className="bg-white border-b">
                <div className="flex">
                    {[1, 2, 3, 4].map((day) => (
                        <button
                            key={day}
                            onClick={() => setSelectedDay(day)}
                            className={`flex-1 p-4 text-center ${
                                selectedDay === day
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                            }`}
                        >
                            <div className="font-semibold">{day}일차</div>
                            <div className="text-xs mt-1">03.{14 + day}</div>
                        </button>
                    ))}
                </div>
            </div>
            <div className="p-4 bg-white border-b">
                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-lg font-bold">
                        {selectedDay}일차 - 3월 {14 + selectedDay}일 (금)
                    </h2>
                    <span className="text-sm text-gray-600">총 {currentSchedule.length}개 일정</span>
                </div>
                <div className="flex items-center space-x-4 text-xs">
                    <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>관광 {categoryStats.관광}시간</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <span>식사 {categoryStats.식사}시간</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span>카페 {categoryStats.카페}시간</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>기타 {categoryStats.기타}시간</span>
                    </div>
                </div>
            </div>
            <div className="p-4">
                <div className="relative">
                    <div className="absolute left-12 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                    <div className="space-y-4">
                        {currentSchedule.map((item, index) => (
                            <div key={index} className="relative">
                                <div className="flex items-start">
                                    <div className="w-12 text-right pr-3">
                                        <div className="text-sm font-bold text-gray-800">{item.time}</div>
                                    </div>
                                    <div className="relative z-10 flex-shrink-0">
                                        <div
                                            className={`w-3 h-3 rounded-full ${
                                                item.category === '관광'
                                                    ? 'bg-green-500'
                                                    : item.category === '카페'
                                                    ? 'bg-purple-500'
                                                    : item.category === '식사'
                                                    ? 'bg-orange-500'
                                                    : 'bg-blue-500'
                                            }`}
                                        ></div>
                                    </div>
                                    <div className="flex-1 ml-4 bg-white border rounded-lg p-4 shadow-sm">
                                        <div className="font-semibold text-gray-800 mb-1">{item.name}</div>
                                        <div className="text-sm text-blue-600 mb-2">
                                            {item.time}-{item.endTime}
                                        </div>
                                        <div className="text-sm text-gray-600">{item.description}</div>
                                        <button className="mt-3 text-xs text-gray-500 flex items-center">
                                            <span>✈ 이동 정보 확인 &gt;</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <button
                onClick={() => {
                    // setIsAIPlanning(false);
                    // setIsManualPlanning(true);
                    // setPlanningStep(2);
                }}
                className="fixed bottom-20 right-4 w-14 h-14 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center shadow-lg z-10"
            >
                <Plus className="h-6 w-6 text-white" />
            </button>
        </div>
    );
}
