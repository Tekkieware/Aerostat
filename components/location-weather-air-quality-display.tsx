"use client"

import { useEffect, useState } from "react"
import AirQualityDisplay from "./air-quality-display"
import CurrentWeather from "./current-weather"
import { StoredLocationInfo } from "@/lib/types"
import { getCurrentLocationDetails } from "@/lib/data"
import { json } from "stream/consumers"

const LocationWeatherAirQualityDisplay = () => {
    const [locationData, setLocationData] = useState<StoredLocationInfo>()
    const [fetching, setFetching] = useState(false)
    useEffect(() => {
        setFetching(true)
        getCurrentLocationDetails().then((data)=>{
            setLocationData(data)
            setFetching(false)
        })
    }, [])
    return (
        <div className="grid gap-4 md:gap-6 md:grid-cols-2">
            <CurrentWeather fetchingLocationData={fetching} locationData={locationData!} />
            <AirQualityDisplay />
        </div>
    )
}

export default LocationWeatherAirQualityDisplay