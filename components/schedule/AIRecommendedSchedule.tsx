'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';
import { Carousel, CarouselContent, CarouselItem, CarouselApi } from '@/components/ui/carousel';
import { useEffect } from 'react';
import { CalendarDays, Clock, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';

interface AIRecommendedScheduleProps {
    aiRecommendedScheduleByDay: {
        [key: number]: {
            id: string;
            time: string;
            endTime: string;
            name: string;
            category: string;
            description: string;
            address: string;
        }[];
    };
    startDate: Date | null;
    endDate: Date | null;
    selectedRegion: string;
    setAiRecommendedScheduleByDay: (updatedSchedule: any) => void;
    onSaveOverallPlan: (schedule: any) => void;
}

export default function AIRecommendedSchedule({
    aiRecommendedScheduleByDay,
    startDate,
    endDate,
    selectedRegion,
    setAiRecommendedScheduleByDay,
    onSaveOverallPlan,
}: AIRecommendedScheduleProps) {
    const [selectedDay, setSelectedDay] = useState(1);
    const { t, i18n } = useTranslation('common');
    const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);

    const [isEditing, setIsEditing] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);
    const [editingItemIndex, setEditingItemIndex] = useState<number | null>(null);
    const [editingItemDay, setEditingItemDay] = useState<number | null>(null);

    const formattedStartDate = startDate
        ? new Intl.DateTimeFormat(i18n.language, {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
          }).format(startDate)
        : '';
    const formattedEndDate = endDate
        ? new Intl.DateTimeFormat(i18n.language, {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
          }).format(endDate)
        : '';
    const dateRange = startDate && endDate ? `${formattedStartDate} - ${formattedEndDate}` : '';

    const handleEditScheduleItem = (day: number, item: any, index: number) => {
        setEditingItemDay(day);
        setEditingItem(item);
        setEditingItemIndex(index);
        setIsEditing(true);
    };

    const handleSaveEdit = () => {
        if (editingItemDay !== null && editingItemIndex !== null) {
            const updatedScheduleByDay = { ...aiRecommendedScheduleByDay }; // Shallow copy of the outer object

            // Create a new array for the specific day being edited
            const updatedDaySchedule = [...updatedScheduleByDay[editingItemDay]];
            updatedDaySchedule[editingItemIndex] = editingItem; // Update the item in the new array

            // Assign the new array back to the updatedScheduleByDay object
            updatedScheduleByDay[editingItemDay] = updatedDaySchedule;

            setAiRecommendedScheduleByDay(updatedScheduleByDay);
        }
        setIsEditing(false);
        setEditingItem(null);
        setEditingItemIndex(null);
        setEditingItemDay(null);
    };

    const handleCloseEdit = () => {
        setIsEditing(false);
        setEditingItem(null);
        setEditingItemIndex(null);
        setEditingItemDay(null);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setEditingItem((prev: any) => ({ ...prev, [id]: value }));
    };

    const handleTimeChange = (value: string, type: 'time' | 'endTime') => {
        setEditingItem((prev: any) => ({ ...prev, [type]: value }));
    };

    const handleCategoryChange = (value: string) => {
        setEditingItem((prev: any) => ({ ...prev, category: value }));
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

    const handleSaveOverallPlan = () => {
        onSaveOverallPlan(aiRecommendedScheduleByDay);
    };

    const categoryColors = {
        [t('schedule.manual.category.tourism')]: 'bg-green-500 text-white',
        [t('schedule.manual.category.cafe')]: 'bg-purple-500 text-white',
        [t('schedule.manual.category.food')]: 'bg-orange-500 text-white',
        [t('schedule.manual.category.etc')]: 'bg-blue-500 text-white',
    };

    const getCategoryStats = () => {
        const stats: { [key: string]: number } = {
            [t('travelData.category.sightseeing')]: 0,
            [t('travelData.category.meal')]: 0,
            [t('travelData.category.cafe')]: 0,
            [t('travelData.category.other')]: 0,
        };

        if (!aiRecommendedScheduleByDay || !aiRecommendedScheduleByDay[selectedDay]) {
            return stats; // 데이터 없으면 기본값 리턴
        }

        const currentSchedule = aiRecommendedScheduleByDay[selectedDay] || [];

        currentSchedule.forEach((item: any) => {
            const startTime = new Date(`2000-01-01T${item.time}:00`);
            const endTime = new Date(`2000-01-01T${item.endTime}:00`);
            const duration = (endTime.getTime() - startTime.getTime()) / (1000 * 60); // duration in minutes

            if (item.category === t('travelData.category.sightseeing')) {
                stats[t('travelData.category.sightseeing')] += duration;
            } else if (item.category === t('travelData.category.meal')) {
                stats[t('travelData.category.meal')] += duration;
            } else if (item.category === t('travelData.category.cafe')) {
                stats[t('travelData.category.cafe')] += duration;
            } else {
                stats[t('travelData.category.other')] += duration;
            }
        });

        return stats;
    };

    const formatDuration = (totalMinutes: number) => {
        if (totalMinutes === 0) {
            return t('schedule.manual.duration.zeroMinutes');
        }
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        const parts = [];
        if (hours > 0) {
            parts.push(t('schedule.manual.duration.hours', { count: hours }));
        }
        if (minutes > 0) {
            parts.push(t('schedule.manual.duration.minutes', { count: minutes }));
        }
        return parts.join(' ');
    };

    const categoryStats = getCategoryStats();
    const rawCurrentSchedule = aiRecommendedScheduleByDay[selectedDay] || [];
    const currentSchedule = [...rawCurrentSchedule].sort((a: any, b: any) => {
        const parseTime = (timeStr: string) => {
            const [hours, minutes] = timeStr.split(':').map(Number);
            return hours * 60 + minutes;
        };

        let timeAMins = parseTime(a.time);
        let timeBMins = parseTime(b.time);

        // Heuristic: If a time is in the early morning (e.g., before 6 AM)
        // but logically follows a late-night activity, add 24 hours to its value.
        const MIDNIGHT_THRESHOLD_EARLY = 6 * 60; // 6 AM in minutes
        const MIDNIGHT_THRESHOLD_LATE = 18 * 60; // 6 PM in minutes

        if (timeAMins < MIDNIGHT_THRESHOLD_EARLY && timeBMins > MIDNIGHT_THRESHOLD_LATE) {
            timeAMins += 24 * 60; // a is "next day" relative to b
        } else if (timeBMins < MIDNIGHT_THRESHOLD_EARLY && timeAMins > MIDNIGHT_THRESHOLD_LATE) {
            timeBMins += 24 * 60; // b is "next day" relative to a
        }

        return timeAMins - timeBMins;
    });

    // Calculate the number of days between startDate and endDate
    const numberOfDays =
        startDate && endDate ? Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1 : 0;

    const getFormattedDateWithWeekday = (dayOffset: number) => {
        const date = startDate ? new Date(startDate.getTime() + dayOffset * 24 * 60 * 60 * 1000) : new Date();
        const monthDay = new Intl.DateTimeFormat(i18n.language, {
            month: 'short',
            day: 'numeric',
        }).format(date);
        const weekday = new Intl.DateTimeFormat(i18n.language, {
            weekday: 'short',
        }).format(date);
        return `${monthDay} (${weekday})`.replace('.', '');
    };

    useEffect(() => {
        if (carouselApi) {
            carouselApi.scrollTo(selectedDay - 1);
        }
    }, [selectedDay, carouselApi]);

    useEffect(() => {
        if (!carouselApi) return;

        const onSelect = () => {
            setSelectedDay(carouselApi.selectedScrollSnap() + 1);
        };

        carouselApi.on('select', onSelect);

        return () => {
            carouselApi.off('select', onSelect);
        };
    }, [carouselApi, setSelectedDay]);

    return (
        <div className="pb-20">
            {!isEditing ? (
                <>
                    <div className="bg-white border-b">
                        <div className="flex space-x-2 pb-2">
                            <Carousel className="w-full pl-0" opts={{ align: 'start' }} setApi={setCarouselApi}>
                                <CarouselContent className="-ml-0">
                                    {[...Array(numberOfDays)].map((_, index) => {
                                        const day = index + 1;
                                        const currentDate = startDate ? new Date(startDate) : null;
                                        if (currentDate) {
                                            currentDate.setDate(currentDate.getDate() + index);
                                        }
                                        const formattedDayForTab = currentDate
                                            ? new Intl.DateTimeFormat(i18n.language, {
                                                  month: 'numeric',
                                                  day: 'numeric',
                                              })
                                                  .format(currentDate)
                                                  .replace('/', '.')
                                            : '';

                                        return (
                                            <CarouselItem key={day} className="basis-1/4 pl-0">
                                                <button
                                                    onClick={() => setSelectedDay(day)}
                                                    className={`p-4 text-center h-full w-full border-r py-3 ${
                                                        selectedDay === day
                                                            ? 'bg-blue-500 text-white border-blue-500'
                                                            : 'bg-gray-100 text-gray-700 border-gray-200'
                                                    }`}
                                                >
                                                    <div className="text-center">
                                                        <div>
                                                            {index + 1}
                                                            {t('aiRecommendedSchedule.dayUnit')}
                                                        </div>
                                                        <div className="text-xs opacity-80">{formattedDayForTab}</div>
                                                    </div>
                                                </button>
                                            </CarouselItem>
                                        );
                                    })}
                                </CarouselContent>
                            </Carousel>
                        </div>
                    </div>
                    <div className="p-4 bg-white border-b">
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="text-lg font-bold flex-1 items-center flex">
                                <span className="mr-2">☁️</span>
                                <span className="inline-block">
                                    {selectedDay}
                                    {t('aiRecommendedSchedule.dayUnit')}
                                </span>
                                <span className="inline-block ml-1">-</span>
                                <span className="inline-block ml-1">
                                    {getFormattedDateWithWeekday(selectedDay - 1)}
                                </span>
                            </h2>
                            <span className="text-sm text-gray-600 whitespace-nowrap">
                                {t('aiRecommendedSchedule.totalSchedule', { count: currentSchedule.length })}
                            </span>
                        </div>
                        <div className="flex items-center space-x-4 text-xs">
                            <div className="flex items-center space-x-1">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span className="whitespace-nowrap">
                                    {t('travelData.category.sightseeing')}{' '}
                                    {formatDuration(categoryStats[t('travelData.category.sightseeing')] || 0)}
                                </span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                <span className="whitespace-nowrap">
                                    {t('travelData.category.meal')}{' '}
                                    {formatDuration(categoryStats[t('travelData.category.meal')] || 0)}
                                </span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                <span className="whitespace-nowrap">
                                    {t('travelData.category.cafe')}{' '}
                                    {formatDuration(categoryStats[t('travelData.category.cafe')] || 0)}
                                </span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                <span className="whitespace-nowrap">
                                    {t('travelData.category.other')}{' '}
                                    {formatDuration(categoryStats[t('travelData.category.other')] || 0)}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="p-4">
                        <div className="relative">
                            <div className="absolute left-12 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                            <div className="space-y-4">
                                {currentSchedule.map((item, index) => (
                                    <div key={item.id} className="relative">
                                        <div className="flex items-start">
                                            <div className="w-12 text-right pr-3">
                                                <div className="text-sm font-bold text-gray-800">{item.time}</div>
                                            </div>
                                            <div className="relative z-10 flex-shrink-0">
                                                <div
                                                    className={`w-3 h-3 rounded-full ${
                                                        item.category === t('travelData.category.sightseeing')
                                                            ? 'bg-green-500'
                                                            : item.category === t('travelData.category.cafe')
                                                            ? 'bg-purple-500'
                                                            : item.category === t('travelData.category.meal')
                                                            ? 'bg-orange-500'
                                                            : 'bg-blue-500'
                                                    }`}
                                                ></div>
                                            </div>
                                            <div
                                                className="flex-1 ml-4 bg-white border rounded-lg p-4 shadow-sm cursor-pointer"
                                                onClick={() => handleEditScheduleItem(selectedDay, item, index)}
                                            >
                                                <div className="font-semibold text-gray-800 mb-1">{item.name}</div>
                                                <div className="text-sm text-blue-600 mb-2">
                                                    {item.time}-{item.endTime}
                                                </div>
                                                <div className="text-sm text-gray-600">{item.description}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg flex justify-center z-50">
                        <div className="max-w-3xl mx-auto w-full p-4 relative">
                            <Button
                                onClick={handleSaveOverallPlan}
                                className="w-full bg-blue-500 hover:bg-blue-600 h-12"
                            >
                                {t('schedule.manual.saveButton')}
                            </Button>
                        </div>
                    </div>
                </>
            ) : (
                <div className="p-4 relative">
                    <div className="space-y-4 mb-8">
                        <div className="flex items-center space-x-3">
                            <CalendarDays className="h-5 w-5 text-gray-500" />
                            <div className="flex-1 flex items-center space-x-3">
                                <div className="flex-1 bg-gray-100 p-1.5 rounded-lg">
                                    <Input
                                        placeholder=""
                                        id="name"
                                        value={editingItem?.name || ''}
                                        onChange={handleInputChange}
                                        className="border-0 bg-transparent px-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none w-full"
                                    />
                                </div>
                                <Select
                                    onValueChange={handleCategoryChange}
                                    value={editingItem?.category || t('schedule.manual.category.default')}
                                >
                                    <SelectTrigger
                                        className={`w-13 h-13 rounded-md bg-gray-100 flex items-center justify-center p-0 border-0 [&>span]:hidden
                                            `}
                                    >
                                        <div
                                            className={`w-10 h-10 flex items-center justify-center text-xs font-semibold rounded-full
                                                ${
                                                    editingItem?.category
                                                        ? categoryColors[
                                                              editingItem.category as keyof typeof categoryColors
                                                          ]
                                                        : 'bg-gray-400 text-white'
                                                }`}
                                        >
                                            {editingItem?.category
                                                ? editingItem.category
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
                                    onValueChange={(value) => handleTimeChange(value, 'time')}
                                    value={editingItem?.time || ''}
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
                                <span className="text-gray-400 flex items-center">
                                    {t('schedule.manual.time.separator')}
                                </span>
                                <Select
                                    onValueChange={(value) => handleTimeChange(value, 'endTime')}
                                    value={editingItem?.endTime || ''}
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
                                    id="address"
                                    value={editingItem?.address || ''}
                                    onChange={handleInputChange}
                                    className="border-0 bg-transparent px-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none w-full"
                                />
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <Label htmlFor="description" className="text-right sr-only">
                                {t('aiRecommendedSchedule.description')}
                            </Label>
                            <div className="flex-1 bg-gray-100 p-1.5 rounded-lg">
                                <Input
                                    id="description"
                                    value={editingItem?.description || ''}
                                    onChange={handleInputChange}
                                    className="border-0 bg-transparent px-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none w-full"
                                    placeholder={t('aiRecommendedSchedule.description')}
                                />
                            </div>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={handleCloseEdit}>
                            {t('aiRecommendedSchedule.cancel')}
                        </Button>
                        <Button onClick={handleSaveEdit} className="bg-blue-500 hover:bg-blue-600 h-12">
                            {t('aiRecommendedSchedule.save')}
                        </Button>
                    </DialogFooter>
                </div>
            )}
        </div>
    );
}
