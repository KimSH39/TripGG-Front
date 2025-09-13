'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';

interface RegionTravelSelectionProps {
    selectedRegion: string;
    setSelectedRegion: (region: string) => void;
    nextStep: () => void;
}

export default function RegionTravelSelection({ selectedRegion, setSelectedRegion, nextStep }: RegionTravelSelectionProps) {
    const { t } = useTranslation();
    
    const regions = [
        {
            id: 'seoul-all',
            name: t('regions.seoul-all.name'),
            description: t('regions.seoul-all.description'),
            image: '/seoul-pic.png'
        },
        {
            id: 'seoul-gg',
            name: t('regions.seoul-gg.name'),
            description: t('regions.seoul-gg.description'),
            image: '/seoul-gg-pic.png'
        },
        {
            id: 'gg-popular',
            name: t('regions.gg-popular.name'),
            description: t('regions.gg-popular.description'),
            image: '/gg-pic.png'
        },
        {
            id: 'capital-area',
            name: t('regions.capital-area.name'),
            description: t('regions.capital-area.description'),
            image: '/Trippgg-background.png'
        }
    ];

    return (
        <div className="p-4 pb-24">
            <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-2">{t('regions.title')}</h2>
                <p className="text-gray-600 text-sm">{t('regions.subtitle')}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
                {regions.map((region) => (
                    <button
                        key={region.id}
                        onClick={() => setSelectedRegion(region.id)}
                        className={`relative rounded-lg overflow-hidden border-2 transition-all ${
                            selectedRegion === region.id
                                ? 'border-blue-500 ring-2 ring-blue-200'
                                : 'border-gray-200 hover:border-gray-300'
                        }`}
                    >
                        <div className="aspect-video relative w-full h-48">
                            <Image
                                src={region.image}
                                alt={region.name}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                                <h3 className="text-lg font-bold mb-1 text-white">{region.name}</h3>
                                <p className="text-sm text-white/90">{region.description}</p>
                            </div>
                        </div>
                    </button>
                ))}
            </div>

            <Button
                onClick={nextStep}
                disabled={!selectedRegion}
                className={`w-full h-14 text-lg font-semibold ${
                    !selectedRegion
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
            >
                {t('regions.nextStep')}
            </Button>
        </div>
    );
}
