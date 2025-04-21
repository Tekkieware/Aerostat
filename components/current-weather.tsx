"use client"

import { useState, useEffect } from "react"
import { Cloud, CloudRain, Droplets, Thermometer, Wind } from "lucide-react"

interface CurrentWeatherProps {
  locationId?: string
}

export default function CurrentWeather({ locationId }: CurrentWeatherProps) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [locationId])

  // Mock data - in a real app this would come from an API
  const weatherData = {
    location: "New York, US",
    temperature: 24,
    condition: "Partly Cloudy",
    humidity: 65,
    windSpeed: 12,
    windDirection: "NE",
    precipitation: 0.1,
    feelsLike: 26,
  }

  if (isLoading) {
    return (
      <div className="rounded-xl bg-card p-4 md:p-6 shadow-sm animate-pulse">
        <div className="h-7 w-1/3 bg-muted rounded-md mb-4 md:mb-6"></div>
        <div className="h-12 w-1/4 bg-muted rounded-md mb-3 md:mb-4"></div>
        <div className="h-5 w-1/2 bg-muted rounded-md mb-4 md:mb-6"></div>
        <div className="grid grid-cols-2 gap-3 md:gap-4">
          <div className="h-8 bg-muted rounded-md"></div>
          <div className="h-8 bg-muted rounded-md"></div>
          <div className="h-8 bg-muted rounded-md"></div>
          <div className="h-8 bg-muted rounded-md"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-xl bg-card p-4 md:p-6 shadow-sm">
      <h2 className="text-xl font-medium text-foreground mb-4 md:mb-6">{weatherData.location}</h2>

      <div className="flex items-center mb-3 md:mb-4">
        <div className="text-4xl md:text-5xl font-bold text-foreground">{weatherData.temperature}°</div>
        <div className="ml-4">
          <Cloud className="h-8 w-8 md:h-10 md:w-10 text-primary" />
        </div>
      </div>

      <div className="text-base md:text-lg text-muted-foreground mb-4 md:mb-6">{weatherData.condition}</div>

      <div className="grid grid-cols-2 gap-3 md:gap-4 text-xs md:text-sm">
        <div className="flex items-center gap-2">
          <Thermometer className="h-4 w-4 text-primary" />
          <span>Feels like {weatherData.feelsLike}°</span>
        </div>
        <div className="flex items-center gap-2">
          <Wind className="h-4 w-4 text-primary" />
          <span>
            {weatherData.windSpeed} km/h {weatherData.windDirection}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Droplets className="h-4 w-4 text-primary" />
          <span>Humidity {weatherData.humidity}%</span>
        </div>
        <div className="flex items-center gap-2">
          <CloudRain className="h-4 w-4 text-primary" />
          <span>Precipitation {weatherData.precipitation} mm</span>
        </div>
      </div>
    </div>
  )
}

