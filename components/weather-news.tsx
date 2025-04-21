"use client"

import { useState, useEffect } from "react"
import { CalendarClock, ExternalLink } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function WeatherNews() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Mock data - in a real app this would come from an API
  const newsItems = [
    {
      id: 1,
      title: "Heat Wave Expected to Continue Through Weekend",
      date: "July 10, 2023",
      summary:
        "Temperatures are expected to remain above 30°C through the weekend. Stay hydrated and avoid outdoor activities during peak hours.",
      url: "#",
    },
    {
      id: 2,
      title: "Air Quality Alert Issued for Urban Areas",
      date: "July 9, 2023",
      summary:
        "Local authorities have issued an air quality alert due to increased pollution levels. Sensitive groups should limit outdoor exposure.",
      url: "#",
    },
    {
      id: 3,
      title: "Thunderstorms Forecast for Next Week",
      date: "July 8, 2023",
      summary:
        "Meteorologists predict a series of thunderstorms starting Monday, bringing relief from the current heat wave.",
      url: "#",
    },
  ]

  if (isLoading) {
    return (
      <Card className="animate-pulse">
        <CardHeader className="pb-2">
          <div className="h-6 w-1/3 bg-muted rounded-md"></div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-5 w-3/4 bg-muted rounded-md"></div>
                <div className="h-4 w-1/4 bg-muted rounded-md"></div>
                <div className="h-16 bg-muted rounded-md"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Weather News & Updates</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {newsItems.map((item) => (
            <div key={item.id} className="border-b border-border pb-4 last:border-0 last:pb-0">
              <h3 className="font-medium text-base">{item.title}</h3>
              <div className="flex items-center text-xs text-muted-foreground mb-2">
                <CalendarClock className="h-3 w-3 mr-1" />
                {item.date}
              </div>
              <p className="text-sm text-muted-foreground mb-2">{item.summary}</p>
              <Button variant="link" size="sm" className="h-auto p-0 text-primary" asChild>
                <a href={item.url} className="flex items-center">
                  Read more <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

