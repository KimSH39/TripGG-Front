'use client';

import { Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function HomePage() {
    // 이미지에 나온 일정 데이터를 기반으로 한 예시 데이터입니다.
    const scheduleItems = [
        {
            name: '경기 의왕 레일파크',
            location: '경기 의왕시 월암동 525-9',
            time: '오전 10:00 - 오전 11:30',
            image: 'https://placehold.co/100x100/e2e8f0/334155?text=레일파크',
        },
        {
            name: '정통밥집',
            location: '경기 의왕시 왕송못동로 207-13',
            time: '오후 12:00 - 오후 14:00',
            image: 'https://placehold.co/100x100/e2e8f0/334155?text=밥집',
        },
        {
            name: '의왕 조류 생태 과학관',
            location: '경기 의왕시 왕송못동로 209',
            time: '오후 15:00 - 오후 17:00',
            image: 'https://placehold.co/100x100/e2e8f0/334155?text=과학관',
        },
    ];
    // 일정이 없는 경우를 테스트하려면 위 배열을 빈 배열로 바꾸세요. -> const scheduleItems = []

    // 오늘 날짜를 "YYYY년 MM월 DD일" 형식으로 포맷팅합니다.
    const today = new Date();
    const formattedDate = `${today.getFullYear()}년 ${String(today.getMonth() + 1).padStart(2, '0')}월 ${String(
        today.getDate()
    ).padStart(2, '0')}일`;

    return (
        // 전체 페이지 배경색과 하단 패딩을 설정합니다.
        <div className="min-h-screen bg-slate-50">
            {/* 상단 배너 섹션 */}
            <div
                className="relative h-48 bg-cover bg-center text-white p-4 flex flex-col justify-end"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=2070&auto=format&fit=crop')",
                }}
            >
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="relative z-10">
                    <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-2 py-1 rounded-full">
                        핫 플레이스
                    </span>
                    <h2 className="text-xl font-bold mt-2">이번 여름,</h2>
                    <h2 className="text-xl font-bold">제주도로 떠나볼까요?</h2>
                    <p className="text-xs mt-1">텐트 설치 비용 제공 + 파라솔 무료 대여</p>
                </div>
            </div>

            {/* 메인 콘텐츠 영역 */}
            <div className="p-4">
                {/* 날짜 및 일정 안내 */}
                <div className="mb-6">
                    <p className="text-lg font-bold">{formattedDate},</p>
                    <p className="text-lg font-bold">오늘 일정을 알려 드릴게요!</p>
                </div>

                {/* 내 일정 섹션 */}
                <div>
                    <div className="flex justify-between items-center mb-3">
                        <h2 className="text-lg font-bold">내 일정</h2>
                        {scheduleItems.length > 0 && (
                            <button className="text-sm text-gray-500 hover:text-gray-800">더보기</button>
                        )}
                    </div>

                    {/* 조건부 렌더링: 일정이 있을 때와 없을 때 */}
                    {scheduleItems.length > 0 ? (
                        <div className="space-y-3">
                            {scheduleItems.map((item, index) => (
                                <Card key={index} className="hover:shadow-md transition-shadow bg-white rounded-xl">
                                    <CardContent className="p-3">
                                        <div className="flex items-center space-x-4">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-16 h-16 rounded-lg object-cover"
                                            />
                                            <div className="flex-1">
                                                <h3 className="font-bold text-md">{item.name}</h3>
                                                <div className="flex items-center text-xs text-gray-500 mt-1">
                                                    <MapPin className="h-3 w-3 mr-1.5" />
                                                    <p>{item.location}</p>
                                                </div>
                                                <div className="flex items-center text-xs text-gray-500 mt-1">
                                                    <Clock className="h-3 w-3 mr-1.5" />
                                                    <p>{item.time}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <Card className="bg-white rounded-xl">
                            <CardContent className="p-6 text-center">
                                <p className="text-gray-500 mb-4">일정이 없습니다!</p>
                                <Button className="bg-blue-500 hover:bg-blue-600 text-white">여행 계획 세우기</Button>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}
