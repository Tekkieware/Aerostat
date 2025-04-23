"use client"

import { useState, useEffect } from "react"
import {
  Cloud,
  CloudRain,
  Droplets,
  Thermometer,
  Wind,
  Sun,
  CloudSun,
  CloudDrizzle,
  CloudSnow,
  CloudFog,
  Zap,
  ZapOff
} from "lucide-react"
import { StoredLocationInfo, WeatherData } from "@/lib/types"
import { getWeatherData } from "@/lib/data"
import { getWindDirection, toFahrenheit } from "@/lib/utils"


interface CurrentWeatherProps {
  locationData: StoredLocationInfo,
  fetchingLocationData: boolean
}

export default function CurrentWeather({ locationData, fetchingLocationData }: CurrentWeatherProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [weatherData, setWeatherData] = useState<WeatherData>()
  const [temperatureUnit, setTemperatureUnit] = useState<string>()

  useEffect(() => {
    setIsLoading(true)
    if (locationData) {
      if (!locationData.latitude || !locationData.latitude) return;
      getWeatherData(locationData).then((data) => {
        setWeatherData(data)
        setIsLoading(false)
      })
    }
    setTemperatureUnit(localStorage.getItem('temperature-unit') || "C")
  }, [locationData])

  const weatherCodeMap: Record<
    number,
    { label: string; icon: React.ReactNode }
  > = {
    0: { label: "Clear sky", icon: <Sun className="h-10 w-10 text-yellow-400" /> },
    1: { label: "Mainly clear", icon: <Sun className="h-10 w-10 text-yellow-400" /> },
    2: { label: "Partly cloudy", icon: <CloudSun className="h-10 w-10 text-gray-400" /> },
    3: { label: "Overcast", icon: <Cloud className="h-10 w-10 text-gray-500" /> },
    45: { label: "Fog", icon: <CloudFog className="h-10 w-10 text-gray-400" /> },
    48: { label: "Depositing rime fog", icon: <CloudFog className="h-10 w-10 text-gray-400" /> },
    51: { label: "Light drizzle", icon: <CloudDrizzle className="h-10 w-10 text-blue-300" /> },
    53: { label: "Moderate drizzle", icon: <CloudDrizzle className="h-10 w-10 text-blue-400" /> },
    55: { label: "Dense drizzle", icon: <CloudDrizzle className="h-10 w-10 text-blue-500" /> },
    61: { label: "Slight rain", icon: <CloudRain className="h-10 w-10 text-blue-400" /> },
    63: { label: "Moderate rain", icon: <CloudRain className="h-10 w-10 text-blue-500" /> },
    65: { label: "Heavy rain", icon: <CloudRain className="h-10 w-10 text-blue-600" /> },
    80: { label: "Slight showers", icon: <CloudRain className="h-10 w-10 text-blue-400" /> },
    81: { label: "Moderate showers", icon: <CloudRain className="h-10 w-10 text-blue-500" /> },
    82: { label: "Violent showers", icon: <CloudRain className="h-10 w-10 text-blue-700" /> },
    95: { label: "Thunderstorm", icon: <Zap className="h-10 w-10 text-yellow-300" /> },
    99: { label: "Thunderstorm with hail", icon: <ZapOff className="h-10 w-10 text-yellow-300" /> }
  }

  if (fetchingLocationData || isLoading || !weatherData) {
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

  const current = weatherData!.current

  const temperature = temperatureUnit === 'F' ? toFahrenheit(current.temperature_2m) : current.temperature_2m
  const apparentTemperature = temperatureUnit === 'F' ? toFahrenheit(current.apparent_temperature) : current.apparent_temperature

  return (
    <div className="rounded-xl bg-card p-4 md:p-6 shadow-sm">
      {locationData && <h2 className="text-xl font-medium text-foreground mb-4 md:mb-6">{locationData?.city}, {locationData?.state}, {locationData?.country}.</h2>}

      <div className="flex items-center mb-3 md:mb-4 justify-between">
        <div className="text-4xl md:text-5xl font-bold text-foreground">{temperature.toFixed(1)}°{temperatureUnit}</div>
        <div className="ml-4 animate-bounce">
        {weatherCodeMap[current.weather_code]?.icon}
        </div>
      </div>

      <div className="text-base md:text-lg text-muted-foreground mb-4 md:mb-6">  <span>{weatherCodeMap[current.weather_code]?.label ?? "Unknown"}</span>
      </div>

      <div className="grid grid-cols-2 gap-3 md:gap-4 text-xs md:text-sm">
        <div className="flex items-center gap-2">
          <Thermometer className="h-4 w-4 text-primary" />
          <span>Feels like {apparentTemperature.toFixed(1)}°{temperatureUnit}</span>
        </div>
        <div className="flex items-center gap-2">
          <Wind className="h-4 w-4 text-primary" />
          <span>
            {current.wind_speed_10m} km/h {getWindDirection(current.wind_direction_10m)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Droplets className="h-4 w-4 text-primary" />
          <span>Humidity {current.relative_humidity_2m}%</span>
        </div>
        <div className="flex items-center gap-2">
          <CloudRain className="h-4 w-4 text-primary" />
          <span>Precipitation {current.precipitation} mm</span>
        </div>
      </div>
    </div>
  )
}

