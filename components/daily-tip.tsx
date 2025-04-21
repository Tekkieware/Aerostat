"use client"

import { useState, useEffect } from "react"
import { Lightbulb } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function DailyTip() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Mock data - in a real app this would come from an API based on current weather
  const tip = {
    text: "With high UV levels today, apply SPF 30+ sunscreen every 2 hours when outdoors, and wear a hat and sunglasses for additional protection.",
    icon: <Lightbulb className="h-6 w-6 text-yellow-500" />,
  }

  if (isLoading) {
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

  return (
    <Card className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
      <CardContent className="p-4">
        <div className="flex gap-3">
          {tip.icon}
          <p className="text-sm">{tip.text}</p>
        </div>
      </CardContent>
    </Card>
  )
}

