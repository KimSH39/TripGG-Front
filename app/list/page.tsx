"use client"

import { useState } from "react"
import { Search, Star, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import BottomNavigation from "@/components/bottom-navigation"

export default function ListPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("전체")

  const categories = ["전체", "관광지", "맛집", "숙박", "체험"]

  const places = [
    {
      id: 1,
      name: "강릉 경포대",
      category: "관광지",
      rating: 4.5,
      distance: "12km",
      description: "아름다운 해변과 일출로 유명한 관광명소",
      image: "/gangneung-gyeongpodae-sunrise.png",
      tags: ["해변", "일출", "산책"],
    },
    {
      id: 2,
      name: "초당순두부마을",
      category: "맛집",
      rating: 4.7,
      distance: "8km",
      description: "강릉의 대표 맛집, 신선한 순두부 요리",
      image: "/placeholder-iuhpk.png",
      tags: ["순두부", "전통음식", "맛집"],
    },
    {
      id: 3,
      name: "속초 설악산",
      category: "관광지",
      rating: 4.8,
      distance: "45km",
      description: "웅장한 산세와 단풍으로 유명한 국립공원",
      image: "/placeholder-xk619.png",
      tags: ["등산", "자연", "단풍"],
    },
    {
      id: 4,
      name: "양양 낙산사",
      category: "관광지",
      rating: 4.4,
      distance: "28km",
      description: "바다가 보이는 아름다운 사찰",
      image: "/naksansa-temple-ocean-view.png",
      tags: ["사찰", "바다전망", "문화재"],
    },
    {
      id: 5,
      name: "강릉 커피거리",
      category: "맛집",
      rating: 4.3,
      distance: "15km",
      description: "다양한 카페가 모여있는 커피의 거리",
      image: "/gangneung-coffee-street.png",
      tags: ["커피", "카페", "디저트"],
    },
    {
      id: 6,
      name: "정동진 해변",
      category: "관광지",
      rating: 4.6,
      distance: "35km",
      description: "기차역과 바로 연결된 특별한 해변",
      image: "/placeholder.svg?height=120&width=120",
      tags: ["해변", "기차", "일출"],
    },
  ]

  const filteredPlaces = places.filter((place) => {
    const matchesSearch =
      place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "전체" || place.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-blue-500 text-white p-4">
        <h1 className="text-xl font-bold mb-3">여행지 목록</h1>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="여행지를 검색해보세요..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="p-4 bg-white border-b">
        <div className="flex space-x-2 overflow-x-auto">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="whitespace-nowrap"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Places List */}
      <div className="p-4 space-y-4">
        {filteredPlaces.map((place) => (
          <Card key={place.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-0">
              <div className="flex">
                <img
                  src={place.image || "/placeholder.svg"}
                  alt={place.name}
                  className="w-24 h-24 object-cover rounded-l-lg"
                />
                <div className="flex-1 p-3">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-bold text-lg">{place.name}</h3>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{place.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">{place.category}</span>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3 text-gray-400" />
                      <span className="text-xs text-gray-500">{place.distance}</span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-2">{place.description}</p>

                  <div className="flex flex-wrap gap-1">
                    {place.tags.map((tag, index) => (
                      <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPlaces.length === 0 && (
        <div className="p-8 text-center text-gray-500">
          <p>검색 결과가 없습니다.</p>
          <p className="text-sm mt-1">다른 키워드로 검색해보세요.</p>
        </div>
      )}

      <BottomNavigation currentTab="list" />
    </div>
  )
}
