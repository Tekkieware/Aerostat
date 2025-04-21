"use client"

import { useState, useEffect } from "react"
import { Flower2 } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PollenCount() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Mock data - in a real app this would come from an API
  const pollenData = {
    overall: "Moderate",
    types: [
      { name: "Tree", level: 3, value: 60 },
      { name: "Grass", level: 2, value: 40 },
      { name: "Weed", level: 1, value: 20 },
      { name: "Mold", level: 4, value: 80 },
    ],
  }

  const getLevelColor = (level: number) => {
    switch (level) {
      case 1:
        return "bg-green-500"
      case 2:
        return "bg-yellow-500"
      case 3:
        return "bg-orange-500"
      case 4:
      case 5:
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getLevelText = (level: number) => {
    switch (level) {
      case 1:
        return "Low"
      case 2:
        return "Moderate"
      case 3:
        return "High"
      case 4:
        return "Very High"
      case 5:
        return "Extreme"
      default:
        return "Unknown"
    }
  }

  if (isLoading) {
    return (
      <Card className="animate-pulse">
        <CardHeader className="pb-2">
          <div className="h-6 w-1/3 bg-muted rounded-md"></div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between">
                  <div className="h-4 w-1/4 bg-muted rounded-md"></div>
                  <div className="h-4 w-1/4 bg-muted rounded-md"></div>
                </div>
                <div className="h-2 bg-muted rounded-md"></div>
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
        <CardTitle className="text-lg flex items-center gap-2">
          <Flower2 className="h-5 w-5 text-secondary" />
          Pollen Count
          <span className="text-sm font-normal text-muted-foreground ml-auto">Overall: {pollenData.overall}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {pollenData.types.map((pollen) => (
            <div key={pollen.name} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>{pollen.name}</span>
                <span className="text-muted-foreground">{getLevelText(pollen.level)}</span>
              </div>
              <Progress value={pollen.value} className={getLevelColor(pollen.level)} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

