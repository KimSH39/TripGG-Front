'use client';

import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import DateSelection from '@/components/schedule/DateSelection';
import ScheduleManual from '@/components/schedule/ScheduleManual';
import RegionTravelSelection from '@/components/schedule/RegionTravelSelection';
import CompanionSelection from '@/components/schedule/CompanionSelection';
import PlanTypeSelection from '@/components/schedule/PlanTypeSelection';
import AIRecommendedSchedule from '@/components/schedule/AIRecommendedSchedule';

export default function SchedulePage() {
    const [currentStep, setCurrentStep] = useState(1);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedCompanion, setSelectedCompanion] = useState('');
    const [selectedPlanType, setSelectedPlanType] = useState('');
    const [selectedTravelStyle, setSelectedTravelStyle] = useState('');
    const [isManualPlanning, setIsManualPlanning] = useState(false);
    const [isAIPlanning, setIsAIPlanning] = useState(false);

    // 이외의 모든 상태와 더미 데이터는 여기에 유지합니다.
    const regions = [
        { id: 'suwon', name: '수원' },
        { id: 'gapyeong', name: '가평' },
        { id: 'uijeongbu', name: '의정부' },
        { id: 'namyangju', name: '남양주' },
        { id: 'pangyo', name: '판교' },
        { id: 'paju', name: '파주' },
        { id: 'seongnam', name: '성남' },
        { id: 'anyang', name: '안양' },
        { id: 'yongin', name: '용인' },
        { id: 'goyang', name: '고양' },
        { id: 'bucheon', name: '부천' },
        { id: 'hwaSeong', name: '화성' },
    ];
    const companions = [
        { id: 'family', name: '가족과 함께', icon: '🏠', desc: '온 가족이 함께하는' },
        { id: 'couple', name: '연인과 함께', icon: '💕', desc: '달콤한 둘만의' },
        { id: 'solo', name: '나홀로 여행', icon: '🚶', desc: '혼자만의 자유로운' },
        { id: 'friends', name: '친구와 함께', icon: '👥', desc: '친구들과 즐거운' },
        { id: 'colleagues', name: '직장 동료', icon: '💼', desc: '동료들과 함께하는' },
    ];
    const aiRecommendedScheduleByDay = {
        1: [
            {
                time: '11:00',
                endTime: '11:20',
                name: '이천터미널',
                category: '기타',
                description: '경기 이천시 이성대로 1200',
                address: '경기 이천시 이성대로 1200',
            },
            {
                time: '11:20',
                endTime: '12:20',
                name: '장흥회관',
                category: '식사',
                description: '경기 이천시 중리천로 8-1',
                address: '경기 이천시 중리천로 8-1',
            },
            {
                time: '12:40',
                endTime: '14:20',
                name: '설봉공원 & 설봉호 산책',
                category: '관광',
                description: '경기 이천시 관고동 408-3',
                address: '경기 이천시 관고동 408-3',
            },
            {
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
                time: '09:00',
                endTime: '10:00',
                name: '강릉역',
                category: '기타',
                description: '강원 강릉시 강릉대로 402',
                address: '강원 강릉시 강릉대로 402',
            },
            {
                time: '10:30',
                endTime: '12:00',
                name: '경포해변',
                category: '관광',
                description: '강원 강릉시 창해로 514',
                address: '강원 강릉시 창해로 514',
            },
            {
                time: '12:30',
                endTime: '13:30',
                name: '초당순두부마을',
                category: '식사',
                description: '강원 강릉시 초당동',
                address: '강원 강릉시 초당동',
            },
            {
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
                time: '08:30',
                endTime: '09:30',
                name: '정동진역',
                category: '관광',
                description: '강원 강릉시 강동면 정동진리',
                address: '강원 강릉시 강동면 정동진리',
            },
            {
                time: '10:00',
                endTime: '11:30',
                name: '정동진해변',
                category: '관광',
                description: '강원 강릉시 강동면 정동진리',
                address: '강원 강릉시 강동면 정동진리',
            },
            {
                time: '12:00',
                endTime: '13:00',
                name: '해돋이공원 맛집',
                category: '식사',
                description: '강원 강릉시 강동면 정동진리',
                address: '강원 강릉시 강동면 정동진리',
            },
            {
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
                time: '09:00',
                endTime: '10:30',
                name: '오죽헌',
                category: '관광',
                description: '강원 강릉시 율곡로 3139-6',
                address: '강원 강릉시 율곡로 3139-6',
            },
            {
                time: '11:00',
                endTime: '12:00',
                name: '강릉중앙시장',
                category: '식사',
                description: '강원 강릉시 금성로 21',
                address: '강원 강릉시 금성로 21',
            },
            {
                time: '13:30',
                endTime: '14:30',
                name: '테라로사 강릉',
                category: '카페',
                description: '강원 강릉시 구정면 현천길 7',
                address: '강원 강릉시 구정면 현천길 7',
            },
            {
                time: '15:00',
                endTime: '16:00',
                name: '강릉역 출발',
                category: '기타',
                description: '강원 강릉시 강릉대로 402',
                address: '강원 강릉시 강릉대로 402',
            },
        ],
    };

    const nextStep = () => setCurrentStep(currentStep + 1);
    const prevStep = () => setCurrentStep(currentStep - 1);
    const steps = ['기간 선택', '지역/교통 선택', '동반자 선택', '일정 생성 방법 선택'];

    if (isAIPlanning) {
        return (
            <div className="min-h-screen bg-white">
                <div className="bg-white border-b p-4">
                    <div className="flex items-center space-x-3">
                        <button onClick={() => setIsAIPlanning(false)} className="p-1">
                            <ChevronLeft className="h-6 w-6" />
                        </button>
                        <div>
                            <h1 className="text-lg font-bold">동해안 여행 일정</h1>
                            <p className="text-sm text-gray-600">AI 추천 일정</p>
                        </div>
                    </div>
                </div>
                <AIRecommendedSchedule aiRecommendedScheduleByDay={aiRecommendedScheduleByDay} />
            </div>
        );
    }

    if (isManualPlanning) {
        return <ScheduleManual setIsManualPlanning={setIsManualPlanning} />;
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
                        <h1 className="text-lg font-bold">여행 일정 만들기</h1>
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
                    regions={regions}
                    nextStep={nextStep}
                />
            )}
            {currentStep === 3 && (
                <CompanionSelection
                    selectedCompanion={selectedCompanion}
                    setSelectedCompanion={setSelectedCompanion}
                    companions={companions}
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
