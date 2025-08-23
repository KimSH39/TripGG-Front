// src/components/schedule/CompanionSelection.tsx
'use client';

import { Button } from '@/components/ui/button';

interface CompanionSelectionProps {
    selectedCompanion: string;
    setSelectedCompanion: (companion: string) => void;
    companions: { id: string; name: string; icon: string; desc: string }[];
    nextStep: () => void;
}

export default function CompanionSelection({
    selectedCompanion,
    setSelectedCompanion,
    companions,
    nextStep,
}: CompanionSelectionProps) {
    return (
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
}
