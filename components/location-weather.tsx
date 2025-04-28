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
  ZapOff,
  Gauge,
  Umbrella
} from "lucide-react"
import { StoredLocationInfo, WeatherData } from "@/lib/types"
import { getCurrentUVIndex, getHumidityLevel, getRainChance, getRainChanceLabel, getSurfacePressureLevel, getTemperatureLevel, getUVRiskLevel, getWindDirection, toFahrenheit } from "@/lib/utils"
import { Card, CardContent } from "./ui/card"
import { useWeatherStore } from "@/lib/store/useWeatherStore"


interface LocationWeatherProps {
  locationData: StoredLocationInfo,
  fetchingLocationData: boolean
}

export default function LocationWeather({ locationData, fetchingLocationData }: LocationWeatherProps) {
  const [temperatureUnit, setTemperatureUnit] = useState<string>()

  const {currentData: weatherData, isLoadinCurrentData, fetchCurrentData} = useWeatherStore()

  useEffect(() => {
    if (locationData) {
      if (!locationData.latitude || !locationData.latitude) return;
      fetchCurrentData(locationData.latitude, locationData.longitude)
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


  if (fetchingLocationData || isLoadinCurrentData || !weatherData) {
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-24 bg-muted rounded-md"></div>
          ))}
        </div>
      </div>
    )
  }

  const current = weatherData!.current

  const temperature = temperatureUnit === 'F' ? toFahrenheit(current.temperature_2m) : current.temperature_2m
  const apparentTemperature = temperatureUnit === 'F' ? toFahrenheit(current.apparent_temperature) : current.apparent_temperature

  const uvIndex = getCurrentUVIndex(weatherData.daily.time, weatherData.daily.uv_index_max)
  const uvRiskLevel = getUVRiskLevel(uvIndex)?.risk

  const rainChance = getRainChance(weatherData.hourly.time, weatherData.hourly.precipitation_probability)

  return (
    <div className="rounded-xl bg-card p-4 md:p-6 shadow-sm">
      {locationData && <h2 className="text-xl font-medium text-foreground mb-4 md:mb-6">{locationData?.display_name}</h2>}

      <div className="flex items-center mb-3 md:mb-4 justify-between">
        <div className="text-4xl md:text-5xl font-bold text-foreground">{temperature.toFixed(1)}°{temperatureUnit}</div>
        <div className="ml-4 animate-bounce">
          {weatherCodeMap[current.weather_code]?.icon}
        </div>
      </div>

      <div className="text-base md:text-lg text-muted-foreground mb-4 md:mb-6">  <span>{weatherCodeMap[current.weather_code]?.label ?? "Unknown"}</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
        <Card className={`overflow-hidden border-0 bg-red-100 dark:bg-red-900/30`}>
          <CardContent className="p-3 md:p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-muted-foreground">Feels Like</span>
              <Thermometer className="h-5 w-5 text-red-500" />
            </div>
            <div className="text-lg md:text-xl font-bold">{apparentTemperature.toFixed(1)}°{temperatureUnit}</div>
            <div className="text-xs text-muted-foreground">{getTemperatureLevel(apparentTemperature, temperatureUnit!)}</div>
          </CardContent>
        </Card>
        <Card className={`overflow-hidden border-0 bg-yellow-100 dark:bg-yellow-900/30`}>
          <CardContent className="p-3 md:p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-muted-foreground">UV Index</span>
              <Sun className="h-5 w-5 text-yellow-500" />
            </div>
            <div className="text-lg md:text-xl font-bold">{uvIndex}</div>
            <div className="text-xs text-muted-foreground">{uvRiskLevel}</div>
          </CardContent>
        </Card>
        <Card className={`overflow-hidden border-0 bg-orange-100 dark:bg-orange-900/30`}>
          <CardContent className="p-3 md:p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-muted-foreground">Wind</span>
              <Wind className="h-5 w-5 text-orange-900" />
            </div>
            <div className="text-lg md:text-xl font-bold">{current.wind_speed_10m} km/h</div>
            <div className="text-xs text-muted-foreground">{getWindDirection(current.wind_direction_10m)}</div>
          </CardContent>
        </Card>
        <Card className={`overflow-hidden border-0 bg-blue-100 dark:bg-blue-900/30`}>
          <CardContent className="p-3 md:p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-muted-foreground">Humidity</span>
              <Droplets className="h-5 w-5 text-blue-500" />
            </div>
            <div className="text-lg md:text-xl font-bold">{current.relative_humidity_2m}%</div>
            <div className="text-xs text-muted-foreground">{getHumidityLevel(current.relative_humidity_2m)}</div>
          </CardContent>
        </Card>


        <Card className={`overflow-hidden border-0 bg-gray-100 dark:bg-gray-800`}>
          <CardContent className="p-3 md:p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-muted-foreground">Pressure</span>
              <Gauge className="h-5 w-5 text-gray-500" />
            </div>
            <div className="text-lg md:text-xl font-bold">{current.surface_pressure} hPa</div>
            <div className="text-xs text-muted-foreground">{getSurfacePressureLevel(current.surface_pressure)}</div>
          </CardContent>
        </Card>
        <Card className={`overflow-hidden border-0 bg-green-100 dark:bg-green-800`}>
          <CardContent className="p-3 md:p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-muted-foreground">Rain Chance</span>
              <Umbrella className="h-5 w-5 text-green-500" />
            </div>
            <div className="text-lg md:text-xl font-bold">{rainChance}%</div>
            <div className="text-xs text-muted-foreground">{getRainChanceLabel(rainChance!)}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

