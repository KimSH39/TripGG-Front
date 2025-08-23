'use client';

import { useState } from 'react';
import { ChevronLeft, Plus, Search, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ScheduleManualProps {
    setIsManualPlanning: (value: boolean) => void;
}

export default function ScheduleManual({ setIsManualPlanning }: ScheduleManualProps) {
    const [planningStep, setPlanningStep] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedPlaces, setSelectedPlaces] = useState<any[]>([]);
    const [currentPlace, setCurrentPlace] = useState<any>(null);
    const [selectedTime, setSelectedTime] = useState('');
    const [directPlanningData, setDirectPlanningData] = useState({
        region: '',
        time: '',
        location: '',
        category: '',
    });

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

    // 이 컴포넌트 내부에 모든 render 함수를 정의합니다.
    const renderDirectPlanning = () => (
        <div className="p-4">
            <div className="space-y-4 mb-8">
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
                        setPlanningStep(1);
                    }
                }}
                className="w-full bg-blue-500 hover:bg-blue-600 h-12"
                disabled={!directPlanningData.location}
            >
                일정 추가하기
            </Button>
        </div>
    );

    // 비어있는 일정 화면
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

    // 장소 검색 화면
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

    // 장소 상세 화면
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
                                { ...currentPlace, time: selectedTime || '10:00', address: currentPlace.address },
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

    // 시간 선택 화면
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

    // 장소가 포함된 일정 화면
    const renderScheduleWithPlaces = () => (
        <div className="pb-20">
            <div className="h-64 bg-gradient-to-b from-blue-100 to-blue-200 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100">
                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-blue-300 to-transparent opacity-60"></div>
                    <svg className="absolute inset-0 w-full h-full">
                        {selectedPlaces.length > 1 && (
                            <path
                                d={`M 80,60 Q 120,80 160,100 Q 200,120 240,140`}
                                stroke="#3B82F6"
                                strokeWidth="3"
                                fill="none"
                                strokeDasharray="5,5"
                            />
                        )}
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
                                    <circle cx={pos.x + 2} cy={pos.y + 2} r="12" fill="rgba(0,0,0,0.2)" />
                                    <circle
                                        cx={pos.x}
                                        cy={pos.y}
                                        r="12"
                                        fill="#3B82F6"
                                        stroke="white"
                                        strokeWidth="3"
                                    />
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

            {/* planningStep 상태에 따라 다른 화면을 렌더링합니다. */}
            <div>
                {planningStep === 1 && renderEmptySchedule()}
                {planningStep === 2 && renderPlaceSearch()}
                {planningStep === 3 && renderPlaceDetail()}
                {planningStep === 4 && renderTimeSelection()}
            </div>
        </div>
    );
}
