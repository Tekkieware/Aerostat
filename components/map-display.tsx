"use client"

import { useState, useEffect } from "react"
import { Layers, Map } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface MapDisplayProps {
  locationId?: string
}

export default function MapDisplay({ locationId }: MapDisplayProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [mapType, setMapType] = useState("weather")

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [locationId])

  if (isLoading) {
    return (
      <div className="aspect-video w-full bg-muted rounded-md animate-pulse flex items-center justify-center">
        <Map className="h-12 w-12 md:h-16 md:w-16 text-muted-foreground/20" />
      </div>
    )
  }

  return (
    <div className="space-y-3 md:space-y-4">
      <div className="flex justify-end">
        <Select value={mapType} onValueChange={setMapType}>
          <SelectTrigger className="w-32 md:w-40">
            <SelectValue placeholder="Map Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="weather">Weather</SelectItem>
            <SelectItem value="aqi">Air Quality</SelectItem>
            <SelectItem value="satellite">Satellite</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="aspect-video w-full rounded-md bg-muted relative overflow-hidden">
        {/* In a real app, this would be a map component */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-muted-foreground p-4">
            <Layers className="h-12 w-12 md:h-16 md:w-16 mx-auto mb-2" />
            <p className="text-sm md:text-base">Map Visualization Would Appear Here</p>
            <p className="text-xs md:text-sm">
              Currently showing:{" "}
              {mapType === "weather" ? "Weather Radar" : mapType === "aqi" ? "Air Quality Index" : "Satellite View"}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

