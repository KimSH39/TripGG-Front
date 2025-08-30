'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';

interface DateSelectionProps {
    startDate: Date | null;
    setStartDate: (date: Date | null) => void;
    endDate: Date | null;
    setEndDate: (date: Date | null) => void;
    nextStep: () => void;
}

export default function DateSelection({ startDate, setStartDate, endDate, setEndDate, nextStep }: DateSelectionProps) {
    const { t, i18n } = useTranslation('common');
    const [currentMonth, setCurrentMonth] = useState(new Date(2025, 9));

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        const days = [];
        for (let i = 0; i < startingDayOfWeek; i++) {
            days.push(null);
        }
        for (let day = 1; day <= daysInMonth; day++) {
            days.push(new Date(year, month, day));
        }
        return days;
    };

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat(i18n.language, { year: 'numeric', month: 'long' }).format(date);
    };

    const isStartDate = (date: Date | null): boolean => {
        return date !== null && startDate !== null && date.getTime() === startDate.getTime();
    };

    const isEndDate = (date: Date | null): boolean => {
        return date !== null && endDate !== null && date.getTime() === endDate.getTime();
    };

    const isDateInRange = (date: Date | null): boolean => {
        if (date === null || startDate === null || endDate === null) {
            return false;
        }
        const start = startDate.getTime();
        const end = endDate.getTime();
        const current = date.getTime();
        return current >= start && current <= end;
    };

    const handleDateClick = (date: Date) => {
        console.log('[v0] 날짜 클릭:', date, '현재 시작일:', startDate, '현재 종료일:', endDate);
        if (!startDate || (startDate && endDate)) {
            setStartDate(date);
            setEndDate(null);
        } else if (startDate && !endDate) {
            const startDateOnly = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
            const clickedDateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());

            if (clickedDateOnly >= startDateOnly) {
                setEndDate(date);
            } else {
                setStartDate(date);
                setEndDate(null);
            }
        }
    };

    return (
        <div className="p-4 pb-24">
            <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-2">{t('schedule.dateSelection.title')}</h2>
            </div>
            <Card className="shadow-sm">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-8">
                        <button
                            onClick={() =>
                                setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
                            }
                            className="p-1 rounded-full hover:bg-gray-100"
                        >
                            <ChevronLeft className="h-4 w-4 text-gray-500" />
                        </button>
                        <h3 className="text-xl font-semibold text-gray-700">{formatDate(currentMonth)}</h3>
                        <button
                            onClick={() =>
                                setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
                            }
                            className="p-1 rounded-full hover:bg-gray-100"
                        >
                            <ChevronRight className="h-4 w-4 text-gray-500" />
                        </button>
                    </div>
                    <div className="grid grid-cols-7 text-center text-lg font-medium text-gray-500">
                        {(t('daysOfWeek', { returnObjects: true }) as string[]).map((day) => (
                            <div key={day} className="py-1">
                                {day}
                            </div>
                        ))}
                        {getDaysInMonth(currentMonth).map((date, index) => {
                            if (!date) {
                                return <div key={index} />;
                            }
                            return (
                                <div
                                    key={index}
                                    className={`
                                        aspect-square relative
                                        ${isDateInRange(date) ? 'bg-blue-100' : ''}
                                        ${isStartDate(date) ? 'rounded-l-lg' : ''}
                                        ${isEndDate(date) ? 'rounded-r-lg' : ''}
                                    `}
                                >
                                    <div
                                        className={`w-full h-full ${
                                            isStartDate(date) || isEndDate(date) ? 'p-0.5' : ''
                                        }`}
                                    >
                                        <button
                                            onClick={() => handleDateClick(date)}
                                            className={`
                                                w-full h-full flex items-center justify-center text- transition-colors font-medium rounded-lg
                                                ${
                                                    isStartDate(date) || isEndDate(date)
                                                        ? 'bg-blue-600 text-white font-semibold'
                                                        : isDateInRange(date)
                                                        ? 'text-blue-700'
                                                        : 'hover:bg-gray-100'
                                                }
                                            `}
                                        >
                                            {date.getDate()}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>
            <Button
                onClick={() => {
                    console.log(
                        '[v0]',
                        t('schedule.common.createScheduleButton'),
                        ':',
                        t('schedule.dateSelection.startDate'),
                        ':',
                        startDate,
                        t('schedule.dateSelection.endDate'),
                        ':',
                        endDate
                    );
                    nextStep();
                }}
                disabled={!startDate || !endDate}
                className={`w-full h-14 mt-6 text-lg font-semibold ${
                    !startDate || !endDate
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
            >
                {!startDate || !endDate
                    ? t('schedule.dateSelection.selectDateButton')
                    : t('schedule.common.createScheduleButton')}
            </Button>
        </div>
    );
}
