"use client"

import { useState } from "react"
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

interface ForecastChartProps {
  locationId?: string
}

export default function ForecastChart({ locationId }: ForecastChartProps) {
  const [period, setPeriod] = useState("hourly")

  // Mock data - in a real app this would come from an API
  const hourlyForecast = [
    { time: "Now", temp: 24, precipitation: 0 },
    { time: "1 PM", temp: 25, precipitation: 0 },
    { time: "2 PM", temp: 26, precipitation: 0 },
    { time: "3 PM", temp: 27, precipitation: 0 },
    { time: "4 PM", temp: 26, precipitation: 10 },
    { time: "5 PM", temp: 25, precipitation: 30 },
    { time: "6 PM", temp: 24, precipitation: 20 },
    { time: "7 PM", temp: 22, precipitation: 10 },
    { time: "8 PM", temp: 21, precipitation: 0 },
    { time: "9 PM", temp: 20, precipitation: 0 },
    { time: "10 PM", temp: 19, precipitation: 0 },
    { time: "11 PM", temp: 18, precipitation: 0 },
  ]

  const dailyForecast = [
    { day: "Today", high: 27, low: 18, precipitation: 20 },
    { day: "Tue", high: 26, low: 17, precipitation: 30 },
    { day: "Wed", high: 25, low: 16, precipitation: 40 },
    { day: "Thu", high: 24, low: 15, precipitation: 10 },
    { day: "Fri", high: 23, low: 14, precipitation: 0 },
    { day: "Sat", high: 22, low: 13, precipitation: 0 },
    { day: "Sun", high: 24, low: 14, precipitation: 0 },
  ]

  // Custom tooltip formatter
  const formatTooltip = (value: number, name: string) => {
    if (name === "temp" || name === "high" || name === "low") {
      return [`${value}°C`, name === "temp" ? "Temperature" : name === "high" ? "High" : "Low"]
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
        {period === "hourly" ? (
          <div className="space-y-8">
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
                    <XAxis
                      dataKey="time"
                      tick={{ fontSize: 12 }}
                      tickMargin={10}
                      stroke="hsl(var(--muted-foreground))"
                    />
                    <YAxis
                      domain={["dataMin - 2", "dataMax + 2"]}
                      tick={{ fontSize: 12 }}
                      tickMargin={10}
                      stroke="hsl(var(--muted-foreground))"
                      tickFormatter={(value) => `${value}°`}
                    />
                    <Tooltip
                      formatter={formatTooltip}
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        borderColor: "hsl(var(--border))",
                        borderRadius: "0.5rem",
                      }}
                      labelStyle={{ color: "hsl(var(--foreground))" }}
                    />
                    <Area
                      type="monotone"
                      dataKey="temp"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorTemp)"
                      name="Temperature"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Precipitation Chance (%)</h3>
              <p className="text-xs text-muted-foreground mb-4">
                Probability of precipitation for each hour, helping you plan outdoor activities
              </p>
              <div className="h-[150px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={hourlyForecast} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <XAxis
                      dataKey="time"
                      tick={{ fontSize: 12 }}
                      tickMargin={10}
                      stroke="hsl(var(--muted-foreground))"
                    />
                    <YAxis
                      tick={{ fontSize: 12 }}
                      tickMargin={10}
                      stroke="hsl(var(--muted-foreground))"
                      tickFormatter={(value) => `${value}%`}
                    />
                    <Tooltip
                      formatter={formatTooltip}
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        borderColor: "hsl(var(--border))",
                        borderRadius: "0.5rem",
                      }}
                      labelStyle={{ color: "hsl(var(--foreground))" }}
                    />
                    <Bar
                      dataKey="precipitation"
                      fill="hsl(var(--secondary))"
                      radius={[4, 4, 0, 0]}
                      name="Precipitation"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-medium mb-2">Temperature Range (°C)</h3>
              <p className="text-xs text-muted-foreground mb-4">Daily high and low temperatures for the week ahead</p>
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dailyForecast} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <XAxis
                      dataKey="day"
                      tick={{ fontSize: 12 }}
                      tickMargin={10}
                      stroke="hsl(var(--muted-foreground))"
                    />
                    <YAxis
                      domain={["dataMin - 5", "dataMax + 5"]}
                      tick={{ fontSize: 12 }}
                      tickMargin={10}
                      stroke="hsl(var(--muted-foreground))"
                      tickFormatter={(value) => `${value}°`}
                    />
                    <Tooltip
                      formatter={formatTooltip}
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        borderColor: "hsl(var(--border))",
                        borderRadius: "0.5rem",
                      }}
                      labelStyle={{ color: "hsl(var(--foreground))" }}
                    />
                    <Legend />
                    <Bar dataKey="high" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="High" />
                    <Bar dataKey="low" fill="hsl(var(--muted))" radius={[4, 4, 0, 0]} name="Low" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Precipitation Chance (%)</h3>
              <p className="text-xs text-muted-foreground mb-4">
                Daily precipitation probability to help you plan your week
              </p>
              <div className="h-[150px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dailyForecast} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <XAxis
                      dataKey="day"
                      tick={{ fontSize: 12 }}
                      tickMargin={10}
                      stroke="hsl(var(--muted-foreground))"
                    />
                    <YAxis
                      tick={{ fontSize: 12 }}
                      tickMargin={10}
                      stroke="hsl(var(--muted-foreground))"
                      tickFormatter={(value) => `${value}%`}
                    />
                    <Tooltip
                      formatter={formatTooltip}
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        borderColor: "hsl(var(--border))",
                        borderRadius: "0.5rem",
                      }}
                      labelStyle={{ color: "hsl(var(--foreground))" }}
                    />
                    <Bar
                      dataKey="precipitation"
                      fill="hsl(var(--secondary))"
                      radius={[4, 4, 0, 0]}
                      name="Precipitation"
                    />
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

