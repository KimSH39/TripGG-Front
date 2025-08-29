'use client';

import { Button } from '@/components/ui/button';
import SvgAi from '@/components/icons/Ai';
import SvgSelf from '@/components/icons/Self';

interface PlanTypeSelectionProps {
    selectedPlanType: string;
    setSelectedPlanType: (type: string) => void;
    setIsAIPlanning: (isAI: boolean) => void;
    setIsManualPlanning: (isManual: boolean) => void;
}

export default function PlanTypeSelection({
    selectedPlanType,
    setSelectedPlanType,
    setIsAIPlanning,
    setIsManualPlanning,
}: PlanTypeSelectionProps) {
    return (
        <div className="p-4 pb-24">
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
                    className={`w-full p-4 rounded-lg border-2 transition-colors text-left ${
                        selectedPlanType === 'ai'
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                    }`}
                >
                    <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 flex items-center justify-center">
                            <SvgAi isSelected={selectedPlanType === 'ai'} className="w-full h-full" />
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
                    className={`w-full p-4 rounded-lg border-2 transition-colors text-left ${
                        selectedPlanType === 'manual'
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                    }`}
                >
                    <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 flex items-center justify-center">
                            <SvgSelf isSelected={selectedPlanType === 'manual'} className="w-full h-full" />
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
                    } else {
                        setIsAIPlanning(true);
                    }
                }}
                disabled={!selectedPlanType}
                className={`w-full h-14 mt-6 text-lg font-semibold
                        ${
                            !selectedPlanType
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-blue-500 hover:bg-blue-600 text-white'
                        }`}
            >
                일정 생성하기
            </Button>
        </div>
    );
}
