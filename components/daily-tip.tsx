"use client"

import { useState, useEffect } from "react"
import { Lightbulb } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useWeatherStore } from "@/lib/store/useWeatherStore"
import { getCurrentUVIndex, getUVRiskLevel } from "@/lib/utils"

export default function DailyTip() {
  const {isLoadingLocationData, locationData} = useWeatherStore()

  if (isLoadingLocationData || !locationData) {
    return (
      <Card className="animate-pulse">
        <CardContent className="p-4">
          <div className="flex gap-3">
            <div className="h-6 w-6 bg-muted rounded-full"></div>
            <div className="h-16 w-full bg-muted rounded-md"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const uvIndex = getCurrentUVIndex(locationData.daily.time, locationData.daily.uv_index_max)
  const dailyTip = getUVRiskLevel(uvIndex)

  return (
    <Card className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
      <CardContent className="p-4">
        <div className="flex gap-3">
        <Lightbulb className="h-6 w-6" color={dailyTip?.color} />
          <p style={{color: dailyTip?.color}} className="text-sm">{dailyTip?.advice}</p>
        </div>
      </CardContent>
    </Card>
  )
}

