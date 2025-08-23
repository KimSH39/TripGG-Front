'use client';

import { useState } from 'react';
import { Search, MoreVertical, Send, Camera, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ChatPage() {
    const [selectedChat, setSelectedChat] = useState<number | null>(null);
    const [message, setMessage] = useState('');

    // Sample chat data
    const chats = [
        {
            id: 1,
            name: '동해안 여행 모임',
            lastMessage: '내일 강릉에서 만나요!',
            time: '오후 2:30',
            unread: 3,
            avatar: '/group-chat-avatar.png',
            isGroup: true,
        },
        {
            id: 2,
            name: '김민수',
            lastMessage: '사진 정말 예쁘게 나왔네요 👍',
            time: '오후 1:15',
            unread: 0,
            avatar: '/male-profile-avatar.png',
            isGroup: false,
        },
        {
            id: 3,
            name: '속초 맛집 정보방',
            lastMessage: '여기 회 진짜 맛있어요!',
            time: '오전 11:45',
            unread: 7,
            avatar: '/food-group-chat.png',
            isGroup: true,
        },
        {
            id: 4,
            name: '이지은',
            lastMessage: '일정 확인했어요~',
            time: '오전 9:20',
            unread: 0,
            avatar: '/female-profile-avatar.png',
            isGroup: false,
        },
    ];

    const messages = [
        {
            id: 1,
            sender: '김민수',
            message: '안녕하세요! 내일 여행 일정 확인차 연락드려요',
            time: '오후 1:10',
            isMine: false,
        },
        {
            id: 2,
            sender: '나',
            message: '네! 강릉역에서 10시에 만나는 거 맞죠?',
            time: '오후 1:12',
            isMine: true,
        },
        {
            id: 3,
            sender: '김민수',
            message: '맞습니다! 그리고 점심은 초당순두부로 가려고 하는데 어떠세요?',
            time: '오후 1:13',
            isMine: false,
        },
        {
            id: 4,
            sender: '나',
            message: '좋아요! 사진도 많이 찍어야겠네요 📸',
            time: '오후 1:15',
            isMine: true,
        },
    ];

    const handleSendMessage = () => {
        if (message.trim()) {
            console.log('[v0] Sending message:', message);
            setMessage('');
        }
    };

    if (selectedChat) {
        const chat = chats.find((c) => c.id === selectedChat);

        return (
            <div className="min-h-screen bg-gray-50 pb-20 flex flex-col">
                {/* Chat Header */}
                <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <button onClick={() => setSelectedChat(null)} className="text-blue-500 font-medium">
                            ← 뒤로
                        </button>
                        <img
                            src={chat?.avatar || '/placeholder.svg'}
                            alt={chat?.name}
                            className="w-8 h-8 rounded-full"
                        />
                        <div>
                            <h2 className="font-semibold text-gray-800">{chat?.name}</h2>
                            {chat?.isGroup && <p className="text-xs text-gray-500">멤버 5명</p>}
                        </div>
                    </div>
                    <button className="text-gray-500">
                        <MoreVertical className="h-5 w-5" />
                    </button>
                </div>

                {/* Messages */}
                <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.isMine ? 'justify-end' : 'justify-start'}`}>
                            <div
                                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                                    msg.isMine
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-white text-gray-800 border border-gray-200'
                                }`}
                            >
                                <p className="text-sm">{msg.message}</p>
                                <p className={`text-xs mt-1 ${msg.isMine ? 'text-blue-100' : 'text-gray-500'}`}>
                                    {msg.time}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Message Input */}
                <div className="bg-white border-t border-gray-200 p-4">
                    <div className="flex items-center space-x-2">
                        <button className="text-gray-500 p-2">
                            <Camera className="h-5 w-5" />
                        </button>
                        <div className="flex-1 flex items-center bg-gray-100 rounded-full px-4 py-2">
                            <Input
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="메시지를 입력하세요..."
                                className="border-0 bg-transparent focus:ring-0 text-sm"
                                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                            />
                            <button className="text-gray-500 ml-2">
                                <Mic className="h-5 w-5" />
                            </button>
                        </div>
                        <Button
                            onClick={handleSendMessage}
                            size="sm"
                            className="bg-blue-500 hover:bg-blue-600 rounded-full px-4"
                        >
                            <Send className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 p-4">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-xl font-bold text-gray-800">채팅</h1>
                    <button className="text-gray-500">
                        <MoreVertical className="h-5 w-5" />
                    </button>
                </div>

                {/* Search */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                        placeholder="채팅방 검색"
                        className="pl-10 bg-gray-100 border-0 focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            {/* Chat List */}
            <div className="divide-y divide-gray-100">
                {chats.map((chat) => (
                    <button
                        key={chat.id}
                        onClick={() => setSelectedChat(chat.id)}
                        className="w-full p-4 flex items-center space-x-3 hover:bg-gray-50 transition-colors text-left"
                    >
                        <div className="relative">
                            <img
                                src={chat.avatar || '/placeholder.svg'}
                                alt={chat.name}
                                className="w-12 h-12 rounded-full"
                            />
                            {chat.unread > 0 && (
                                <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    {chat.unread}
                                </div>
                            )}
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                                <h3 className="font-semibold text-gray-800 truncate">{chat.name}</h3>
                                <span className="text-xs text-gray-500">{chat.time}</span>
                            </div>
                            <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
