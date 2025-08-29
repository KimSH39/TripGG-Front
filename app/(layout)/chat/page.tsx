'use client';

import { useState, useRef, MouseEvent, ChangeEvent } from 'react';
import { Send, Paperclip } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRegionStore } from '@/store/regionStore';

export default function ChatPage() {
    const regionId = useRegionStore((state) => state.regionId); // 전역에서 지역 가져오기
    const [message, setMessage] = useState('');

    // 샘플 메시지 데이터 (실제에선 서버에서 regionId 기반 메시지 fetch)
    const messages = [
        {
            id: 1,
            sender: '홍길동',
            message: '안녕하세요! 이 지역분 계신가요?',
            time: '오전 10:10',
            isMine: false,
        },
        {
            id: 2,
            sender: '나',
            message: '네! 반가워요 🙌',
            time: '오전 10:12',
            isMine: true,
        },
    ];

    const handleSendMessage = () => {
        if (message.trim()) {
            console.log(`[${regionId}] 메시지 전송:`, message);
            setMessage('');
        }
    };
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Correct type for the event parameter
    const handleAttachFile = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault(); // Prevents form submission if the button is inside a form
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    // Correct type for the change event
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            // 여기에 파일을 처리하는 로직을 추가합니다.
            console.log('선택된 파일:', selectedFile);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-white">
            {/* 헤더 */}
            <div className="bg-white p-4">
                <div className="text-center">
                    <h2 className="font-semibold text-gray-800">
                        {regionId ? `${regionId} 지역 채팅방` : '지역 채팅방'}
                    </h2>
                    <p className="text-xs text-gray-500">실시간 지역 대화</p>
                </div>
            </div>

            {/* 채팅창 */}
            <div className="flex-1 p-4">
                <div className="space-y-4 overflow-y-auto mb-32">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex items-end ${msg.isMine ? 'justify-end' : 'justify-start'}`}>
                            {/* 상대방 메시지 */}
                            {!msg.isMine && (
                                <div className="flex items-end">
                                    <img src={'/tripgg-icon.png'} alt={msg.sender} className="h-8 w-8 rounded-full mr-2" />
                                    <div className="flex items-end">
                                        <div
                                            className={`px-4 py-2 rounded-2xl max-w-xs lg:max-w-md break-words bg-gray-100 text-gray-800`}
                                        >
                                            {msg.message}
                                        </div>
                                        <span className={`text-xs mt-1 text-gray-500`}>{msg.time}</span>
                                    </div>
                                </div>
                            )}

                            {/* 내 메시지 */}
                            {msg.isMine && (
                                <div className="flex items-end">
                                    <span className={`text-xs text-gray-500 mr-2`}>{msg.time}</span>
                                    <div
                                        className={`px-4 py-2 rounded-2xl max-w-xs lg:max-w-md break-words bg-blue-500 text-white`}
                                    >
                                        {msg.message}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* 입력바 */}
            <div className="fixed bottom-16 left-0 w-full bg-white border-t border-gray-200 p-4">
                <div className="flex items-center space-x-2">
                    <div className="flex-1 flex items-center bg-gray-100 rounded-full px-4 py-2">
                        <Input
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="메시지를 입력하세요."
                            className="border-0 bg-transparent focus:ring-0 text-sm"
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        />

                        {/* 파일 첨부 버튼과 숨겨진 파일 입력 필드 */}
                        <button onClick={handleAttachFile} className="text-gray-500 ml-2">
                            <Paperclip className="h-5 w-5" />
                        </button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            style={{ display: 'none' }} // 화면에 보이지 않도록 숨김
                        />
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
