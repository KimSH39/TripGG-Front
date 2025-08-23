'use client';

import { useState } from 'react';
import { Settings, Heart, MapPin, Calendar, Star, ChevronRight, Bell, HelpCircle, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function ProfilePage() {
    const [user] = useState({
        name: '김동해',
        email: 'donghaean@example.com',
        avatar: '/placeholder.svg?height=80&width=80',
        joinDate: '2024년 1월',
        visitedPlaces: 12,
        savedPlaces: 8,
        reviews: 5,
    });

    const menuItems = [
        { icon: Heart, label: '찜한 장소', count: user.savedPlaces, color: 'text-red-500' },
        { icon: MapPin, label: '방문한 장소', count: user.visitedPlaces, color: 'text-green-500' },
        { icon: Star, label: '내 리뷰', count: user.reviews, color: 'text-yellow-500' },
        { icon: Calendar, label: '여행 일정', count: 3, color: 'text-blue-500' },
    ];

    const settingsItems = [
        { icon: Bell, label: '알림 설정' },
        { icon: Settings, label: '앱 설정' },
        { icon: HelpCircle, label: '도움말' },
        { icon: LogOut, label: '로그아웃', color: 'text-red-500' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <div className="bg-blue-500 text-white p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-bold">프로필</h1>
                    <Button variant="ghost" size="sm" className="text-white">
                        <Settings className="h-5 w-5" />
                    </Button>
                </div>
            </div>

            {/* Profile Info */}
            <div className="p-4">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center space-x-4 mb-4">
                            <Avatar className="w-16 h-16">
                                <AvatarImage src={user.avatar || '/placeholder.svg'} alt={user.name} />
                                <AvatarFallback className="bg-blue-500 text-white text-xl">
                                    {user.name.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <h2 className="text-xl font-bold">{user.name}</h2>
                                <p className="text-gray-500">{user.email}</p>
                                <p className="text-sm text-gray-400">{user.joinDate} 가입</p>
                            </div>
                            <Button variant="outline" size="sm">
                                편집
                            </Button>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                            <div className="text-center">
                                <p className="text-2xl font-bold text-blue-500">{user.visitedPlaces}</p>
                                <p className="text-sm text-gray-500">방문한 곳</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-red-500">{user.savedPlaces}</p>
                                <p className="text-sm text-gray-500">찜한 곳</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-yellow-500">{user.reviews}</p>
                                <p className="text-sm text-gray-500">리뷰</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Menu Items */}
            <div className="px-4 space-y-3">
                {menuItems.map((item, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <item.icon className={`h-5 w-5 ${item.color}`} />
                                    <span className="font-medium">{item.label}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm text-gray-500">{item.count}</span>
                                    <ChevronRight className="h-4 w-4 text-gray-400" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Recent Activity */}
            <div className="p-4">
                <h3 className="text-lg font-bold mb-3">최근 활동</h3>
                <Card>
                    <CardContent className="p-4">
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                <div className="flex-1">
                                    <p className="text-sm">강릉 경포대를 방문했습니다</p>
                                    <p className="text-xs text-gray-500">2일 전</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                <div className="flex-1">
                                    <p className="text-sm">속초 설악산을 찜했습니다</p>
                                    <p className="text-xs text-gray-500">5일 전</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                <div className="flex-1">
                                    <p className="text-sm">초당순두부마을에 리뷰를 작성했습니다</p>
                                    <p className="text-xs text-gray-500">1주 전</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Settings */}
            <div className="px-4 space-y-2">
                {settingsItems.map((item, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <item.icon className={`h-5 w-5 ${item.color || 'text-gray-500'}`} />
                                    <span className={`font-medium ${item.color || ''}`}>{item.label}</span>
                                </div>
                                <ChevronRight className="h-4 w-4 text-gray-400" />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
