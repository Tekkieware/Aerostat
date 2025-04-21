"use client"

import { useState, useEffect } from "react"
import { AlertOctagon } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface WeatherAlertsProps {
  locationId?: string
}

export default function WeatherAlerts({ locationId }: WeatherAlertsProps) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [locationId])

  // Mock data - in a real app this would come from an API
  const alerts = [
    {
      id: 1,
      type: "warning",
      title: "Heavy Rain",
      description: "Heavy rainfall expected in the next 24 hours with potential for localized flooding.",
      time: "Valid until: Jul 10, 7:00 PM",
    },
    {
      id: 2,
      type: "info",
      title: "Air Quality Advisory",
      description: "Sensitive groups should limit prolonged outdoor exertion due to moderate air quality conditions.",
      time: "Valid until: Jul 11, 8:00 AM",
    },
  ]

  if (isLoading) {
    return (
      <div className="space-y-3 md:space-y-4 animate-pulse">
        <div className="h-7 w-1/3 bg-muted rounded-md mb-3 md:mb-4"></div>
        <div className="h-20 md:h-24 bg-muted rounded-md"></div>
        <div className="h-20 md:h-24 bg-muted rounded-md"></div>
      </div>
    )
  }

  if (alerts.length === 0) {
    return null
  }

  return (
    <div className="space-y-3 md:space-y-4">
      <h2 className="text-xl font-medium text-foreground">Alerts</h2>

      {alerts.map((alert) => (
        <Alert key={alert.id} variant={alert.type === "warning" ? "destructive" : "default"}>
          <AlertOctagon className="h-4 w-4" />
          <AlertTitle className="ml-2 text-sm md:text-base">{alert.title}</AlertTitle>
          <AlertDescription className="ml-2">
            <div className="text-xs md:text-sm">{alert.description}</div>
            <div className="text-xs mt-1">{alert.time}</div>
          </AlertDescription>
        </Alert>
      ))}
    </div>
  )
}

