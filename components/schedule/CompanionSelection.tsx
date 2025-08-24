import { Button } from '@/components/ui/button';
import { companions as defaultCompanions, travelStyles as defaultTravelStyles } from '@/constants/travelData';
import { SVGProps } from 'react';

// 아이콘 컴포넌트의 타입 정의를 업데이트합니다.
// 이제 모든 아이콘 컴포넌트가 isSelected prop을 받도록 정의됩니다.
interface TravelItem {
    id: string;
    name: string;
    icon: (props: SVGProps<SVGSVGElement> & { isSelected: boolean }) => JSX.Element;
    desc: string;
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
    return (
        <div className="flex flex-col h-screen bg-white p-6">
            <div className="overflow-y-auto">
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">누구와 함께 떠나는 여행인가요?</h2>
                    <p className="text-gray-600 text-sm">타입 선택</p>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-8">
                    {companions.map((companion) => {
                        const isSelected = selectedCompanion === companion.id;

                        return (
                            <button
                                key={companion.id}
                                onClick={() => setSelectedCompanion(companion.id)}
                                className={`flex items-center p-2 rounded-lg border transition-colors text-left
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
                                    <div className="font-semibold text-sm text-gray-800">{companion.name}</div>
                                    <div className="text-xs text-gray-500">{companion.desc}</div>
                                </div>
                            </button>
                        );
                    })}
                </div>

                <div className="mb-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">어떤 여행을 기대하시나요?</h2>
                    <p className="text-gray-600 text-sm">선호하는 여행 스타일을 선택해 주세요</p>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-8">
                    {travelStyles.map((style) => (
                        <button
                            key={style.id}
                            onClick={() => setSelectedStyle(style.id)}
                            className={`flex items-center p-5 rounded-lg border transition-colors text-left
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
                                <div className="font-semibold text-sm text-gray-800">{style.name}</div>
                                <div className="text-xs text-gray-500">{style.desc}</div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            <div className="p-4 bg-white border-t border-gray-200">
                <Button
                    onClick={nextStep}
                    disabled={!selectedCompanion || !selectedStyle}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold h-12 rounded-lg"
                >
                    여행 타입 정하기
                </Button>
            </div>
        </div>
    );
}
