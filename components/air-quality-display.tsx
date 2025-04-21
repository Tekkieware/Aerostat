"use client"

import { useState, useEffect } from "react"
import { AlertCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface AirQualityDisplayProps {
  locationId?: string
}

export default function AirQualityDisplay({ locationId }: AirQualityDisplayProps) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [locationId])

  // Mock data - in a real app this would come from an API
  const aqiData = {
    aqi: 45,
    category: "Good",
    pollutants: {
      pm25: 12.5,
      pm10: 25.3,
      o3: 42.1,
      no2: 15.6,
    },
    recommendation: "Air quality is good. It's a great day for outdoor activities!",
  }

  // Helper function to determine color based on AQI
  const getAqiColor = (aqi: number) => {
    if (aqi <= 50) return "bg-secondary text-secondary-foreground"
    if (aqi <= 100) return "bg-yellow-500 text-yellow-50"
    if (aqi <= 150) return "bg-orange-500 text-orange-50"
    return "bg-accent text-accent-foreground"
  }

  // Helper function to determine progress color based on AQI
  const getProgressColor = (aqi: number) => {
    if (aqi <= 50) return "bg-secondary"
    if (aqi <= 100) return "bg-yellow-500"
    if (aqi <= 150) return "bg-orange-500"
    return "bg-accent"
  }

  if (isLoading) {
    return (
      <div className="rounded-xl bg-card p-4 md:p-6 shadow-sm animate-pulse">
        <div className="h-7 w-1/3 bg-muted rounded-md mb-4 md:mb-6"></div>
        <div className="flex justify-center mb-4 md:mb-6">
          <div className="h-24 w-24 md:h-32 md:w-32 rounded-full bg-muted"></div>
        </div>
        <div className="h-5 w-full bg-muted rounded-md mb-4 md:mb-6"></div>
        <div className="space-y-3 md:space-y-4">
          <div className="h-8 bg-muted rounded-md"></div>
          <div className="h-8 bg-muted rounded-md"></div>
          <div className="h-8 bg-muted rounded-md"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-xl bg-card p-4 md:p-6 shadow-sm">
      <h2 className="text-xl font-medium text-foreground mb-4 md:mb-6">Air Quality</h2>

      <div className="flex justify-center mb-4 md:mb-6">
        <div
          className={`h-24 w-24 md:h-32 md:w-32 rounded-full flex items-center justify-center ${getAqiColor(aqiData.aqi)}`}
        >
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold">{aqiData.aqi}</div>
            <div className="text-xs md:text-sm">{aqiData.category}</div>
          </div>
        </div>
      </div>

      <div className="flex items-start md:items-center gap-2 mb-4 md:mb-6 text-xs md:text-sm">
        <AlertCircle className="h-4 w-4 text-muted-foreground mt-0.5 md:mt-0" />
        <span className="text-muted-foreground">{aqiData.recommendation}</span>
      </div>

      <div className="space-y-3 md:space-y-4">
        <div>
          <div className="flex justify-between text-xs md:text-sm mb-1">
            <span>PM2.5</span>
            <span>{aqiData.pollutants.pm25} µg/m³</span>
          </div>
          <Progress value={aqiData.pollutants.pm25 / 0.5} className={getProgressColor(aqiData.aqi)} />
        </div>

        <div>
          <div className="flex justify-between text-xs md:text-sm mb-1">
            <span>PM10</span>
            <span>{aqiData.pollutants.pm10} µg/m³</span>
          </div>
          <Progress value={aqiData.pollutants.pm10 / 1.5} className={getProgressColor(aqiData.aqi)} />
        </div>

        <div>
          <div className="flex justify-between text-xs md:text-sm mb-1">
            <span>O₃ (Ozone)</span>
            <span>{aqiData.pollutants.o3} ppb</span>
          </div>
          <Progress value={aqiData.pollutants.o3 / 1.2} className={getProgressColor(aqiData.aqi)} />
        </div>
      </div>
    </div>
  )
}

