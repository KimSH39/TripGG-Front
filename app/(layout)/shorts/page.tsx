'use client';

import { useState } from 'react';
import { Heart, MessageCircle, Share, Play, Pause } from 'lucide-react';

export default function ShortsPage() {
    const [currentVideo, setCurrentVideo] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);

    // Sample shorts data
    const shorts = [
        {
            id: 1,
            title: '강릉 커피거리 브이로그 ☕️',
            author: '여행러버',
            likes: 1234,
            comments: 89,
            thumbnail: '/gangneung-coffee-street-cafe.png',
            duration: '0:45',
        },
        {
            id: 2,
            title: '속초 해변 일출 타임랩스 🌅',
            author: '동해안여행',
            likes: 2156,
            comments: 156,
            thumbnail: '/sokcho-beach-sunrise.png',
            duration: '1:20',
        },
        {
            id: 3,
            title: '정동진 기차역 감성샷 📸',
            author: '감성여행자',
            likes: 987,
            comments: 67,
            thumbnail: '/placeholder-6xrh9.png',
            duration: '0:38',
        },
    ];

    const handleLike = (videoId: number) => {
        // Handle like functionality
        console.log('[v0] Liked video:', videoId);
    };

    const handleComment = (videoId: number) => {
        // Handle comment functionality
        console.log('[v0] Comment on video:', videoId);
    };

    const handleShare = (videoId: number) => {
        // Handle share functionality
        console.log('[v0] Share video:', videoId);
    };

    return (
        <div className="min-h-screen bg-black pb-20 relative overflow-hidden">
            {/* Video Container */}
            <div className="relative h-screen">
                {shorts.map((short, index) => (
                    <div
                        key={short.id}
                        className={`absolute inset-0 transition-transform duration-300 ${
                            index === currentVideo
                                ? 'translate-y-0'
                                : index < currentVideo
                                ? '-translate-y-full'
                                : 'translate-y-full'
                        }`}
                    >
                        {/* Video/Image */}
                        <div className="relative w-full h-full">
                            <img
                                src={short.thumbnail || '/placeholder.svg'}
                                alt={short.title}
                                className="w-full h-full object-cover"
                            />

                            {/* Play/Pause Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <button
                                    onClick={() => setIsPlaying(!isPlaying)}
                                    className="bg-black bg-opacity-50 rounded-full p-4 text-white opacity-0 hover:opacity-100 transition-opacity"
                                >
                                    {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
                                </button>
                            </div>

                            {/* Duration */}
                            <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                                {short.duration}
                            </div>
                        </div>

                        {/* Content Overlay */}
                        <div className="absolute bottom-20 left-0 right-0 p-4 text-white">
                            <div className="flex justify-between items-end">
                                {/* Video Info */}
                                <div className="flex-1 mr-4">
                                    <h3 className="text-lg font-semibold mb-2 leading-tight">{short.title}</h3>
                                    <p className="text-sm text-gray-300 mb-3">@{short.author}</p>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col items-center space-y-4">
                                    <button
                                        onClick={() => handleLike(short.id)}
                                        className="flex flex-col items-center space-y-1 text-white hover:text-red-400 transition-colors"
                                    >
                                        <div className="bg-gray-800 bg-opacity-70 rounded-full p-3">
                                            <Heart className="h-6 w-6" />
                                        </div>
                                        <span className="text-xs">{short.likes}</span>
                                    </button>

                                    <button
                                        onClick={() => handleComment(short.id)}
                                        className="flex flex-col items-center space-y-1 text-white hover:text-blue-400 transition-colors"
                                    >
                                        <div className="bg-gray-800 bg-opacity-70 rounded-full p-3">
                                            <MessageCircle className="h-6 w-6" />
                                        </div>
                                        <span className="text-xs">{short.comments}</span>
                                    </button>

                                    <button
                                        onClick={() => handleShare(short.id)}
                                        className="flex flex-col items-center space-y-1 text-white hover:text-green-400 transition-colors"
                                    >
                                        <div className="bg-gray-800 bg-opacity-70 rounded-full p-3">
                                            <Share className="h-6 w-6" />
                                        </div>
                                        <span className="text-xs">공유</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Dots */}
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 space-y-2">
                {shorts.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentVideo(index)}
                        className={`w-2 h-8 rounded-full transition-colors ${
                            index === currentVideo ? 'bg-white' : 'bg-gray-500'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}
