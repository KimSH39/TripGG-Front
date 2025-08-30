'use client';

import { useRouter, usePathname } from 'next/navigation';
import { Home, Calendar, Video, MessageCircle, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function BottomNavigation() {
    const router = useRouter();
    const pathname = usePathname();
    const { t, i18n } = useTranslation();

    const tabs = [
        { id: 'home', label: t('navigation.home'), icon: Home, path: '/home' },
        { id: 'schedule', label: t('navigation.schedule'), icon: Calendar, path: '/schedule' },
        { id: 'shorts', label: t('navigation.shorts'), icon: Video, path: '/shorts' },
        { id: 'chat', label: t('navigation.chat'), icon: MessageCircle, path: '/chat' },
        { id: 'mytravel', label: t('navigation.mytravel'), icon: User, path: '/mytravel' },
    ];

    const handleTabClick = (path: string) => {
        router.push(path);
    };

    // 현재 pathname을 기반으로 활성 탭을 결정합니다.
    // 'home'이 기본값이며, pathname이 tab.path로 시작하면 해당 탭을 활성화합니다.
    const activeTab =
        tabs.find((tab) => {
            if (tab.id === 'mytravel') {
                return pathname.startsWith(tab.path) || pathname.startsWith('/myplan');
            }
            return pathname.startsWith(tab.path);
        })?.id || 'home';

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 max-w-3xl mx-auto">
            <div className="flex justify-around px-4 py-1">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;

                    return (
                        <button
                            key={tab.id}
                            onClick={() => handleTabClick(tab.path)}
                            className={`flex flex-col items-center space-y-1 py-1 px-3 rounded-lg transition-colors ${
                                isActive ? 'text-blue-500 bg-blue-50' : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            <Icon className="h-5 w-5" />
                            <span className="text-xs font-medium">{i18n.isInitialized ? tab.label : ''}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
