'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

interface KeywordSelectionProps {
    selectedKeywords: string[];
    setSelectedKeywords: (keywords: string[]) => void;
    nextStep: () => void;
}

export default function KeywordSelection({
    selectedKeywords,
    setSelectedKeywords,
    nextStep,
}: KeywordSelectionProps) {
    const { t } = useTranslation();
    
    const keywords = [
        { id: 'kpop', name: t('keywords.kpop'), icon: '🎵' },
        { id: 'history', name: t('keywords.history'), icon: '🏛️' },
        { id: 'squidgame', name: t('keywords.squidgame'), icon: '🦑' },
        { id: 'kpopdemons', name: t('keywords.kpopdemons'), icon: '👹' },
        { id: 'koreanfood', name: t('keywords.koreanfood'), icon: '🍜' },
        { id: 'koreanwave', name: t('keywords.koreanwave'), icon: '🌊' },
        { id: 'koreanbeauty', name: t('keywords.koreanbeauty'), icon: '💄' },
        { id: 'koreandrama', name: t('keywords.koreandrama'), icon: '📺' },
    ];

    const handleKeywordClick = (keywordId: string) => {
        if (selectedKeywords.includes(keywordId)) {
            setSelectedKeywords(selectedKeywords.filter(id => id !== keywordId));
        } else {
            setSelectedKeywords([...selectedKeywords, keywordId]);
        }
    };

    return (
        <div className="p-4 pb-24">
            <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-2">{t('keywords.title')}</h2>
                <p className="text-gray-600 text-sm">{t('keywords.subtitle')}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-8">
                {keywords.map((keyword) => (
                    <button
                        key={keyword.id}
                        onClick={() => handleKeywordClick(keyword.id)}
                        className={`p-4 rounded-lg border-2 transition-all ${
                            selectedKeywords.includes(keyword.id)
                                ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500'
                                : 'border-gray-200 hover:border-gray-300 bg-white'
                        }`}
                    >
                        <div className="text-center">
                            <div className="text-2xl mb-2">{keyword.icon}</div>
                            <div className="text-sm font-medium text-gray-800">{keyword.name}</div>
                        </div>
                    </button>
                ))}
            </div>

            <Button
                onClick={nextStep}
                disabled={selectedKeywords.length === 0}
                className={`w-full h-14 mt-6 text-lg font-semibold ${
                    selectedKeywords.length === 0
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
            >
                {t('keywords.nextStep')}
            </Button>
        </div>
    );
}
