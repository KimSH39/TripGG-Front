'use client';

import { Button } from '@/components/ui/button';
import SvgAi from '@/components/icons/Ai';
import SvgSelf from '@/components/icons/Self';
import { useTranslation } from 'react-i18next';

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
    const { t } = useTranslation('common');
    return (
        <div className="p-4 pb-24">
            <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-2">{t('schedule.planTypeSelection.title')}</h2>
                <p className="text-gray-600 text-sm">
                    {t('schedule.planTypeSelection.subtitle1')}
                    <br />
                    {t('schedule.planTypeSelection.subtitle2')}
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
                            <div className="font-semibold text-lg">{t('schedule.planTypeSelection.aiPlanTitle')}</div>
                            <div className="text-sm text-gray-600 mt-1">
                                {t('schedule.planTypeSelection.aiPlanDescription1')}
                                <br />
                                {t('schedule.planTypeSelection.aiPlanDescription2')}
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
                            <div className="font-semibold text-lg">
                                {t('schedule.planTypeSelection.manualPlanTitle')}
                            </div>
                            <div className="text-sm text-gray-600 mt-1">
                                {t('schedule.planTypeSelection.manualPlanDescription1')}
                                <br />
                                {t('schedule.planTypeSelection.manualPlanDescription2')}
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
                {t('schedule.common.createScheduleButton')}
            </Button>
        </div>
    );
}
