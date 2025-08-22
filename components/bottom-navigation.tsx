'use client';

import { useRouter } from 'next/navigation';
import { Home, Calendar, Video, MessageCircle, User } from 'lucide-react';

interface BottomNavigationProps {
    currentTab: string;
}

export default function BottomNavigation({ currentTab }: BottomNavigationProps) {
    const router = useRouter();

    const tabs = [
        { id: 'home', label: '홈', icon: Home, path: '/home' },
        { id: 'schedule', label: '일정', icon: Calendar, path: '/schedule' },
        { id: 'shorts', label: '쇼츠', icon: Video, path: '/shorts' },
        { id: 'chat', label: '채팅', icon: MessageCircle, path: '/chat' },
        { id: 'mytravel', label: '나의여행', icon: User, path: '/mytravel' },
    ];

    const handleTabClick = (path: string) => {
        router.push(path);
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-2">
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50 max-w-3xl mx-auto px-4 py-2">
                <div className="flex justify-around">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = currentTab === tab.id;

                        return (
                            <button
                                key={tab.id}
                                onClick={() => handleTabClick(tab.path)}
                                className={`flex flex-col items-center space-y-1 py-2 px-3 rounded-lg transition-colors ${
                                    isActive ? 'text-blue-500 bg-blue-50' : 'text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                <Icon className="h-5 w-5" />
                                <span className="text-xs font-medium">{tab.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
