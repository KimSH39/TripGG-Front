import { Button } from '@/components/ui/button';
import { allRegions, travelTypeRegions } from '@/constants/travelData';
import { useTranslation } from 'react-i18next';
import { TravelTypeCard } from './TravelTypeSelection';

interface RegionSelectionProps {
    selectedRegion: string;
    setSelectedRegion: (regionId: string) => void;
    nextStep: () => void;
    selectedTravelType: TravelTypeCard | null;
}

// Added a comment to trigger re-compilation
export default function RegionSelection({
    selectedRegion,
    setSelectedRegion,
    nextStep,
    selectedTravelType,
}: RegionSelectionProps) {
    const { t } = useTranslation('common');

    const filteredRegions = selectedTravelType
        ? allRegions.filter((region) => travelTypeRegions[selectedTravelType.id]?.includes(region.category))
        : allRegions;

    const gyeonggiHotspotCities = ['goyang', 'yongin', 'gapyeong', 'paju', 'gwacheon', 'gwangju'];

    const displayRegions =
        selectedTravelType?.id === 2
            ? allRegions.filter((region) => gyeonggiHotspotCities.includes(region.id))
            : selectedTravelType?.id === 3
            ? allRegions.filter((region) =>
                  ['seoul_full', 'seoul_suburban', ...gyeonggiHotspotCities].includes(region.id)
              )
            : filteredRegions;

    return (
        <>
            <div className="p-4">
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">{t('schedule.regionSelection.title')}</h2>
                    <p className="text-gray-600 text-sm">{t('schedule.regionSelection.subtitle')}</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-8">
                    {displayRegions.map((region) => (
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

            <div className="bottom-0 left-0 right-0 p-4 ">
                <Button
                    onClick={nextStep}
                    disabled={!selectedRegion}
                    className={`w-full h-14 text-lg font-semibold
              ${
                  !selectedRegion
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-500 hover:bg-blue-600 text-white'
              }
              `}
                >
                    {t('schedule.common.nextButton')}
                </Button>
            </div>
        </>
    );
}
