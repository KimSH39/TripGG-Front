'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, Navigation, Clock, MapPin, Plus, ChevronRight } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import { format, addDays, isSameDay } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { getPlanById, TravelPlan, Place } from '@/lib/mockApi';

export default function MyPlanPage() {
    const router = useRouter();
    const params = useParams();
    const planId = params.id as string;

    const [plan, setPlan] = useState<any>(null);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [selectedPlaces, setSelectedPlaces] = useState<any[]>([]);
    const [currentDay, setCurrentDay] = useState<Date | null>(null);

    const categoryColors: { [key: string]: string } = {
        관광: 'bg-green-500',
        카페: 'bg-purple-500',
        식사: 'bg-orange-500',
        기타: 'bg-blue-500',
    };

    useEffect(() => {
        const fetchPlan = async () => {
            if (planId) {
                try {
                    const foundPlan = await getPlanById(planId);

                    if (foundPlan) {
                        setPlan(foundPlan);
                        setStartDate(new Date(foundPlan.startDate));
                        setEndDate(new Date(foundPlan.endDate));

                        setSelectedPlaces(
                            foundPlan.places.map((place) => ({
                                ...place,
                                date: new Date(place.date),
                            }))
                        );
                        setCurrentDay(new Date(foundPlan.startDate));
                    } else {
                        router.push('/mytravel');
                    }
                } catch (error) {
                    console.error('Error loading plan from mock API', error);
                    router.push('/mytravel');
                }
            }
        };
        fetchPlan();
    }, [planId, router]);

    useEffect(() => {
        if (startDate && !currentDay) {
            setCurrentDay(startDate);
        }
    }, [startDate, currentDay]);

    const days = [];
    if (startDate && endDate) {
        let day = startDate;
        while (day <= endDate) {
            days.push(day);
            day = addDays(day, 1);
        }
    }

    const calculateCategorySummary = (day: Date) => {
        const summary: { [key: string]: number } = {
            관광: 0,
            식사: 0,
            카페: 0,
            기타: 0,
        };

        const placesForDay = selectedPlaces.filter((place: any) => isSameDay(new Date(place.date), day));

        placesForDay.forEach((place: any) => {
            if (place.category in summary) {
                const [startHour, startMinute] = place.time.split(':').map(Number);
                const [endHour, endMinute] = place.endTime.split(':').map(Number);

                const startTimeInMinutes = startHour * 60 + startMinute;
                const endTimeInMinutes = endHour * 60 + endMinute;

                let duration = endTimeInMinutes - startTimeInMinutes;

                if (duration < 0) {
                    duration += 24 * 60;
                }

                summary[place.category] += duration;
            }
        });
        return summary;
    };

    const renderScheduleWithPlaces = () => {
        const placesForCurrentDay = selectedPlaces
            .filter((place: any) => currentDay && isSameDay(new Date(place.date), currentDay))
            .sort((a: any, b: any) => {
                const timeA = new Date(`2000/01/01 ${a.time}`);
                const timeB = new Date(`2000/01/01 ${b.time}`);
                return timeA.getTime() - timeB.getTime();
            });

        if (placesForCurrentDay.length === 0) {
            return (
                <div className="p-4">
                    <div className="flex flex-col items-center justify-center h-[calc(100vh-300px)] text-gray-400">
                        <p className="text-lg mb-4">일정이 없습니다!</p>
                    </div>
                </div>
            );
        }

        return (
            <div className="pb-20">
                <div className="relative pt-4 pl-8 pr-4">
                    {placesForCurrentDay.map((place: any, index: number) => (
                        <div key={index} className="relative flex items-start mb-12 last:mb-0">
                            {/* Time */}
                            <div className="text-sm font-bold text-gray-800 absolute top-0 left-[-5px] w-[45px] text-right z-10">
                                {place.time}
                            </div>
                            {/* Dot */}
                            <div
                                className={`w-3 h-3 rounded-full flex-shrink-0 absolute left-[50px] top-[6px] z-10 ${
                                    categoryColors[place.category as keyof typeof categoryColors]
                                }`}
                            ></div>

                            {/* Vertical connecting line */}
                            {index < placesForCurrentDay.length - 1 ? (
                                <div
                                    className="absolute left-[56px] top-[12px] w-0.5 bg-gray-300 z-0"
                                    style={{ height: `calc(100% + 54px)` }}
                                ></div>
                            ) : (
                                <div
                                    className="absolute left-[56px] top-[12px] w-0.5 bg-gray-300 z-0"
                                    style={{ height: `calc(100% - 12px)` }}
                                ></div>
                            )}

                            {/* Right Card Content Column */}
                            <div className="flex-1 ml-[70px] bg-white border rounded-lg p-4 shadow-sm z-10">
                                <div className="font-semibold text-gray-800 mb-1">{place.name}</div>
                                <div className="text-sm text-gray-600 mb-2">
                                    {place.time}-{place.endTime}
                                </div>
                                <div className="text-sm text-gray-600 mb-2">{place.address}</div>
                            </div>

                            {/* 이동 경로 확인 link (between items) */}
                            {index < placesForCurrentDay.length - 1 && (
                                <div className="absolute left-[70px] top-[calc(100%+10px)] z-20">
                                    <span className="inline-flex items-center space-x-1 px-3 py-1 text-gray-500 text-xs font-medium ">
                                        <Navigation className="h-3 w-3" fill="currentColor" />
                                        <span>이동 경로 확인</span>
                                        <ChevronRight className="h-3 w-3" />
                                    </span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    if (!plan) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center">
                <p className="text-lg text-gray-500">일정을 불러오는 중...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <div className="bg-white border-b py-6 px-4 sticky top-0 z-10">
                <div className="flex items-center space-x-3 mb-4">
                    <button onClick={() => router.back()} className="p-1">
                        <ChevronLeft className="h-6 w-6" />
                    </button>
                    <div>
                        <h1 className="text-lg font-bold">{plan.title}</h1>
                        <p className="text-sm text-gray-600">
                            {format(startDate || new Date(), 'yyyy.MM.dd')} -{' '}
                            {format(endDate || new Date(), 'yyyy.MM.dd')}
                        </p>
                    </div>
                </div>

                {/* Day selection carousel */}
                <div className="mb-0">
                    <div className="flex space-x-2 pb-2">
                        <Carousel opts={{ align: 'start' }} className="w-full pl-0">
                            <CarouselContent className="-ml-0">
                                {days.map((day, index) => (
                                    <CarouselItem key={index} className="basis-1/4 pl-0">
                                        <button
                                            onClick={() => setCurrentDay(day)}
                                            className={`flex-shrink-0 text-sm font-medium w-full h-full border-r py-3
                                                ${
                                                    isSameDay(day, currentDay || new Date())
                                                        ? 'bg-blue-500 text-white border-blue-500'
                                                        : 'bg-gray-100 text-gray-700 border-gray-200'
                                                }`}
                                        >
                                            <div className="text-center">
                                                <div>{index + 1}일차</div>
                                                <div className="text-xs opacity-80">{format(day, 'MM.dd')}</div>
                                            </div>
                                        </button>
                                    </CarouselItem>
                                ))}
                                <CarouselItem key={days.length} className="basis-1/4 pl-0 bg-gray-100 ">
                                    <button className="flex-shrink-0 text-sm font-medium text-gray-700 h-full flex items-center justify-center w-full py-4 ">
                                        <Plus className="h-5 w-5 bg-gray-100 text-gray-700 border-gray-200" />
                                    </button>
                                </CarouselItem>
                            </CarouselContent>
                        </Carousel>
                    </div>
                    {currentDay && (
                        <div className="mt-4 p-0 bg-gray-50 rounded-lg flex flex-col space-y-2">
                            <div className="flex items-center justify-between text-gray-700">
                                <div className="flex items-center space-x-2">
                                    {/* You can replace this with a weather icon component */}
                                    <span role="img" aria-label="weather">
                                        ☁️
                                    </span>
                                    <span className="font-semibold">
                                        {currentDay
                                            ? `${
                                                  days.findIndex((day) => isSameDay(day, currentDay)) + 1
                                              }일차 - ${format(currentDay, 'M월 d일 (EEE)', { locale: ko })}`
                                            : ''}
                                    </span>
                                </div>
                                <span className="text-sm text-gray-500">
                                    총{' '}
                                    {
                                        selectedPlaces.filter((place: any) =>
                                            isSameDay(new Date(place.date), currentDay)
                                        ).length
                                    }
                                    개 일정
                                </span>
                            </div>
                            <div className="flex items-center justify-between text-xs text-gray-600 py-2">
                                {Object.entries(calculateCategorySummary(currentDay)).map(([category, duration]) => {
                                    const hours = Math.floor(duration / 60);
                                    const minutes = duration % 60;
                                    const durationString =
                                        [hours > 0 ? `${hours}시간` : '', minutes > 0 ? `${minutes}분` : '']
                                            .filter(Boolean)
                                            .join(' ') || '0분';
                                    return (
                                        <div key={category} className="flex items-center space-x-1">
                                            <span
                                                className={`w-2 h-2 rounded-full ${
                                                    categoryColors[category as keyof typeof categoryColors]
                                                }`}
                                            ></span>
                                            <span>
                                                {category} {durationString}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Map Placeholder */}
            <div className="relative h-60 bg-gray-200 flex items-center justify-center text-gray-500 text-xl font-bold">
                지도 영역 (Placeholder)
                {/* This will be replaced by an actual map component */}
            </div>

            {/* Detailed Schedule */}
            <div className="flex-grow overflow-y-auto">{renderScheduleWithPlaces()}</div>

            <div className="bg-white border-t p-4 text-center text-xs text-gray-500">
                * 일정 간 이동 시간은 최단 경로 기준으로 산정되었습니다.
            </div>
        </div>
    );
}
