'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import BottomNavigation from '@/components/layout/bottom-navigation';
import { useRegionStore } from '@/store/regionStore';
import { useUiStore } from '@/store/uiStore';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const setRegion = useRegionStore((state) => state.setRegion);
    const pathname = usePathname(); //
    const hideBottomNav = useUiStore((state) => state.hideBottomNav); //

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (pos) => {
                const { latitude, longitude } = pos.coords;
                console.log('현재 위치:', { latitude, longitude });
                // 백엔드에 좌표 전달 → 지역 ID 반환
                const res = await fetch('/api/location', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ latitude, longitude }),
                });
                const data = await res.json();
                setRegion(data.regionId); // 전역 상태에 저장
            });
        }
    }, [setRegion]);

    return (
        <div className="flex flex-col min-h-screen max-w-3xl mx-auto w-full">
            <div className="flex-1">{children}</div>
            {!hideBottomNav && <BottomNavigation />}
        </div>
    );
}
