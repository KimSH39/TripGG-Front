"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function SplashPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
      setTimeout(() => {
        router.push("/home")
      }, 500)
    }, 2000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-blue-600 flex flex-col items-center justify-center text-white relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-30">
        <img src="/korean-east-coast.png" alt="동해안 풍경" className="w-full h-full object-cover" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">동해안길</h1>
          <p className="text-lg opacity-90">East Coast Road</p>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        )}
      </div>

      {/* Bottom Logo */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-medium">여행의 시작</div>
      </div>
    </div>
  )
}
