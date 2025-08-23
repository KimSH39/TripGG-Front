'use client';

import { useState } from 'react';
import { MapPin, Navigation, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import BottomNavigation from '@/components/bottom-navigation';

export default function MapPage() {
    const [selectedLocation, setSelectedLocation] = useState(null);

    const locations = [
        { id: 1, name: '강릉 경포대', lat: 37.7956, lng: 128.8962, category: '관광지' },
        { id: 2, name: '초당순두부마을', lat: 37.7654, lng: 128.8789, category: '맛집' },
        { id: 3, name: '속초 설악산', lat: 38.1197, lng: 128.4656, category: '관광지' },
        { id: 4, name: '양양 낙산사', lat: 38.1234, lng: 128.6234, category: '관광지' },
        { id: 5, name: '정동진 해변', lat: 37.6889, lng: 129.0342, category: '관광지' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 pb-20 relative">
            {/* Header */}
            <div className="bg-blue-500 text-white p-4 relative z-10">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-bold">지도</h1>
                    <div className="flex space-x-2">
                        <Button variant="ghost" size="sm" className="text-white">
                            <Search className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-white">
                            <Filter className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Map Container */}
            <div className="relative h-96 bg-blue-100">
                {/* Mock Map Background */}
                <img
                    src="/placeholder.svg?height=400&width=400"
                    alt="동해안 지도"
                    className="w-full h-full object-cover"
                />

                {/* Location Pins */}
                <div className="absolute inset-0">
                    {locations.map((location, index) => (
                        <div
                            key={location.id}
                            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                            style={{
                                left: `${20 + index * 15}%`,
                                top: `${30 + (index % 2) * 20}%`,
                            }}
                            onClick={() => setSelectedLocation(location)}
                        >
                            <div className="relative">
                                <MapPin className="h-8 w-8 text-red-500 drop-shadow-lg" />
                                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded text-xs font-medium shadow-lg whitespace-nowrap">
                                    {location.name}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Current Location Button */}
                <Button
                    className="absolute bottom-4 right-4 rounded-full w-12 h-12 bg-white text-blue-500 shadow-lg hover:bg-gray-50"
                    size="sm"
                >
                    <Navigation className="h-5 w-5" />
                </Button>
            </div>

            {/* Location List */}
            <div className="p-4 space-y-3">
                <h2 className="text-lg font-bold">주변 명소</h2>

                {locations.map((location) => (
                    <Card
                        key={location.id}
                        className={`cursor-pointer transition-all ${
                            selectedLocation?.id === location.id ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:shadow-md'
                        }`}
                        onClick={() => setSelectedLocation(location)}
                    >
                        <CardContent className="p-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <MapPin className="h-5 w-5 text-red-500" />
                                    <div>
                                        <h3 className="font-medium">{location.name}</h3>
                                        <p className="text-sm text-gray-500">{location.category}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-blue-600 font-medium">2.3km</p>
                                    <p className="text-xs text-gray-500">도보 28분</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Route Planning */}
            <div className="p-4">
                <Card className="bg-gradient-to-r from-green-400 to-green-500 text-white">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-bold">추천 여행 코스</h3>
                                <p className="text-sm opacity-90">동해안 1일 코스</p>
                            </div>
                            <Button variant="secondary" size="sm">
                                보기
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <BottomNavigation currentTab="map" />
        </div>
    );
}
