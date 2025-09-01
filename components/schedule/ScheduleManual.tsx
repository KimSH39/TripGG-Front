'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, Plus, Search, Clock, MapPin, CalendarDays, ChevronRight, Navigation } from 'lucide-react';
import React from 'react'; //
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format, addDays, isSameDay, Locale } from 'date-fns';
import { enUS, ko, zhCN, zhTW, ja, vi } from 'date-fns/locale';
import { Carousel, CarouselContent, CarouselItem, CarouselApi } from '@/components/ui/carousel';
import { useRouter } from 'next/navigation';
import { savePlan, TravelPlan } from '@/lib/mockApi';
import { allRegions } from '@/constants/travelData';

interface ScheduleManualProps {
    setIsManualPlanning: (value: boolean) => void;
    startDate: Date | null;
    endDate: Date | null;
    selectedRegion: string;
}

export default function ScheduleManual({
    setIsManualPlanning,
    startDate,
    endDate,
    selectedRegion,
}: ScheduleManualProps) {
    const [planningStep, setPlanningStep] = useState(1);
    const { t } = useTranslation('common');
    const { i18n } = useTranslation();
    const [selectedPlaces, setSelectedPlaces] = useState<any[]>([]);
    const router = useRouter();

    const [directPlanningData, setDirectPlanningData] = useState({
        region: '',
        time: '',
        endTime: '',
        location: '',
        category: t('schedule.manual.category.default'), // 기본 카테고리 '기타'
    });

    const categoryColors = {
        [t('schedule.manual.category.tourism')]: 'bg-green-500 text-white',
        [t('schedule.manual.category.cafe')]: 'bg-purple-500 text-white',
        [t('schedule.manual.category.food')]: 'bg-orange-500 text-white',
        [t('schedule.manual.category.etc')]: 'bg-blue-500 text-white',
    };

    const [currentDay, setCurrentDay] = useState<Date | null>(startDate);

    const [scheduleDays, setScheduleDays] = useState<Date[]>([]);
    const [currentEndDate, setCurrentEndDate] = useState<Date | null>(endDate);
    const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);

    useEffect(() => {
        if (startDate && endDate) {
            const initialDays = [];
            let day = startDate;
            while (day <= endDate) {
                initialDays.push(day);
                day = addDays(day, 1);
            }
            setScheduleDays(initialDays);
            setCurrentDay(startDate);
            setCurrentEndDate(endDate);
        }
    }, [startDate, endDate]);

    useEffect(() => {
        if (carouselApi && currentDay) {
            const currentDayIndex = scheduleDays.findIndex((day) => isSameDay(day, currentDay));
            if (currentDayIndex !== -1) {
                carouselApi.scrollTo(currentDayIndex);
            }
        }
    }, [currentDay, carouselApi, scheduleDays]);

    const handleAddDay = () => {
        if (currentEndDate) {
            const newEndDate = addDays(currentEndDate, 1);
            setScheduleDays([...scheduleDays, newEndDate]);
            setCurrentEndDate(newEndDate);
        }
    };

    const handleSavePlan = async () => {
        if (!startDate || !endDate || selectedPlaces.length === 0) {
            alert(t('schedule.manual.savePlan.validationMessage'));
            return;
        }

        const planTitle = selectedRegion
            ? `${t(`travelData.${selectedRegion}.name`) || selectedRegion} ${t('schedule.manual.planTitle.region')}`
            : t('schedule.manual.planTitle.new');

        const planToSave: Omit<TravelPlan, 'id'> = {
            title: planTitle,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
            places: selectedPlaces.map((place) => ({
                ...place,
                date: place.date.toISOString(), // Ensure date is ISO string
            })),
        };

        try {
            const newPlan = await savePlan(planToSave);
            router.push(`/myplan/${newPlan.id}`);
        } catch (error) {
            console.error('Error saving plan', error);
            alert(t('schedule.manual.savePlan.errorMessage'));
        }
    };

    const calculateCategorySummary = (day: Date) => {
        const summary: { [key: string]: number } = {
            [t('schedule.manual.category.tourism')]: 0,
            [t('schedule.manual.category.food')]: 0,
            [t('schedule.manual.category.cafe')]: 0,
            [t('schedule.manual.category.etc')]: 0,
        };

        const placesForDay = selectedPlaces.filter((place) => isSameDay(new Date(place.date), day));

        placesForDay.forEach((place) => {
            if (place.category in summary) {
                const [startHour, startMinute] = place.time.split(':').map(Number);
                const [endHour, endMinute] = place.endTime.split(':').map(Number);

                const startTimeInMinutes = startHour * 60 + startMinute;
                const endTimeInMinutes = endHour * 60 + endMinute;

                let duration = endTimeInMinutes - startTimeInMinutes;

                // Handle overnight durations, assuming schedules don't span more than 24 hours in a single entry
                if (duration < 0) {
                    duration += 24 * 60; // Add 24 hours in minutes
                }

                summary[place.category] += duration;
            }
        });
        return summary;
    };

    const generateTimeOptions = () => {
        const times = [];
        for (let i = 0; i < 24; i++) {
            for (let j = 0; j < 60; j += 30) {
                const hour = String(i).padStart(2, '0');
                const minute = String(j).padStart(2, '0');
                times.push(`${hour}:${minute}`);
            }
        }
        return times;
    };

    const timeOptions = generateTimeOptions();

    const dateFnsLocales: { [key: string]: Locale } = {
        en: enUS,
        ko: ko,
        'zh-CN': zhCN,
        'zh-TW': zhTW,
        ja: ja,
        vi: vi,
    };

    // 이 컴포넌트 내부에 모든 render 함수를 정의합니다.
    const renderDirectPlanning = () => (
        <div className="p-4 relative">
            <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                    <CalendarDays className="h-5 w-5 text-gray-500" />
                    <div className="flex-1 flex items-center space-x-3">
                        <div className="flex-1 bg-gray-100 p-1.5 rounded-lg">
                            <Input
                                placeholder=""
                                value={directPlanningData.region}
                                onChange={(e) =>
                                    setDirectPlanningData({ ...directPlanningData, region: e.target.value })
                                }
                                className="border-0 bg-transparent px-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none w-full"
                            />
                        </div>
                        {/* Category Dropdown */}
                        <Select
                            onValueChange={(value) => setDirectPlanningData({ ...directPlanningData, category: value })}
                            value={directPlanningData.category}
                        >
                            <SelectTrigger
                                className={`w-13 h-13 rounded-md bg-gray-100 flex items-center justify-center p-0 border-0 [&>span]:hidden
                                    `}
                            >
                                <div
                                    className={`w-10 h-10 flex items-center justify-center text-xs font-semibold rounded-full
                                        ${
                                            directPlanningData.category
                                                ? categoryColors[
                                                      directPlanningData.category as keyof typeof categoryColors
                                                  ]
                                                : 'bg-gray-400 text-white'
                                        }`}
                                >
                                    {directPlanningData.category
                                        ? directPlanningData.category
                                        : t('schedule.manual.category.type')}
                                </div>
                            </SelectTrigger>
                            <SelectContent className="p-1 space-y-2 h-auto rounded-md border shadow-md bg-gray-100">
                                {Object.entries(categoryColors).map(([categoryKey, className]) => (
                                    <SelectItem
                                        key={categoryKey}
                                        value={categoryKey}
                                        className={`flex items-center justify-center p-0 w-13 h-13 rounded-md bg-gray-100 cursor-pointer hover:bg-blue-200`}
                                    >
                                        <div
                                            className={`w-10 h-10 flex items-center justify-center text-xs font-semibold rounded-full
                                            ${className}
                                        `}
                                        >
                                            {categoryKey}
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-gray-500" />
                    <div className="flex-1 flex space-x-2">
                        <Select
                            onValueChange={(value) => setDirectPlanningData({ ...directPlanningData, time: value })}
                            value={directPlanningData.time}
                        >
                            <SelectTrigger className="flex-1 bg-gray-100 p-1.5 rounded-lg border-0 shadow-none">
                                <SelectValue placeholder={t('schedule.manual.time.start')} />
                            </SelectTrigger>
                            <SelectContent>
                                {timeOptions.map((time) => (
                                    <SelectItem key={time} value={time}>
                                        {time}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <span className="text-gray-400 flex items-center">{t('schedule.manual.time.separator')}</span>
                        <Select
                            onValueChange={(value) => setDirectPlanningData({ ...directPlanningData, endTime: value })}
                            value={directPlanningData.endTime}
                        >
                            <SelectTrigger className="flex-1 bg-gray-100 p-1.5 rounded-lg border-0 shadow-none">
                                <SelectValue placeholder={t('schedule.manual.time.end')} />
                            </SelectTrigger>
                            <SelectContent>
                                {timeOptions.map((time) => (
                                    <SelectItem key={time} value={time}>
                                        {time}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-gray-500" />
                    <div className="flex-1 bg-gray-100 p-1.5 rounded-lg">
                        <Input
                            placeholder=""
                            value={directPlanningData.location}
                            onChange={(e) => setDirectPlanningData({ ...directPlanningData, location: e.target.value })}
                            className="border-0 bg-transparent px-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none w-full"
                        />
                    </div>
                </div>
            </div>

            <Button
                onClick={() => {
                    if (directPlanningData.location && directPlanningData.region) {
                        setSelectedPlaces([
                            ...selectedPlaces,
                            {
                                name: directPlanningData.region,
                                time: directPlanningData.time || '00:00',
                                endTime: directPlanningData.endTime || '00:00',
                                address: directPlanningData.location,
                                category: directPlanningData.category || t('schedule.manual.category.default'),
                                date: currentDay || new Date(),
                            },
                        ]);
                        setDirectPlanningData({
                            region: '',
                            time: '',
                            endTime: '',
                            location: '',
                            category: t('schedule.manual.category.default'),
                        });
                        setPlanningStep(1);
                    }
                }}
                className="w-full bg-blue-500 hover:bg-blue-600 h-12"
                disabled={!directPlanningData.location || !directPlanningData.region}
            >
                {t('schedule.manual.addScheduleButton')}
            </Button>
        </div>
    );

    // 비어있는 일정 화면 -> 일정 개요 화면으로 변경
    const renderScheduleOverview = () => {
        if (selectedPlaces.length > 0) {
            return renderScheduleWithPlaces();
        }

        return (
            <div className="p-4">
                <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] text-gray-400">
                    <p className="text-lg mb-4">{t('schedule.manual.noSchedule')}</p>
                </div>
            </div>
        );
    };
    // 장소가 포함된 일정 화면
    const renderScheduleWithPlaces = () => {
        const placesForCurrentDay = selectedPlaces
            .filter((place) => currentDay && isSameDay(new Date(place.date), currentDay))
            .sort((a, b) => {
                const timeA = new Date(`2000/01/01 ${a.time}`);
                const timeB = new Date(`2000/01/01 ${b.time}`);
                return timeA.getTime() - timeB.getTime();
            });

        if (placesForCurrentDay.length === 0) {
            return (
                <div className="p-4">
                    <div className="flex flex-col items-center justify-center h-[calc(100vh-300px)] text-gray-400">
                        <p className="text-lg mb-4">{t('schedule.manual.noSchedule')}</p>
                    </div>
                </div>
            );
        }

        return (
            <div className="pb-20">
                <div className="relative p-4">
                    {placesForCurrentDay.map((place, index) => (
                        <div key={index} className="relative flex items-start space-y-4">
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
                                        <span>{t('schedule.manual.checkRoute')}</span>
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

    return (
        <div className="bg-white relative flex flex-col">
            <div className="bg-white border-b sticky top-0 z-10">
                <div className="flex items-center space-x-3 mb-4 p-4">
                    <button
                        onClick={() => {
                            if (planningStep === 1) {
                                setIsManualPlanning(false);
                            } else if (planningStep === 2) {
                                // Changed this logic to handle going back from direct planning
                                setPlanningStep(1);
                            } else if (planningStep === 3) {
                                setPlanningStep(1); // Go back from search to overview if coming from add button
                            } else {
                                setPlanningStep(planningStep - 1);
                            }
                        }}
                        className="p-1"
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </button>
                    <div>
                        <h1 className="text-lg font-bold">
                            {selectedRegion
                                ? `${t(`travelData.${selectedRegion}.name`) || selectedRegion} ${t(
                                      'schedule.manual.planTitle.region'
                                  )}`
                                : t('schedule.manual.planTitle.new')}
                        </h1>
                        <p className="text-sm text-gray-600">
                            {format(startDate || new Date(), 'yyyy.MM.dd')} -{' '}
                            {format(currentEndDate || new Date(), 'yyyy.MM.dd')}
                        </p>
                    </div>
                </div>

                {planningStep === 1 && (
                    <div className="mb-0">
                        <div className="flex space-x-2">
                            <Carousel opts={{ align: 'start' }} className="w-full pl-0" setApi={setCarouselApi}>
                                <CarouselContent className="-ml-0">
                                    {scheduleDays.map((day, index) => (
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
                                                    <div>
                                                        {index + 1}
                                                        {t('schedule.manual.dayCounter')}
                                                    </div>
                                                    <div className="text-xs opacity-80">{format(day, 'MM.dd')}</div>
                                                </div>
                                            </button>
                                        </CarouselItem>
                                    ))}
                                    <CarouselItem key={scheduleDays.length} className="basis-1/4 pl-0 bg-gray-100 ">
                                        <button
                                            onClick={handleAddDay}
                                            className="flex-shrink-0 text-sm font-medium text-gray-700 h-full flex items-center justify-center w-full py-4 "
                                        >
                                            <Plus className="h-5 w-5 bg-gray-100 text-gray-700 border-gray-200" />
                                        </button>
                                    </CarouselItem>
                                </CarouselContent>
                            </Carousel>
                        </div>
                        {currentDay && (
                            <div className="p-4 bg-white border-b">
                                <div className="flex items-center justify-between mb-3 text-gray-700">
                                    <div className="flex items-center space-x-2">
                                        {/* You can replace this with a weather icon component */}
                                        <span role="img" aria-label="weather">
                                            ☁️
                                        </span>
                                        <span className="font-semibold">
                                            {currentDay
                                                ? `${
                                                      scheduleDays.findIndex((day: Date) =>
                                                          isSameDay(day, currentDay)
                                                      ) + 1
                                                  }${t('schedule.manual.dayCounter')} - ${format(
                                                      currentDay,
                                                      t('schedule.manual.monthDayWeekdayFormat'),
                                                      {
                                                          locale: dateFnsLocales[i18n.language] || enUS,
                                                      }
                                                  )}`
                                                : ''}
                                        </span>
                                    </div>
                                    <span className="text-sm text-gray-500 whitespace-nowrap">
                                        {t('schedule.manual.totalSchedulePrefix')}
                                        {
                                            selectedPlaces.filter((place) =>
                                                isSameDay(new Date(place.date), currentDay)
                                            ).length
                                        }
                                        {t('schedule.manual.totalScheduleSuffix')}
                                    </span>
                                </div>
                                <div className="flex items-center space-x-4 text-xs text-gray-600">
                                    {Object.entries(calculateCategorySummary(currentDay)).map(
                                        ([category, duration]) => {
                                            const hours = Math.floor(duration / 60);
                                            const minutes = duration % 60;
                                            const durationString =
                                                [
                                                    hours > 0
                                                        ? t('schedule.manual.duration.hours', { count: hours })
                                                        : '',
                                                    minutes > 0
                                                        ? t('schedule.manual.duration.minutes', { count: minutes })
                                                        : '',
                                                ]
                                                    .filter(Boolean)
                                                    .join(' ') || t('schedule.manual.duration.zeroMinutes');
                                            return (
                                                <div key={category} className="flex items-center space-x-1">
                                                    <div
                                                        className={`w-2 h-2 rounded-full ${
                                                            categoryColors[category as keyof typeof categoryColors]
                                                        }`}
                                                    ></div>
                                                    <span className="whitespace-nowrap">
                                                        {t('schedule.manual.categoryDuration', {
                                                            category: category,
                                                            duration: durationString,
                                                        })}
                                                    </span>
                                                </div>
                                            );
                                        }
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* planningStep 상태에 따라 다른 화면을 렌더링 */}
            <div className="flex-grow overflow-y-auto">
                {planningStep === 1 && renderScheduleOverview()}
                {planningStep === 2 && renderDirectPlanning()}
            </div>

            {planningStep === 1 && (
                <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg flex justify-center z-50">
                    <div className="max-w-3xl mx-auto w-full p-4 relative">
                        <Button onClick={handleSavePlan} className="w-full bg-blue-500 hover:bg-blue-600 h-12">
                            {t('schedule.manual.saveButton')}
                        </Button>
                        <button
                            onClick={() => setPlanningStep(2)}
                            className="absolute bottom-20 right-4 w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-lg z-50"
                        >
                            <Plus className="h-8 w-8" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
