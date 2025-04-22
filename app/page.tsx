import LocationSearch from "@/components/location-search"
import ForecastChart from "@/components/forecast-chart"
import SavedLocations from "@/components/saved-locations"
import WeatherMetrics from "@/components/weather-metrics"
import PollenCount from "@/components/pollen-count"
import WeatherNews from "@/components/weather-news"
import DailyTip from "@/components/daily-tip"
import LocationWeatherAirQualityDisplay from "@/components/location-weather-air-quality-display"
  
export default function Home() {
  return (
    <>
      <main className="min-h-screen bg-background p-4 md:p-8 pb-16">
        <div className="container mx-auto max-w-6xl space-y-6 md:space-y-8">
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">Weather & Air Quality</h1>

          <LocationSearch />

          <DailyTip />

          <LocationWeatherAirQualityDisplay />

          <WeatherMetrics />

          <ForecastChart />

          <div className="grid gap-4 md:gap-6 lg:grid-cols-2">
            <PollenCount />
            <WeatherNews />
          </div>

          <SavedLocations />
        </div>
      </main>
    </>
  )
}

