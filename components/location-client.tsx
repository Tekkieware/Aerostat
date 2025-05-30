"use client"

import { motion } from "framer-motion"
import Banner from "@/components/banner"
import { useSearchParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import LocationDailyTip from "@/components/location-daily-tip"
import CurrentWeatherAirQualityDisplay from "@/components/current-weather-air-quality-display"
import CurrentForecastChart from "@/components/current-forecast-chart"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import SaveLocationButton from "@/components/save-location-button"

export default function AboutPage() {
    const params = useSearchParams()
    const latitude = params.get("lat")
    const longitude = params.get("long")
    const place = params.get("place")


    if (latitude === "" || longitude === "" || place === "") {
        return <p className=" text-xs font-bold text-red-500">Invalid Location!</p>
    }

    return (
        <div className="min-h-screen bg-background">
            <Banner title={place!} />

            <main className="container mx-auto -mt-5 px-4 pb-16 relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mx-auto max-w-6xl space-y-6 md:space-y-8"
                >
                    <Card className="border-none shadow-lg p-5 flex flex-col gap-5">
                        <LocationDailyTip />
                        <CurrentWeatherAirQualityDisplay />
                        <CurrentForecastChart />
                        <SaveLocationButton />
                    </Card>
                </motion.div>
            </main>
        </div>
    )
}
