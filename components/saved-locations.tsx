"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function SavedLocations() {
  // Mock data - in a real app this would come from localStorage or a database
  const [savedLocations, setSavedLocations] = useState([
    { id: "nyc", name: "New York", country: "US", temp: 24, aqi: 45 },
    { id: "lon", name: "London", country: "UK", temp: 18, aqi: 32 },
    { id: "tok", name: "Tokyo", country: "JP", temp: 28, aqi: 58 },
  ])

  // Helper function to determine color based on AQI
  const getAqiBadgeColor = (aqi: number) => {
    if (aqi <= 50) return "bg-secondary text-secondary-foreground"
    if (aqi <= 100) return "bg-yellow-500 text-yellow-50"
    if (aqi <= 150) return "bg-orange-500 text-orange-50"
    return "bg-accent text-accent-foreground"
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium text-foreground">Saved Locations</h2>
        <Button variant="outline" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Location
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {savedLocations.map((location) => (
          <Link href={`/location/${location.id}`} key={location.id}>
            <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
              <CardContent className="p-3 md:p-4">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium">{location.name}</h3>
                    <p className="text-xs md:text-sm text-muted-foreground">{location.country}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg md:text-xl font-bold">{location.temp}°</div>
                    <div
                      className={`text-xs px-2 py-0.5 md:py-1 rounded-full inline-block ${getAqiBadgeColor(location.aqi)}`}
                    >
                      AQI: {location.aqi}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

