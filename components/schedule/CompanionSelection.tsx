import { Button } from '@/components/ui/button';
import { companions as defaultCompanions, travelStyles as defaultTravelStyles } from '@/constants/travelData';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

// 아이콘 컴포넌트의 타입 정의를 업데이트합니다.
// 이제 모든 아이콘 컴포넌트가 isSelected prop을 받도록 정의됩니다.
interface TravelItem {
    id: string;
    icon: (props: React.SVGProps<SVGSVGElement> & { isSelected: boolean }) => JSX.Element;
}

interface CompanionSelectionProps {
    selectedCompanion: string;
    setSelectedCompanion: (companion: string) => void;
    companions?: TravelItem[];
    nextStep: () => void;
    selectedStyle: string;
    setSelectedStyle: (style: string) => void;
    travelStyles?: TravelItem[];
}

export default function CompanionSelection({
    selectedCompanion,
    setSelectedCompanion,
    companions = defaultCompanions,
    nextStep,
    selectedStyle,
    setSelectedStyle,
    travelStyles = defaultTravelStyles,
}: CompanionSelectionProps) {
    const { t } = useTranslation('common');
    return (
        <div className="flex flex-col h-screen bg-white p-6">
            <div className="overflow-y-auto">
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">{t('schedule.companionSelection.title')}</h2>
                    <p className="text-gray-600 text-sm">{t('schedule.companionSelection.subtitle')}</p>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-8">
                    {companions.map((companion) => {
                        const isSelected = selectedCompanion === companion.id;

                        return (
                            <button
                                key={companion.id}
                                onClick={() => setSelectedCompanion(companion.id)}
                                className={`flex items-center p-1 rounded-lg border transition-colors text-left
          ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'}
        `}
                            >
                                <span className="text-2xl p-2 rounded-full mb-2">
                                    <companion.icon
                                        isSelected={selectedCompanion === companion.id}
                                        className="w-10 h-10 mr-3 flex-shrink-0"
                                    />
                                </span>
                                <div>
                                    <div className="font-semibold text-sm text-gray-800">
                                        {t(`travelData.${companion.id}.name`)}
                                    </div>
                                    <div className="text-xs text-gray-500">{t(`travelData.${companion.id}.desc`)}</div>
                                </div>
                            </button>
                        );
                    })}
                </div>

                <div className="mb-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">{t('schedule.travelStyleSelection.title')}</h2>
                    <p className="text-gray-600 text-sm">{t('schedule.travelStyleSelection.subtitle')}</p>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                    {travelStyles.map((style) => (
                        <button
                            key={style.id}
                            onClick={() => setSelectedStyle(style.id)}
                            className={`flex items-center p-4 rounded-lg border transition-colors text-left
                ${
                    selectedStyle === style.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                }
            `}
                        >
                            <style.icon
                                isSelected={selectedStyle === style.id}
                                className="w-10 h-10 mr-3 flex-shrink-0"
                            />
                            <div>
                                <div className="font-semibold text-sm text-gray-800">
                                    {t(`travelData.${style.id}.name`)}
                                </div>
                                <div className="text-xs text-gray-500">{t(`travelData.${style.id}.desc`)}</div>
                            </div>
                        </button>
                    ))}
                </div>
                <Button
                    onClick={nextStep}
                    disabled={!selectedCompanion || !selectedStyle}
                    className={`w-full h-14 mt-6 text-lg font-semibold
                    ${
                        !selectedCompanion || !selectedStyle
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-blue-500 hover:bg-blue-600 text-white'
                    }`}
                >
                    {t('schedule.common.nextStepButton')}
                </Button>
            </div>
        </div>
    );
}
