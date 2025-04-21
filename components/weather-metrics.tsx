"use client"

import { useState, useEffect } from "react"
import { Sun, Umbrella, Wind, Droplets, Thermometer, Gauge } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function WeatherMetrics() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Mock data - in a real app this would come from an API
  const metrics = [
    {
      id: "uv",
      name: "UV Index",
      value: "6",
      description: "High",
      icon: <Sun className="h-5 w-5 text-yellow-500" />,
      color: "bg-yellow-100 dark:bg-yellow-900/30",
    },
    {
      id: "humidity",
      name: "Humidity",
      value: "65%",
      description: "Moderate",
      icon: <Droplets className="h-5 w-5 text-blue-500" />,
      color: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      id: "wind",
      name: "Wind",
      value: "12 km/h",
      description: "NE",
      icon: <Wind className="h-5 w-5 text-primary" />,
      color: "bg-primary-100 dark:bg-primary/10",
    },
    {
      id: "feels",
      name: "Feels Like",
      value: "26°",
      description: "Warm",
      icon: <Thermometer className="h-5 w-5 text-red-500" />,
      color: "bg-red-100 dark:bg-red-900/30",
    },
    {
      id: "pressure",
      name: "Pressure",
      value: "1015 hPa",
      description: "Normal",
      icon: <Gauge className="h-5 w-5 text-gray-500" />,
      color: "bg-gray-100 dark:bg-gray-800",
    },
    {
      id: "rain",
      name: "Rain Chance",
      value: "30%",
      description: "Light",
      icon: <Umbrella className="h-5 w-5 text-secondary" />,
      color: "bg-secondary-100 dark:bg-secondary/10",
    },
  ]

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 animate-pulse">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-24 bg-muted rounded-md"></div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
      {metrics.map((metric) => (
        <Card key={metric.id} className={`overflow-hidden border-0 ${metric.color}`}>
          <CardContent className="p-3 md:p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-muted-foreground">{metric.name}</span>
              {metric.icon}
            </div>
            <div className="text-lg md:text-xl font-bold">{metric.value}</div>
            <div className="text-xs text-muted-foreground">{metric.description}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

