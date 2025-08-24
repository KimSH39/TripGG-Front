'use client';

import { useEffect } from 'react';
import BottomNavigation from '@/components/bottom-navigation';
import { useRegionStore } from '@/store/regionStore'; // zustand 예시

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const setRegion = useRegionStore((state) => state.setRegion);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (pos) => {
                const { latitude, longitude } = pos.coords;
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
            <BottomNavigation />
        </div>
    );
}
