'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Search, Clock, MapPin } from 'lucide-react';
import BottomNavigation from '@/components/bottom-navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import BusIcon from '@/components/icons/BusIcon';
import CarIcon from '@/components/icons/CarIcon';
import QuestionIcon from '@/components/icons/QuestionIcon';

export default function SchedulePage() {
    const [currentStep, setCurrentStep] = useState(1);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedCompanion, setSelectedCompanion] = useState('');
    const [selectedPlanType, setSelectedPlanType] = useState('');
    const [currentMonth, setCurrentMonth] = useState(new Date(2025, 9)); // October 2025

    const [isManualPlanning, setIsManualPlanning] = useState(false);
    const [isAIPlanning, setIsAIPlanning] = useState(false);
    const [planningStep, setPlanningStep] = useState(1); // 1: 빈 일정, 2: 장소 검색, 3: 장소 상세, 4: 시간 설정
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedPlaces, setSelectedPlaces] = useState<any[]>([]);
    const [currentPlace, setCurrentPlace] = useState<any>(null);
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedDay, setSelectedDay] = useState(1); // 선택된 일차 상태 추가

    const [directPlanningData, setDirectPlanningData] = useState({
        region: '',
        time: '',
        location: '',
        category: '',
    });

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

    const categoryColors = {
        관광: 'bg-blue-100 text-blue-800',
        카페: 'bg-orange-100 text-orange-800',
        식사: 'bg-green-100 text-green-800',
        기타: 'bg-gray-100 text-gray-800',
    };

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

    const travelStyles = [
        { id: 'free', name: '자유', desc: '자유 자재로' },
        { id: 'public', name: '대중교통', desc: '대중교통 이용' },
        { id: 'commercial', name: '상업관광', desc: '관광지 위주' },
        { id: 'nature', name: '자연', desc: '자연 체험' },
        { id: 'food', name: '맛집', desc: '맛집 탐방' },
    ];

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
        return `${date.getFullYear()}년 ${date.getMonth() + 1}월`;
    };

    const getDateRange = (start: Date, end: Date): Date[] => {
        const dates = [];
        const currentDate = new Date(start);
        while (currentDate <= end) {
            dates.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return dates;
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
            // 시작일 설정 또는 새로운 범위 시작
            setStartDate(date);
            setEndDate(null);
            console.log('[v0] 시작일 설정:', date);
        } else if (startDate && !endDate) {
            const startDateOnly = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
            const clickedDateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());

            if (clickedDateOnly >= startDateOnly) {
                setEndDate(date);
                console.log('[v0] 종료일 설정:', date);
            } else {
                // 시작일보다 이전 날짜를 클릭하면 새로운 시작일로 설정
                setStartDate(date);
                setEndDate(null);
                console.log('[v0] 새로운 시작일 설정:', date);
            }
        }
    };
    const steps = ['기간 선택', '타입 선택', '타입 선택', '일정 생성 방법 선택'];
    const nextStep = () => {
        if (currentStep < 4) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const renderDateSelection = () => (
        <div className="p-4 pb-24">
            <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-2">여행 기간을 알려 주세요</h2>
            </div>

            <Card className="shadow-sm ">
                <CardContent className="p-6">
                    {' '}
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
                        {' '}
                        {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
                            <div key={day} className="py-1">
                                {' '}
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
                                            w-full h-full flex items-center justify-center text- transition-colors font-medium
                                            ${
                                                isStartDate(date) || isEndDate(date)
                                                    ? 'bg-blue-600 text-white font-semibold rounded-lg'
                                                    : isDateInRange(date)
                                                    ? 'text-blue-700'
                                                    : 'hover:bg-gray-100 rounded-lg'
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
                    console.log('[v0] 일정 만들기 버튼 클릭, 시작일:', startDate, '종료일:', endDate);
                    nextStep();
                }}
                disabled={!startDate || !endDate}
                className={`w-full h-12 mt-6 text-lg font-semibold ${
                    !startDate || !endDate
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                } 
                `}
            >
                {!startDate || !endDate ? '날짜를 선택해주세요' : '여행 일정 만들기'}
            </Button>
        </div>
    );

    const renderRegionSelection = () => (
        <div className="p-4">
            <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-2">여행 지역을 골라 주세요</h2>
                <p className="text-gray-600 text-sm">선택하신 지역을 바탕으로 추천 장소를 찾아드려요</p>
            </div>

            <div className="grid grid-cols-4 gap-2 mb-8">
                {' '}
                {/* 그리드 열과 간격 조정 */}
                {regions.map((region) => (
                    <button
                        key={region.id}
                        onClick={() => setSelectedRegion(region.id)}
                        className={`
                        p-2 rounded-full text-center transition-colors border
                        ${
                            selectedRegion === region.id
                                ? 'bg-blue-50 text-blue-600 border-blue-500' // 선택 시 파란색 배경, 텍스트, 테두리
                                : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200' // 비선택 시 회색 배경, 텍스트, 테두리
                        }
                    `}
                    >
                        <div className="text-sm font-medium">{region.name}</div>
                    </button>
                ))}
            </div>
        </div>
    );

    const renderTravelStyleSelection = () => (
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
    ${selectedTravelStyle === 'public' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}
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
    ${selectedTravelStyle === 'undecided' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}
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
    );

    const [selectedTravelStyle, setSelectedTravelStyle] = useState('');

    const renderRegionAndTravelSelection = () => (
        <>
            {renderRegionSelection()}
            {renderTravelStyleSelection()}
            <Button
                onClick={nextStep}
                disabled={!selectedRegion || !selectedTravelStyle} // 두 상태 모두 선택해야 버튼 활성화
                className="w-full bg-blue-500 hover:bg-blue-600 h-12 mb-20"
            >
                여행 일정 만들기
            </Button>
        </>
    );

    const renderCompanionSelection = () => (
        <div className="p-4">
            <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-2">누구와 함께 떠나는 여행인가요?</h2>
            </div>

            <div className="space-y-3 mb-8">
                {companions.map((companion) => (
                    <button
                        key={companion.id}
                        onClick={() => setSelectedCompanion(companion.id)}
                        className={`w-full p-4 rounded-lg border-2 transition-colors text-left ${
                            selectedCompanion === companion.id
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300'
                        }`}
                    >
                        <div className="flex items-center space-x-3">
                            <span className="text-2xl">{companion.icon}</span>
                            <div>
                                <div className="font-medium">{companion.name}</div>
                                <div className="text-sm text-gray-600">{companion.desc}</div>
                            </div>
                        </div>
                    </button>
                ))}
            </div>

            <Button
                onClick={nextStep}
                disabled={!selectedCompanion}
                className="w-full bg-blue-500 hover:bg-blue-600 h-12"
            >
                여행 일정 만들기
            </Button>
        </div>
    );

    const renderPlanTypeSelection = () => (
        <div className="p-4">
            <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-2">어떻게 일정을 구성할까요?</h2>
                <p className="text-gray-600 text-sm">
                    AI가 맞춤형 일정을 짜드리거나,
                    <br />
                    직접 자유롭게 일정을 구성할 수 있어요
                </p>
            </div>

            <div className="space-y-4 mb-8">
                <button
                    onClick={() => setSelectedPlanType('ai')}
                    className={`w-full p-6 rounded-lg border-2 transition-colors text-left ${
                        selectedPlanType === 'ai'
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                    }`}
                >
                    <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <span className="text-2xl">🤖</span>
                        </div>
                        <div>
                            <div className="font-semibold text-lg">AI 추천 일정 받기</div>
                            <div className="text-sm text-gray-600 mt-1">
                                선택한 정보를 바탕으로 AI가
                                <br />
                                최적의 일정을 추천해 드려요
                            </div>
                        </div>
                    </div>
                </button>

                <button
                    onClick={() => setSelectedPlanType('manual')}
                    className={`w-full p-6 rounded-lg border-2 transition-colors text-left ${
                        selectedPlanType === 'manual'
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                    }`}
                >
                    <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                            <span className="text-2xl">📝</span>
                        </div>
                        <div>
                            <div className="font-semibold text-lg">직접 일정 구성하기</div>
                            <div className="text-sm text-gray-600 mt-1">
                                원하는 장소를 직접 선택해서
                                <br />
                                나만의 일정을 만들어 보세요
                            </div>
                        </div>
                    </div>
                </button>
            </div>

            <Button
                onClick={() => {
                    if (selectedPlanType === 'manual') {
                        setIsManualPlanning(true);
                        setPlanningStep(1);
                    } else {
                        setIsAIPlanning(true);
                    }
                }}
                disabled={!selectedPlanType}
                className="w-full bg-blue-500 hover:bg-blue-600 h-12"
            >
                일정 생성하기
            </Button>
        </div>
    );

    const renderEmptySchedule = () => (
        <div className="p-4">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-400">장소</span>
                </div>
                <button
                    onClick={() => setPlanningStep(2)}
                    className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center"
                >
                    <Plus className="h-5 w-5 text-white" />
                </button>
            </div>

            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-400">시간</span>
                </div>
            </div>

            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-400">장소</span>
                </div>
            </div>

            <Button onClick={() => setPlanningStep(2)} className="w-full bg-blue-500 hover:bg-blue-600 h-12">
                장소 추가하기
            </Button>
        </div>
    );

    const renderPlaceSearch = () => (
        <div className="p-4">
            <div className="mb-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                        placeholder="강릉"
                        value={searchQuery || '강릉'}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 h-12 bg-gray-50"
                    />
                </div>
            </div>

            <div className="space-y-2">
                {regions.map((region) => (
                    <button
                        key={region.id}
                        onClick={() => {
                            setCurrentPlace(region);
                            setPlanningStep(3);
                        }}
                        className="w-full p-3 bg-white rounded-lg text-left hover:bg-gray-50 transition-colors border"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="font-medium text-sm">{region.name}</div>
                                <div className="text-xs text-gray-500">{region.id}</div>
                            </div>
                            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                <Plus className="h-4 w-4 text-white" />
                            </div>
                        </div>
                    </button>
                ))}
            </div>

            <Button onClick={() => setPlanningStep(1)} variant="outline" className="w-full mt-6 h-12">
                장소 추가하기
            </Button>
        </div>
    );

    const renderPlaceDetail = () => (
        <div className="p-4">
            {currentPlace && (
                <>
                    <div className="mb-6">
                        <div className="bg-white border rounded-lg p-4 mb-4">
                            <div className="flex items-center justify-between mb-3">
                                <span
                                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                                        categoryColors[currentPlace.name as keyof typeof categoryColors] ||
                                        categoryColors['기타']
                                    }`}
                                >
                                    {currentPlace.name}
                                </span>
                            </div>

                            <div className="space-y-2">
                                <div className="font-semibold text-lg">{currentPlace.name}</div>
                                <div className="flex items-center space-x-2 text-gray-600">
                                    <Clock className="h-4 w-4" />
                                    <button onClick={() => setPlanningStep(4)} className="text-blue-500 text-sm">
                                        {selectedTime || '시간 선택'}
                                    </button>
                                </div>
                                <div className="flex items-center space-x-2 text-gray-600">
                                    <MapPin className="h-4 w-4" />
                                    <span className="text-sm">{currentPlace.address}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Button
                        onClick={() => {
                            setSelectedPlaces([
                                ...selectedPlaces,
                                {
                                    ...currentPlace,
                                    time: selectedTime || '10:00',
                                    address: currentPlace.address,
                                },
                            ]);
                            setPlanningStep(1);
                            setCurrentPlace(null);
                            setSelectedTime('');
                        }}
                        className="w-full bg-blue-500 hover:bg-blue-600 h-12"
                    >
                        장소 추가하기
                    </Button>
                </>
            )}
        </div>
    );

    const renderTimeSelection = () => (
        <div className="p-4">
            <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                        <Clock className="h-5 w-5 text-gray-400" />
                        <span className="text-gray-400">시간</span>
                    </div>
                </div>

                <div className="bg-white border rounded-lg">
                    {['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'].map(
                        (time, index) => (
                            <button
                                key={time}
                                onClick={() => setSelectedTime(time)}
                                className={`w-full p-3 text-left hover:bg-gray-50 transition-colors ${
                                    index !== 8 ? 'border-b' : ''
                                } ${selectedTime === time ? 'bg-blue-50 text-blue-600' : ''}`}
                            >
                                {time}
                            </button>
                        )
                    )}
                </div>
            </div>

            <Button onClick={() => setPlanningStep(3)} className="w-full bg-blue-500 hover:bg-blue-600 h-12">
                장소 추가하기
            </Button>
        </div>
    );

    const renderScheduleWithPlaces = () => (
        <div className="pb-20">
            <div className="h-64 bg-gradient-to-b from-blue-100 to-blue-200 relative overflow-hidden">
                {/* 지도 배경 */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100">
                    {/* 해안선 표현 */}
                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-blue-300 to-transparent opacity-60"></div>

                    {/* 위치 핀들과 경로 */}
                    <svg className="absolute inset-0 w-full h-full">
                        {/* 경로 선 */}
                        {selectedPlaces.length > 1 && (
                            <path
                                d={`M 80,60 Q 120,80 160,100 Q 200,120 240,140`}
                                stroke="#3B82F6"
                                strokeWidth="3"
                                fill="none"
                                strokeDasharray="5,5"
                            />
                        )}

                        {/* 위치 핀들 */}
                        {selectedPlaces.map((place, index) => {
                            const positions = [
                                { x: 80, y: 60 },
                                { x: 160, y: 100 },
                                { x: 240, y: 140 },
                                { x: 180, y: 180 },
                                { x: 120, y: 200 },
                            ];
                            const pos = positions[index] || positions[0];

                            return (
                                <g key={index}>
                                    {/* 핀 그림자 */}
                                    <circle cx={pos.x + 2} cy={pos.y + 2} r="12" fill="rgba(0,0,0,0.2)" />
                                    {/* 핀 */}
                                    <circle
                                        cx={pos.x}
                                        cy={pos.y}
                                        r="12"
                                        fill="#3B82F6"
                                        stroke="white"
                                        strokeWidth="3"
                                    />
                                    {/* 핀 번호 */}
                                    <text
                                        x={pos.x}
                                        y={pos.y + 4}
                                        textAnchor="middle"
                                        fill="white"
                                        fontSize="12"
                                        fontWeight="bold"
                                    >
                                        {index + 1}
                                    </text>
                                </g>
                            );
                        })}
                    </svg>
                </div>
            </div>

            <div className="p-4">
                <div className="space-y-3 mb-6">
                    {selectedPlaces
                        .sort((a, b) => a.time.localeCompare(b.time))
                        .map((place, index) => (
                            <div key={index} className="bg-white border rounded-lg p-4 shadow-sm">
                                <div className="flex items-start space-x-3">
                                    {/* 시간과 카테고리 색상 점 */}
                                    <div className="flex flex-col items-center">
                                        <div className="text-sm font-bold text-gray-800">{place.time}</div>
                                        <div
                                            className={`w-3 h-3 rounded-full mt-1 ${
                                                place.category === '관광'
                                                    ? 'bg-blue-500'
                                                    : place.category === '카페'
                                                    ? 'bg-orange-500'
                                                    : place.category === '식사'
                                                    ? 'bg-green-500'
                                                    : 'bg-purple-500'
                                            }`}
                                        ></div>
                                    </div>

                                    {/* 장소 정보 */}
                                    <div className="flex-1">
                                        <div className="font-semibold text-gray-800 mb-1">{place.name}</div>
                                        <div className="text-sm text-gray-600 mb-2">{place.address}</div>
                                        <div className="text-xs text-gray-500">
                                            {place.category === '관광'
                                                ? '관광지 방문'
                                                : place.category === '카페'
                                                ? '커피 한잔 및 휴식'
                                                : place.category === '식사'
                                                ? '맛있는 식사'
                                                : '기타 활동'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>

                {/* 장소 추가 버튼 */}
                <button
                    onClick={() => setPlanningStep(2)}
                    className="w-full mt-6 p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 transition-colors flex flex-col items-center"
                >
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-2">
                        <Plus className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-sm">장소 추가하기</span>
                </button>
            </div>
        </div>
    );

    const getCategoryStats = () => {
        const stats = { 관광: 0, 식사: 0, 카페: 0, 기타: 0 };
        const currentSchedule =
            aiRecommendedScheduleByDay[selectedDay as keyof typeof aiRecommendedScheduleByDay] || [];

        currentSchedule.forEach((item) => {
            const startTime = new Date(`2000-01-01 ${item.time}:00`);
            const endTime = new Date(`2000-01-01 ${item.endTime}:00`);
            const duration = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60); // 시간 단위
            stats[item.category as keyof typeof stats] += duration;
        });

        return stats;
    };

    const renderAIRecommendedSchedule = () => {
        const categoryStats = getCategoryStats(); // 카테고리 통계 계산
        const currentSchedule =
            aiRecommendedScheduleByDay[selectedDay as keyof typeof aiRecommendedScheduleByDay] || [];

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

                    {/* 카테고리별 색상 범례 */}
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
                        {/* 세로 타임라인 */}
                        <div className="absolute left-12 top-0 bottom-0 w-0.5 bg-gray-200"></div>

                        <div className="space-y-4">
                            {currentSchedule.map((item, index) => (
                                <div key={index} className="relative">
                                    {/* 시간 표시 */}
                                    <div className="flex items-start">
                                        <div className="w-12 text-right pr-3">
                                            <div className="text-sm font-bold text-gray-800">{item.time}</div>
                                        </div>

                                        {/* 타임라인 점 */}
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

                                        {/* 일정 내용 */}
                                        <div className="flex-1 ml-4 bg-white border rounded-lg p-4 shadow-sm">
                                            <div className="font-semibold text-gray-800 mb-1">{item.name}</div>
                                            <div className="text-sm text-blue-600 mb-2">
                                                {item.time}-{item.endTime}
                                            </div>
                                            <div className="text-sm text-gray-600">{item.description}</div>

                                            {/* 이동 정보 확인 버튼 */}
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
                        setIsAIPlanning(false);
                        setIsManualPlanning(true);
                        setPlanningStep(2);
                    }}
                    className="fixed bottom-20 right-4 w-14 h-14 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center shadow-lg z-10"
                >
                    <Plus className="h-6 w-6 text-white" />
                </button>
            </div>
        );
    };

    const renderDirectPlanning = () => (
        <div className="p-4">
            <div className="space-y-4 mb-8">
                {/* 여행지역 */}
                <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                        <Input
                            placeholder="여행지역"
                            value={directPlanningData.region}
                            onChange={(e) => setDirectPlanningData({ ...directPlanningData, region: e.target.value })}
                            className="border-0 border-b border-gray-300 rounded-none px-0 focus:border-blue-500"
                        />
                    </div>
                </div>

                {/* 시간 */}
                <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <div className="flex-1">
                        <Input
                            placeholder="시간"
                            value={directPlanningData.time}
                            onChange={(e) => setDirectPlanningData({ ...directPlanningData, time: e.target.value })}
                            className="border-0 border-b border-gray-300 rounded-none px-0 focus:border-blue-500"
                        />
                    </div>
                </div>

                {/* 장소 */}
                <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <div className="flex-1">
                        <Input
                            placeholder="경기 여천시 여천동로 1200"
                            value={directPlanningData.location}
                            onChange={(e) => setDirectPlanningData({ ...directPlanningData, location: e.target.value })}
                            className="border-0 border-b border-gray-300 rounded-none px-0 focus:border-blue-500"
                        />
                    </div>
                </div>

                {/* 추가 정보 */}
                <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                        <Input
                            placeholder="추가 정보"
                            value={directPlanningData.category}
                            onChange={(e) => setDirectPlanningData({ ...directPlanningData, category: e.target.value })}
                            className="border-0 border-b border-gray-300 rounded-none px-0 focus:border-blue-500"
                        />
                    </div>
                </div>
            </div>

            <Button
                onClick={() => {
                    // 장소 추가 후 지도 화면으로 이동
                    if (directPlanningData.location) {
                        setSelectedPlaces([
                            ...selectedPlaces,
                            {
                                name: directPlanningData.location,
                                time: directPlanningData.time || '10:00',
                                address: directPlanningData.location,
                                category: '기타',
                            },
                        ]);
                        setPlanningStep(1); // 지도가 포함된 일정 화면으로 이동
                    }
                }}
                className="w-full bg-blue-500 hover:bg-blue-600 h-12"
                disabled={!directPlanningData.location}
            >
                일정 추가하기
            </Button>
        </div>
    );

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

                {renderAIRecommendedSchedule()}

                <BottomNavigation currentTab="schedule" />
            </div>
        );
    }

    if (isManualPlanning) {
        return (
            <div className="min-h-screen bg-white">
                <div className="bg-white border-b p-4">
                    <div className="flex items-center space-x-3">
                        <button
                            onClick={() => {
                                if (planningStep > 1) {
                                    setPlanningStep(planningStep - 1);
                                } else {
                                    setIsManualPlanning(false);
                                }
                            }}
                            className="p-1"
                        >
                            <ChevronLeft className="h-6 w-6" />
                        </button>
                        <div>
                            <h1 className="text-lg font-bold">경기도 여행 일정</h1>
                            <p className="text-sm text-gray-600">여행일정 만들기</p>
                        </div>
                    </div>
                </div>

                {planningStep === 1 && selectedPlaces.length === 0 && renderDirectPlanning()}
                {planningStep === 1 && selectedPlaces.length > 0 && renderScheduleWithPlaces()}
                {planningStep === 2 && renderPlaceSearch()}
                {planningStep === 3 && renderPlaceDetail()}
                {planningStep === 4 && renderTimeSelection()}

                <BottomNavigation currentTab="schedule" />
            </div>
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
                        <h1 className="text-lg font-bold">여행 일정 만들기</h1>
                        <p className="text-sm text-gray-600">{steps[currentStep - 1]}</p>
                    </div>
                </div>
            </div>

            {currentStep === 1 && renderDateSelection()}
            {currentStep === 2 && renderRegionAndTravelSelection()}
            {currentStep === 3 && renderCompanionSelection()}
            {currentStep === 4 && renderPlanTypeSelection()}

            <BottomNavigation currentTab="schedule" />
        </div>
    );
}
