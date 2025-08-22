"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import BottomNavigation from "@/components/bottom-navigation"

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())

  const monthNames = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"]

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day)
    }

    return days
  }

  const navigateMonth = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate)
    if (direction === "prev") {
      newDate.setMonth(newDate.getMonth() - 1)
    } else {
      newDate.setMonth(newDate.getMonth() + 1)
    }
    setCurrentDate(newDate)
  }

  const selectDate = (day: number) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    setSelectedDate(newDate)
  }

  const isToday = (day: number) => {
    const today = new Date()
    return (
      today.getDate() === day &&
      today.getMonth() === currentDate.getMonth() &&
      today.getFullYear() === currentDate.getFullYear()
    )
  }

  const isSelected = (day: number) => {
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentDate.getMonth() &&
      selectedDate.getFullYear() === currentDate.getFullYear()
    )
  }

  const hasEvent = (day: number) => {
    // Mock events for demonstration
    return [5, 12, 18, 25].includes(day)
  }

  const days = getDaysInMonth(currentDate)

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-blue-500 text-white p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">일정 관리</h1>
          <Button variant="ghost" size="sm" className="text-white">
            <Plus className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Calendar */}
      <div className="p-4">
        <Card>
          <CardContent className="p-4">
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-4">
              <Button variant="ghost" size="sm" onClick={() => navigateMonth("prev")}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h2 className="text-lg font-bold">
                {currentDate.getFullYear()}년 {monthNames[currentDate.getMonth()]}
              </h2>
              <Button variant="ghost" size="sm" onClick={() => navigateMonth("next")}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Days of Week */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
                <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-1">
              {days.map((day, index) => (
                <div key={index} className="aspect-square">
                  {day && (
                    <button
                      onClick={() => selectDate(day)}
                      className={`w-full h-full flex items-center justify-center text-sm relative rounded-lg transition-colors ${
                        isSelected(day)
                          ? "bg-blue-500 text-white"
                          : isToday(day)
                            ? "bg-blue-100 text-blue-600 font-medium"
                            : "hover:bg-gray-100"
                      }`}
                    >
                      {day}
                      {hasEvent(day) && (
                        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-red-500 rounded-full"></div>
                      )}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Selected Date Events */}
        <div className="mt-4">
          <h3 className="text-lg font-bold mb-3">
            {selectedDate.getMonth() + 1}월 {selectedDate.getDate()}일 일정
          </h3>

          {hasEvent(selectedDate.getDate()) ? (
            <div className="space-y-2">
              <Card>
                <CardContent className="p-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div>
                      <p className="font-medium">강릉 경포대 방문</p>
                      <p className="text-sm text-gray-500">오전 10:00 - 오후 2:00</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="font-medium">초당순두부 맛집</p>
                      <p className="text-sm text-gray-500">오후 12:30</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardContent className="p-4 text-center text-gray-500">
                <p>등록된 일정이 없습니다.</p>
                <Button className="mt-2" size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  일정 추가
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <BottomNavigation currentTab="calendar" />
    </div>
  )
}
