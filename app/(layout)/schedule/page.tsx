'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';
import DateSelection from '@/components/schedule/DateSelection';
import ScheduleManual from '@/components/schedule/ScheduleManual';
import RegionTravelSelection from '@/components/schedule/RegionTravelSelection';
import CompanionSelection from '@/components/schedule/CompanionSelection';
import PlanTypeSelection from '@/components/schedule/PlanTypeSelection';
import AIRecommendedSchedule from '@/components/schedule/AIRecommendedSchedule';
import { useUiStore } from '@/store/uiStore'; //
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';

export default function SchedulePage() {
    const [currentStep, setCurrentStep] = useState(1);
    const { setHideBottomNav } = useUiStore(); //
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedCompanion, setSelectedCompanion] = useState('');
    const [selectedPlanType, setSelectedPlanType] = useState('');
    const [selectedTravelStyle, setSelectedTravelStyle] = useState('');
    const [isManualPlanning, setIsManualPlanning] = useState(false);
    const [isAIPlanning, setIsAIPlanning] = useState(false);

    const { t, i18n } = useTranslation('common');

    const formattedStartDate = startDate
        ? `${startDate.getFullYear()}.${(startDate.getMonth() + 1).toString().padStart(2, '0')}.${startDate
              .getDate()
              .toString()
              .padStart(2, '0')}`
        : '';
    const formattedEndDate = endDate
        ? `${endDate.getFullYear()}.${(endDate.getMonth() + 1).toString().padStart(2, '0')}.${endDate
              .getDate()
              .toString()
              .padStart(2, '0')}`
        : '';
    const dateRange = startDate && endDate ? `${formattedStartDate} - ${formattedEndDate}` : '';

    const [aiRecommendedScheduleByDay, setAiRecommendedScheduleByDay] = useState({
        1: [
            {
                id: 'day1-item1',
                time: '11:00',
                endTime: '11:20',
                name: '이천터미널',
                category: '기타',
                description: '경기 이천시 이성대로 1200',
                address: '경기 이천시 이성대로 1200',
            },
            {
                id: 'day1-item2',
                time: '11:20',
                endTime: '12:20',
                name: '장흥회관',
                category: '식사',
                description: '경기 이천시 중리천로 8-1',
                address: '경기 이천시 중리천로 8-1',
            },
            {
                id: 'day1-item3',
                time: '12:40',
                endTime: '14:20',
                name: '설봉공원 & 설봉호 산책',
                category: '관광',
                description: '경기 이천시 관고동 408-3',
                address: '경기 이천시 관고동 408-3',
            },
            {
                id: 'day1-item4',
                time: '16:30',
                endTime: '17:30',
                name: '카페 밤온 @ 이진상회 (마장면)',
                category: '카페',
                description: '경기 이천시 마장면 서이천로 648 5동 1-2층',
                address: '경기 이천시 마장면 서이천로 648 5동',
            },
        ],
        2: [
            {
                id: 'day2-item1',
                time: '09:00',
                endTime: '10:00',
                name: '강릉역',
                category: '기타',
                description: '강원 강릉시 강릉대로 402',
                address: '강원 강릉시 강릉대로 402',
            },
            {
                id: 'day2-item2',
                time: '10:30',
                endTime: '12:00',
                name: '경포해변',
                category: '관광',
                description: '강원 강릉시 창해로 514',
                address: '강원 강릉시 창해로 514',
            },
            {
                id: 'day2-item3',
                time: '12:30',
                endTime: '13:30',
                name: '초당순두부마을',
                category: '식사',
                description: '강원 강릉시 초당동',
                address: '강원 강릉시 초당동',
            },
            {
                id: 'day2-item4',
                time: '15:00',
                endTime: '16:00',
                name: '안목해변 카페거리',
                category: '카페',
                description: '강원 강릉시 창해로 17',
                address: '강원 강릉시 창해로 17',
            },
        ],
        3: [
            {
                id: 'day3-item1',
                time: '08:30',
                endTime: '09:30',
                name: '정동진역',
                category: '관광',
                description: '강원 강릉시 강동면 정동진리',
                address: '강원 강릉시 강동면 정동진리',
            },
            {
                id: 'day3-item2',
                time: '10:00',
                endTime: '11:30',
                name: '정동진해변',
                category: '관광',
                description: '강원 강릉시 강동면 정동진리',
                address: '강원 강릉시 강동면 정동진리',
            },
            {
                id: 'day3-item3',
                time: '12:00',
                endTime: '13:00',
                name: '해돋이공원 맛집',
                category: '식사',
                description: '강원 강릉시 강동면 정동진리',
                address: '강원 강릉시 강동면 정동진리',
            },
            {
                id: 'day3-item4',
                time: '14:30',
                endTime: '15:30',
                name: '썬크루즈 리조트',
                category: '관광',
                description: '강원 강릉시 강동면 헌화로 950-39',
                address: '강원 강릉시 강동면 헌화로 950-39',
            },
        ],
        4: [
            {
                id: 'day4-item1',
                time: '09:00',
                endTime: '10:30',
                name: '오죽헌',
                category: '관광',
                description: '강원 강릉시 율곡로 3139-6',
                address: '강원 강릉시 율곡로 3139-6',
            },
            {
                id: 'day4-item2',
                time: '11:00',
                endTime: '12:00',
                name: '강릉중앙시장',
                category: '식사',
                description: '강원 강릉시 금성로 21',
                address: '강원 강릉시 금성로 21',
            },
            {
                id: 'day4-item3',
                time: '13:30',
                endTime: '14:30',
                name: '테라로사 강릉',
                category: '카페',
                description: '강원 강릉시 구정면 현천길 7',
                address: '강원 강릉시 구정면 현천길 7',
            },
            {
                id: 'day4-item4',
                time: '15:00',
                endTime: '16:00',
                name: '강릉역 출발',
                category: '기타',
                description: '강원 강릉시 강릉대로 402',
                address: '강원 강릉시 강릉대로 402',
            },
        ],
    });

    const nextStep = () => setCurrentStep(currentStep + 1);
    const prevStep = () => setCurrentStep(currentStep - 1);
    const steps = [
        t('schedule.steps.step1'),
        t('schedule.steps.step2'),
        t('schedule.steps.step3'),
        t('schedule.steps.step4'),
    ];

    // Effect to control bottom navigation visibility
    useEffect(() => {
        if (currentStep > 1 || isAIPlanning || isManualPlanning) {
            setHideBottomNav(true);
        } else {
            setHideBottomNav(false);
        }

        return () => {
            setHideBottomNav(false);
        };
    }, [currentStep, isAIPlanning, isManualPlanning, setHideBottomNav]);

    if (isAIPlanning) {
        return (
            <div className="min-h-screen bg-white">
                <div className="bg-white border-b p-4">
                    <div className="flex items-center space-x-3">
                        <button onClick={() => setIsAIPlanning(false)} className="p-1">
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
                            <p className="text-sm text-gray-600">{dateRange}</p>
                        </div>
                    </div>
                </div>
                <AIRecommendedSchedule
                    aiRecommendedScheduleByDay={aiRecommendedScheduleByDay}
                    startDate={startDate}
                    endDate={endDate}
                    selectedRegion={selectedRegion}
                    setAiRecommendedScheduleByDay={setAiRecommendedScheduleByDay}
                    onSaveOverallPlan={(schedule) => {
                        console.log('Overall plan saved:', schedule);
                        // Here you would implement the actual saving logic, e.g., API call
                    }}
                />
            </div>
        );
    }

    if (isManualPlanning) {
        return (
            <ScheduleManual
                setIsManualPlanning={setIsManualPlanning}
                startDate={startDate}
                endDate={endDate}
                selectedRegion={selectedRegion}
            />
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="bg-white p-4">
                <div className="relative flex items-center justify-center">
                    {currentStep > 1 && (
                        <button onClick={prevStep} className="absolute left-4 p-1">
                            <ChevronLeft className="h-6 w-6" />
                        </button>
                    )}
                    <div className="text-center">
                        <h1 className="text-lg font-bold">{t('schedule.common.createScheduleButton')}</h1>
                        <p className="text-sm text-gray-600">{steps[currentStep - 1]}</p>
                    </div>
                </div>
            </div>

            {currentStep === 1 && (
                <DateSelection
                    startDate={startDate}
                    setStartDate={setStartDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                    nextStep={nextStep}
                />
            )}
            {currentStep === 2 && (
                <RegionTravelSelection
                    selectedRegion={selectedRegion}
                    setSelectedRegion={setSelectedRegion}
                    selectedTravelStyle={selectedTravelStyle}
                    setSelectedTravelStyle={setSelectedTravelStyle}
                    nextStep={nextStep}
                />
            )}
            {currentStep === 3 && (
                <CompanionSelection
                    selectedCompanion={selectedCompanion}
                    setSelectedCompanion={setSelectedCompanion}
                    selectedStyle={selectedTravelStyle}
                    setSelectedStyle={setSelectedTravelStyle}
                    nextStep={nextStep}
                />
            )}

            {currentStep === 4 && (
                <PlanTypeSelection
                    selectedPlanType={selectedPlanType}
                    setSelectedPlanType={setSelectedPlanType}
                    setIsAIPlanning={setIsAIPlanning}
                    setIsManualPlanning={setIsManualPlanning}
                />
            )}
        </div>
    );
}
