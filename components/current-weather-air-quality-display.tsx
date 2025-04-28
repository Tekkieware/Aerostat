"use client"

import { useEffect, useState } from "react"
import AirQualityDisplay from "./air-quality-display"
import { StoredLocationInfo } from "@/lib/types"
import { useSearchParams } from "next/navigation"
import LocationWeather from "./location-weather"

const CurrentWeatherAirQualityDisplay = () => {
    const [fetching, setFetching] = useState(false)
    const params = useSearchParams()
    const latitude = params.get("lat")
    const longitude = params.get("long")
    const place = params.get("place")
    const locationData: StoredLocationInfo = {"latitude": Number(latitude), "longitude": Number(longitude), "display_name": place!}
    return (
        <div className="grid gap-4 md:gap-6 md:grid-cols-2">
            <LocationWeather fetchingLocationData={fetching} locationData={locationData!} />
            <AirQualityDisplay fetchingLocationData={fetching} locationData={locationData!} />
        </div>
    )
}

export default CurrentWeatherAirQualityDisplay