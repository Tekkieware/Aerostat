import LocationSearch from "@/components/location-search"
import ForecastChart from "@/components/forecast-chart"
import SavedLocations from "@/components/saved-locations"
import DailyTip from "@/components/daily-tip"
import LocationWeatherAirQualityDisplay from "@/components/location-weather-air-quality-display"

export default function Home() {
  return (
    <>
      <main className="min-h-screen bg-background p-2 md:p-8 pb-16">
        <div className="sm:container px-2 mx-auto max-w-6xl space-y-6 md:space-y-8">
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">Weather & Air Quality</h1>

          <LocationSearch />

          <DailyTip />

          <LocationWeatherAirQualityDisplay />

          <ForecastChart />
          <SavedLocations />
        </div>
      </main>
    </>
  )
}

