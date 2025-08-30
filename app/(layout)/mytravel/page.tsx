'use client';

import { useState, useEffect } from 'react';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { getPlans, TravelPlan } from '@/lib/mockApi';
import { useTranslation } from 'react-i18next'; // Import useTranslation

export default function MyTravelPage({ params: { lang } }: { params: { lang: string } }) {
    const { t } = useTranslation(); // Initialize useTranslation
    const [currentView, setCurrentView] = useState('profile'); // profile, schedule, shorts
    const router = useRouter();
    const [mySchedules, setMySchedules] = useState<any[]>([]);

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const storedPlans = await getPlans();
                setMySchedules(
                    storedPlans.map((plan: TravelPlan) => ({
                        id: plan.id,
                        title: plan.title,
                        date: `${format(new Date(plan.startDate), 'yyyy.MM.dd')} - ${format(
                            new Date(plan.endDate),
                            'yyyy.MM.dd'
                        )}`,
                        places: plan.places.map((p) => p.name), // Extract place names
                        status: 'completed', // Using a key for i18n
                    }))
                );
            } catch (error) {
                console.error('Error loading plans from mock API', error);
                setMySchedules([]); // Fallback to empty array on error
            }
        };
        fetchPlans();
    }, []);

    const user = {
        name: '김지현',
        email: 'travel@example.com',
        avatar: '/placeholder.svg?height=80&width=80&text=김지현',
    };

    const myShorts = [
        {
            id: 1,
            title: '강릉 경포대 일출',
            views: '1.2만',
            likes: '234',
            date: '2024.03.16',
            thumbnail: '/placeholder.svg?height=120&width=80&text=일출',
        },
        {
            id: 2,
            title: '속초 맛집 투어',
            views: '8,543',
            likes: '156',
            date: '2024.02.28',
            thumbnail: '/placeholder.svg?height=120&width=80&text=맛집',
        },
        {
            id: 3,
            title: '설악산 단풍',
            views: '2.1만',
            likes: '445',
            date: '2024.02.20',
            thumbnail: '/placeholder.svg?height=120&width=80&text=단풍',
        },
    ];

    const ProfileView = () => (
        <div className="min-h-screen bg-white pb-20">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <h1 className="text-lg font-semibold text-gray-800">{t('myPage')}</h1>
                <div className="flex space-x-2">
                    <button className="w-6 h-6 text-gray-400">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                    </button>
                    <button className="w-6 h-6 text-gray-400">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Profile Section */}
            <div className="p-6 text-center">
                <div className="relative inline-block mb-4">
                    <img
                        src={user.avatar || '/placeholder.svg'}
                        alt={user.name}
                        className="w-20 h-20 rounded-full mx-auto"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                        </svg>
                    </div>
                </div>
                <h2 className="text-lg font-semibold text-gray-800 mb-1">{user.name}</h2>
                <p className="text-sm text-gray-500">{t('lovesTraveling')}</p>
            </div>

            {/* Menu Items */}
            <div className="px-4 space-y-1">
                <div className="text-xs text-gray-500 px-3 py-2 font-medium">{t('travel')}</div>

                <button
                    onClick={() => setCurrentView('schedule')}
                    className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg"
                >
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                            <svg className="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
                            </svg>
                        </div>
                        <span className="text-gray-800 font-medium">{t('mySchedules')}</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>

                <button
                    onClick={() => setCurrentView('shorts')}
                    className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg"
                >
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                            <svg className="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </div>
                        <span className="text-gray-800 font-medium">{t('manageMyShorts')}</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>

                <div className="text-xs text-gray-500 px-3 py-2 font-medium mt-6">{t('others')}</div>

                <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                            <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.59L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
                            </svg>
                        </div>
                        <span className="text-gray-800 font-medium">{t('logout')}</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
            </div>
        </div>
    );

    const ScheduleView = () => {
        const router = useRouter();
        return (
            <div className="min-h-screen bg-white pb-20">
                {/* Header */}
                <div className="flex items-center p-4 border-b border-gray-100">
                    <button onClick={() => setCurrentView('profile')} className="mr-3">
                        <ArrowLeft className="w-6 h-6 text-gray-600" />
                    </button>
                    <h1 className="text-lg font-semibold text-gray-800">{t('mySchedules')}</h1>
                    <div className="ml-auto text-sm text-blue-500">{t('edit')}</div>
                </div>

                {/* Schedule List */}
                <div className="p-4 space-y-4">
                    {mySchedules.map((schedule) => (
                        <button
                            key={schedule.id}
                            onClick={() => router.push(`/myplan/${schedule.id}`)}
                            className="w-full text-left bg-white border border-gray-200 rounded-lg p-4"
                        >
                            <div className="flex items-start justify-between mb-2">
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-800 mb-1">{schedule.title}</h3>
                                    <p className="text-sm text-gray-500 mb-2">{schedule.date}</p>
                                    <div className="flex flex-wrap gap-1 mb-2">
                                        {schedule.places.map((place: string, index: number) => (
                                            <span
                                                key={index}
                                                className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded"
                                            >
                                                {place}
                                            </span>
                                        ))}
                                    </div>
                                    <span
                                        className={`text-xs px-2 py-1 rounded ${
                                            schedule.status === 'completed' // Use i18n key
                                                ? 'bg-green-50 text-green-600'
                                                : 'bg-orange-50 text-orange-600'
                                        }`}
                                    >
                                        {t(schedule.status)}
                                    </span>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        );
    };

    const ShortsView = () => (
        <div className="min-h-screen bg-white pb-20">
            {/* Header */}
            <div className="flex items-center p-4 border-b border-gray-100">
                <button onClick={() => setCurrentView('profile')} className="mr-3">
                    <ArrowLeft className="w-6 h-6 text-gray-600" />
                </button>
                <h1 className="text-lg font-semibold text-gray-800">{t('manageMyShorts')}</h1>
                <div className="ml-auto text-sm text-blue-500">{t('edit')}</div>
            </div>

            {/* Shorts List */}
            <div className="p-4 space-y-4">
                {myShorts.map((short) => (
                    <div key={short.id} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                        <img
                            src={short.thumbnail || '/placeholder.svg'}
                            alt={short.title}
                            className="w-16 h-20 object-cover rounded-lg bg-gray-100"
                        />
                        <div className="flex-1">
                            <h3 className="font-medium text-gray-800 mb-1">{short.title}</h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-1">
                                <span>
                                    {t('views')} {short.views}
                                </span>
                                <span>
                                    {t('likes')} {short.likes}
                                </span>
                            </div>
                            <p className="text-xs text-gray-400">{short.date}</p>
                        </div>
                        <button className="text-gray-400">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                            </svg>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );

    if (currentView === 'schedule') {
        return <ScheduleView />;
    }

    if (currentView === 'shorts') {
        return <ShortsView />;
    }

    return <ProfileView />;
}
