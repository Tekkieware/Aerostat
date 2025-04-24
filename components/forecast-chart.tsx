"use client"

import { useState, useMemo, useEffect } from "react"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useWeatherStore } from "@/lib/store/useWeatherStore"
import { format, parseISO, isToday } from "date-fns"
import { toFahrenheit } from "@/lib/utils"


export default function ForecastChart() {
  const [period, setPeriod] = useState("hourly")
  const { isLoadingLocationData, locationData } = useWeatherStore()
  const [unit, setUnit] = useState<"C" | "F">("C")


  useEffect(() => {
    const stored = localStorage.getItem("temperature-unit")
    if (stored === "F") setUnit("F")
  }, [])


  const hourlyForecast = useMemo(() => {
    if (!locationData?.hourly) return []
  
    return locationData.hourly.time.map((time, index) => {
      const temp = locationData.hourly.temperature_2m[index]
      return {
        time: index === 0 ? "Now" : format(parseISO(time), "h a"),
        temp: unit === "F" ? toFahrenheit(temp) : temp,
        precipitation: locationData.hourly.precipitation_probability[index],
      }
    }).slice(0, 12)
  }, [locationData, unit])
  
  const dailyForecast = useMemo(() => {
    if (!locationData?.daily) return []
  
    return locationData.daily.time.map((date, index) => {
      const high = locationData.daily.temperature_2m_max[index]
      return {
        day: isToday(parseISO(date)) ? "Today" : format(parseISO(date), "EEE"),
        high: unit === "F" ? toFahrenheit(high) : high,
        precipitation: locationData.daily.precipitation_probability_max[index],
      }
    })
  }, [locationData, unit])
  

  const formatTooltip = (value: number, name: string) => {
    const unitLabel = unit === "F" ? "°F" : "°C"
    if (name === "temp" || name === "high" || name === "low") {
      return [`${value}${unitLabel}`, name === "temp" ? "Temperature" : name === "high" ? "High" : "Low"]
    }
    if (name === "precipitation") {
      return [`${value}%`, "Precipitation"]
    }
    return [value, name]
  }
  

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Weather Forecast</CardTitle>
            <CardDescription>
              {period === "hourly"
                ? "Hour-by-hour forecast for the next 12 hours"
                : "Day-by-day forecast for the next 7 days"}
            </CardDescription>
          </div>
          <Tabs defaultValue="hourly" onValueChange={setPeriod} className="ml-auto">
            <TabsList>
              <TabsTrigger value="hourly">Hourly</TabsTrigger>
              <TabsTrigger value="daily">Daily</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        {isLoadingLocationData ? (
          <p className="text-sm text-muted-foreground">Loading forecast data...</p>
        ) : period === "hourly" ? (
          <div className="space-y-8">
            {/* Hourly Temperature Chart */}
            <div>
              <h3 className="text-sm font-medium mb-2">Temperature (°C)</h3>
              <p className="text-xs text-muted-foreground mb-4">
                Hourly temperature trend showing expected changes throughout the day
              </p>
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={hourlyForecast} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                    <defs>
                      <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <XAxis dataKey="time" tick={{ fontSize: 12 }} tickMargin={10} stroke="hsl(var(--muted-foreground))" />
                    <YAxis domain={["dataMin - 2", "dataMax + 2"]} tick={{ fontSize: 12 }} tickMargin={10} stroke="hsl(var(--muted-foreground))" tickFormatter={(value) => `${value}°`} />
                    <Tooltip formatter={formatTooltip} contentStyle={{ backgroundColor: "hsl(var(--card))", borderColor: "hsl(var(--border))", borderRadius: "0.5rem" }} labelStyle={{ color: "hsl(var(--foreground))" }} />
                    <Area type="monotone" dataKey="temp" stroke="hsl(var(--primary))" strokeWidth={2} fillOpacity={1} fill="url(#colorTemp)" name="Temperature" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Hourly Precipitation */}
            <div>
              <h3 className="text-sm font-medium mb-2">Precipitation Chance (%)</h3>
              <p className="text-xs text-muted-foreground mb-4">
                Probability of precipitation for each hour
              </p>
              <div className="h-[150px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={hourlyForecast} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <XAxis dataKey="time" tick={{ fontSize: 12 }} tickMargin={10} stroke="hsl(var(--muted-foreground))" />
                    <YAxis tick={{ fontSize: 12 }} tickMargin={10} stroke="hsl(var(--muted-foreground))" tickFormatter={(value) => `${value}%`} />
                    <Tooltip formatter={formatTooltip} contentStyle={{ backgroundColor: "hsl(var(--card))", borderColor: "hsl(var(--border))", borderRadius: "0.5rem" }} labelStyle={{ color: "hsl(var(--foreground))" }} />
                    <Bar dataKey="precipitation" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} name="Precipitation" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Daily High/Low Temps */}
            <div>
              <h3 className="text-sm font-medium mb-2">Temperature Range (°C)</h3>
              <p className="text-xs text-muted-foreground mb-4">Daily high and low temperatures for the week ahead</p>
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dailyForecast} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <XAxis dataKey="day" tick={{ fontSize: 12 }} tickMargin={10} stroke="hsl(var(--muted-foreground))" />
                    <YAxis domain={["dataMin - 5", "dataMax + 5"]} tick={{ fontSize: 12 }} tickMargin={10} stroke="hsl(var(--muted-foreground))" tickFormatter={(value) => `${value}°`} />
                    <Tooltip formatter={formatTooltip} contentStyle={{ backgroundColor: "hsl(var(--card))", borderColor: "hsl(var(--border))", borderRadius: "0.5rem" }} labelStyle={{ color: "hsl(var(--foreground))" }} />
                    <Legend />
                    <Bar dataKey="high" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="High" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Daily Precipitation */}
            <div>
              <h3 className="text-sm font-medium mb-2">Precipitation Chance (%)</h3>
              <p className="text-xs text-muted-foreground mb-4">Daily precipitation probability</p>
              <div className="h-[150px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dailyForecast} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <XAxis dataKey="day" tick={{ fontSize: 12 }} tickMargin={10} stroke="hsl(var(--muted-foreground))" />
                    <YAxis tick={{ fontSize: 12 }} tickMargin={10} stroke="hsl(var(--muted-foreground))" tickFormatter={(value) => `${value}%`} />
                    <Tooltip formatter={formatTooltip} contentStyle={{ backgroundColor: "hsl(var(--card))", borderColor: "hsl(var(--border))", borderRadius: "0.5rem" }} labelStyle={{ color: "hsl(var(--foreground))" }} />
                    <Bar dataKey="precipitation" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} name="Precipitation" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
