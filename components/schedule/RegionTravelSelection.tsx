'use client';

import { Button } from '@/components/ui/button';
import BusIcon from '@/components/icons/BusIcon';
import CarIcon from '@/components/icons/CarIcon';
import QuestionIcon from '@/components/icons/QuestionIcon';
import { regions } from '@/constants/travelData';
import { useTranslation } from 'react-i18next';

interface RegionTravelSelectionProps {
    selectedRegion: string;
    setSelectedRegion: (regionId: string) => void;
    selectedTravelStyle: string;
    setSelectedTravelStyle: (style: string) => void;
    nextStep: () => void;
}

export default function RegionTravelSelection({
    selectedRegion,
    setSelectedRegion,
    selectedTravelStyle,
    setSelectedTravelStyle,
    nextStep,
}: RegionTravelSelectionProps) {
    const { t } = useTranslation('common');
    return (
        <>
            <div className="p-4">
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">{t('schedule.regionSelection.title')}</h2>
                    <p className="text-gray-600 text-sm">{t('schedule.regionSelection.subtitle')}</p>
                </div>
                <div className="grid grid-cols-4 gap-2 mb-8">
                    {regions.map((region) => (
                        <button
                            key={region.id}
                            onClick={() => setSelectedRegion(region.id)}
                            className={`
                p-2 rounded-lg text-center transition-colors border
                ${
                    selectedRegion === region.id
                        ? 'bg-blue-50 text-blue-600 border-blue-500'
                        : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
                }
              `}
                        >
                            <div className="text-sm font-medium">{t(`travelData.${region.id}.name`)}</div>
                        </button>
                    ))}
                </div>
            </div>

            <div className="p-4">
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">
                        {t('schedule.travelMethodSelection.title')}
                    </h2>
                    <p className="text-gray-600 text-sm">{t('schedule.travelMethodSelection.subtitle')}</p>
                </div>
                <div className="space-y-4 mb-8">
                    <button
                        onClick={() => setSelectedTravelStyle('car')}
                        className={`w-full p-4 rounded-lg border-2 transition-colors text-left
              ${
                  selectedTravelStyle === 'car' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
              }`}
                    >
                        <div className="flex items-center space-x-4">
                            <CarIcon isSelected={selectedTravelStyle === 'car'} />
                            <div>
                                <div className="font-semibold">{t('schedule.travelMethodSelection.carTitle')}</div>
                                <div className="text-sm text-gray-600 mt-1">
                                    {t('schedule.travelMethodSelection.carDescription')}
                                </div>
                            </div>
                        </div>
                    </button>

                    <button
                        onClick={() => setSelectedTravelStyle('public')}
                        className={`w-full p-4 rounded-lg border-2 transition-colors text-left
              ${
                  selectedTravelStyle === 'public'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
              }`}
                    >
                        <div className="flex items-center space-x-4">
                            <BusIcon isSelected={selectedTravelStyle === 'public'} />
                            <div>
                                <div className="font-semibold">
                                    {t('schedule.travelMethodSelection.publicTransportTitle')}
                                </div>
                                <div className="text-sm text-gray-600 mt-1">
                                    {t('schedule.travelMethodSelection.publicTransportDescription')}
                                </div>
                            </div>
                        </div>
                    </button>

                    <button
                        onClick={() => setSelectedTravelStyle('undecided')}
                        className={`w-full p-4 rounded-lg border-2 transition-colors text-left
              ${
                  selectedTravelStyle === 'undecided'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
              }`}
                    >
                        <div className="flex items-center space-x-4">
                            <QuestionIcon isSelected={selectedTravelStyle === 'undecided'} />
                            <div>
                                <div className="font-semibold">
                                    {t('schedule.travelMethodSelection.undecidedTitle')}
                                </div>
                                <div className="text-sm text-gray-600 mt-1">
                                    {t('schedule.travelMethodSelection.undecidedDescription')}
                                </div>
                            </div>
                        </div>
                    </button>
                </div>
            </div>

            <div className="bottom-0 left-0 right-0 p-4 ">
                <Button
                    onClick={nextStep}
                    disabled={!selectedRegion || !selectedTravelStyle}
                    className={`w-full h-14 text-lg font-semibold
              ${
                  !selectedRegion || !selectedTravelStyle
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
                >
                    {t('schedule.common.createScheduleButton')}
                </Button>
            </div>
        </>
    );
}
