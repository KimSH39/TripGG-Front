'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SplashPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const handleStartClick = () => {
        router.push('/home');
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0047AB] to-[#4169E1] flex flex-col items-center justify-center text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-70">
                <img src="/Trippgg-background.png" alt="Tripgg 배경" className="w-full h-full object-cover blur-sm" />
            </div>

            <div className="relative z-10 text-center px-8 mt-[-35vh]">
                {' '}
                <div className="mb-8">
                    <p className="text-lg font-xs mb-3">Road to Find My life</p>
                    <img src="/tripgg-logo.svg" alt="TripGG 로고" className="h-25 mx-auto mb-3" />
                    <p className="text-sm opacity-80">v 1.0.0</p>
                </div>
                {isLoading && (
                    <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                    </div>
                )}
            </div>

            <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2">
                <button onClick={handleStartClick} className="flex items-center">
                    <img src="kakao_login_medium_wide.png" alt="카카오로 로그인" />
                </button>
            </div>

            {/* Image Source Text */}
            <div className="absolute bottom-4 text-xs opacity-60">
                이미지 출처: 경기관광공사 포토갤러리 포천 평강랜드
            </div>
        </div>
    );
}
