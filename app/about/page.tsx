import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background p-4 md:p-8 pb-16">
        <div className="container mx-auto max-w-3xl space-y-6 md:space-y-8">
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary/20"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-2xl font-bold text-foreground md:text-3xl">About</h1>
          </div>

          <div className="rounded-xl bg-card p-4 md:p-6 shadow-sm">
            <div className="prose prose-sm max-w-none dark:prose-invert md:prose-base">
              <h2>Weather & Air Quality App</h2>
              <p>
                This application provides real-time weather and air quality information to help you plan your day and
                make health-conscious decisions based on your environment.
              </p>

              <h3>Data Sources</h3>
              <ul>
                <li>Weather data is provided by OpenWeatherMap API</li>
                <li>Air quality data is provided by AQICN API</li>
              </ul>

              <h3>Features</h3>
              <ul>
                <li>Real-time weather conditions and forecasts</li>
                <li>Air quality index (AQI) and pollutant information</li>
                <li>Location search and saved locations</li>
                <li>Weather and air quality maps</li>
                <li>Customizable settings (units, notifications, theme)</li>
              </ul>

              <h3>Privacy</h3>
              <p>
                This app uses your location data only to provide weather and air quality information for your area. Your
                location data is not stored or shared with third parties.
              </p>

              <h3>Contact</h3>
              <p>For support or feedback, please contact us at support@weatherairapp.com</p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

