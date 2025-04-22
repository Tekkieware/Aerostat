"use client"

import { useState, useEffect } from "react"
import { AlertCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { AirQualityData, StoredLocationInfo } from "@/lib/types"
import { getAirQuality, getAqiCategory, getAqiRecommendation } from "@/lib/data"
import { getAqiColor, getProgressColor } from "@/lib/utils"

interface AirQualityDisplayProps {
  locationData: StoredLocationInfo,
  fetchingLocationData: boolean
}

export default function AirQualityDisplay({ locationData, fetchingLocationData }: AirQualityDisplayProps) {
  const [airQualityData, setAirQualityData] = useState<AirQualityData>() 
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
   if(locationData){
    setIsLoading(true)
   getAirQuality(locationData).then((data)=>{
    setAirQualityData(data)
    setIsLoading(false)
   })
   }
  }, [locationData])


 

  if (isLoading || isLoading || !airQualityData) {
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
          className={`h-24 w-24 md:h-32 md:w-32 rounded-full flex items-center justify-center ${getAqiColor(airQualityData?.current?.european_aqi!)}`}
        >
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold">{airQualityData?.current?.european_aqi}</div>
            <div className="text-xs md:text-sm">{getAqiCategory(airQualityData?.current?.european_aqi!)}</div>
          </div>
        </div>
      </div>

      <div className="flex items-start md:items-center gap-2 mb-4 md:mb-6 text-xs md:text-sm">
        <AlertCircle className="h-4 w-4 text-muted-foreground mt-0.5 md:mt-0" />
        <span className="text-muted-foreground">{getAqiRecommendation(airQualityData?.current?.european_aqi!)}</span>
      </div>

      <div className="space-y-3 md:space-y-4">
        <div>
          <div className="flex justify-between text-xs md:text-sm mb-1">
            <span>PM2.5</span>
            <span>{airQualityData?.current?.pm2_5} µg/m³</span>
          </div>
          <Progress value={airQualityData?.current?.pm2_5! / 0.5} className={getProgressColor(airQualityData?.current?.european_aqi!)} />
        </div>

        <div>
          <div className="flex justify-between text-xs md:text-sm mb-1">
            <span>PM10</span>
            <span>{airQualityData?.current?.pm10} µg/m³</span>
          </div>
          <Progress value={airQualityData?.current?.pm10! / 1.5} className={getProgressColor(airQualityData?.current?.european_aqi!)} />
        </div>

        <div>
          <div className="flex justify-between text-xs md:text-sm mb-1">
            <span>O₃ (Ozone)</span>
            <span>{airQualityData?.current?.ozone} μg/m³</span>
          </div>
          <Progress value={airQualityData?.current?.ozone! / 1.2} className={getProgressColor(airQualityData?.current?.european_aqi!)} />
        </div>
        <div>
          <div className="flex justify-between text-xs md:text-sm mb-1">
            <span>NO₂ (Nitrogen Dioxide)</span>
            <span>{airQualityData?.current?.nitrogen_dioxide} μg/m³</span>
          </div>
          <Progress value={airQualityData?.current?.nitrogen_dioxide! / 1.2} className={getProgressColor(airQualityData?.current?.european_aqi!)} />
        </div>
        <div>
          <div className="flex justify-between text-xs md:text-sm mb-1">
            <span>SO₂ (Sulphur Dioxide)</span>
            <span>{airQualityData?.current?.sulphur_dioxide} μg/m³</span>
          </div>
          <Progress value={airQualityData?.current?.sulphur_dioxide! / 1.2} className={getProgressColor(airQualityData?.current?.european_aqi!)} />
        </div>
      </div>
    </div>
  )
}

