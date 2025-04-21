import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import CurrentWeather from "@/components/current-weather"
import AirQualityDisplay from "@/components/air-quality-display"
import ForecastChart from "@/components/forecast-chart"
import MapDisplay from "@/components/map-display"
import WeatherAlerts from "@/components/weather-alerts"

interface LocationPageProps {
  params: {
    id: string
  }
}

export default function LocationPage({ params }: LocationPageProps) {
  // In a real app, we would fetch data based on params.id
  const locationId = params.id

  return (
    <>
      <main className="min-h-screen bg-background p-4 md:p-8 pb-16">
        <div className="container mx-auto max-w-6xl space-y-6 md:space-y-8">
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary/20"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-2xl font-bold text-foreground md:text-3xl">Location Details</h1>
          </div>

          <div className="grid gap-4 md:gap-6 md:grid-cols-2">
            <CurrentWeather locationId={locationId} />
            <AirQualityDisplay locationId={locationId} />
          </div>

          <div className="rounded-xl bg-card p-4 md:p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-medium text-foreground">Forecast</h2>
            <ForecastChart locationId={locationId} />
          </div>

          <WeatherAlerts locationId={locationId} />

          <div className="rounded-xl bg-card p-4 md:p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-medium text-foreground">Map View</h2>
            <MapDisplay locationId={locationId} />
          </div>
        </div>
      </main>
    </>
  )
}

