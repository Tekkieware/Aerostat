import { AirQualityData, StoredLocationInfo, WeatherData } from "./types"
import { hasLocationChanged } from "./utils"

const LOCAL_STORAGE_KEY = "location-data"

/**
 * Funtion to get current location from local storage or device location with geo reversing
 * @returns location details
 */
export async function getCurrentLocationDetails(): Promise<StoredLocationInfo> {
  const storedRaw = localStorage.getItem(LOCAL_STORAGE_KEY)
  let stored: StoredLocationInfo | null = null

  if (storedRaw) {
    try {
      stored = JSON.parse(storedRaw)
    } catch {
      localStorage.removeItem(LOCAL_STORAGE_KEY)
    }
  }

  return new Promise<StoredLocationInfo>((resolve, reject) => {
    if (!navigator.geolocation) {
      return reject("Geolocation not supported")
    }

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        const currentCoords = {
          latitude: coords.latitude,
          longitude: coords.longitude,
        }

        console.log("RAW", coords)

        if (
          stored &&
          !hasLocationChanged(currentCoords, stored, 0.001)
        ) {
          return resolve(stored)
        }

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${coords.latitude}&lon=${coords.longitude}&format=json`
          )
          const data = await res.json()

          const location: StoredLocationInfo = {
            city: data.address.city || data.address.town || data.address.village || "",
            state: data.address.state || "",
            country: data.address.country,
            latitude: coords.latitude,
            longitude: coords.longitude,
          }

          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(location))
          return resolve(location)
        } catch (err) {
          reject("Reverse geocoding failed.")
        }
      },
      (err) => reject("Location access denied or unavailable.")
    )
  })
}

/**
 * 
 * @param locationData An object with location info
 * @returns weather data
 */
export const getWeatherData = async (locationData: StoredLocationInfo) => {
  try {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${locationData.latitude.toFixed(2)}&longitude=${locationData.longitude.toFixed(2)}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,wind_speed_10m,wind_direction_10m,weathercode`
    )
    const json: WeatherData = await res.json()
    return json
  } catch (error) {
    console.error("Error fetching weather data:", error)
    return;
  } 
}


export function getAqiCategory(aqi: number) {
  if (aqi <= 50) return "Good"
  if (aqi <= 100) return "Moderate"
  if (aqi <= 150) return "Unhealthy for Sensitive Groups"
  if (aqi <= 200) return "Unhealthy"
  if (aqi <= 300) return "Very Unhealthy"
  return "Hazardous"
}

export function getAqiRecommendation(aqi: number) {
  if (aqi <= 50) return "Air quality is good. It's a great day for outdoor activities!"
  if (aqi <= 100) return "Air quality is acceptable. Some pollutants may be a concern for a small number of sensitive individuals."
  if (aqi <= 150) return "Sensitive individuals should reduce prolonged outdoor exertion."
  if (aqi <= 200) return "Everyone may begin to experience health effects. Sensitive groups should avoid outdoor exertion."
  if (aqi <= 300) return "Health warnings of emergency conditions. The entire population is more likely to be affected."
  return "Serious health effects. Avoid all outdoor activities."
}

/**
 * Fetches the air quality index data
 * @param locationData The current location data
 */
export const getAirQuality = async (locationData: StoredLocationInfo) => {
  try {
    const res = await fetch(
      `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${locationData.latitude}&longitude=${locationData.longitude}&current=european_aqi,pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone`
    )
    const json: AirQualityData = await res.json()

    return json
  } catch (err) {
    console.error("Failed to fetch air quality", err)
  } 
}


export interface AqiData {
  aqi: number
  category: string
  pollutants: {
    pm25: number
    pm10: number
    o3: number
    no2: number
  }
  recommendation: string
}

export interface ForecastData {
  hourly: HourlyForecast[]
  daily: DailyForecast[]
}

export interface HourlyForecast {
  time: string
  temp: number
  precipitation: number
  aqi: number
}

export interface DailyForecast {
  day: string
  high: number
  low: number
  precipitation: number
  aqi: number
}

export interface Alert {
  id: number
  type: "warning" | "info"
  title: string
  description: string
  time: string
}



export async function getAqiData(locationId: string): Promise<AqiData> {
  // Mock implementation
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        aqi: 45,
        category: "Good",
        pollutants: {
          pm25: 12.5,
          pm10: 25.3,
          o3: 42.1,
          no2: 15.6,
        },
        recommendation: "Air quality is good. It's a great day for outdoor activities!",
      })
    }, 1000)
  })
}

export async function getForecastData(locationId: string): Promise<ForecastData> {
  // Mock implementation
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        hourly: [
          { time: "Now", temp: 24, precipitation: 0, aqi: 45 },
          { time: "1 PM", temp: 25, precipitation: 0, aqi: 46 },
          { time: "2 PM", temp: 26, precipitation: 0, aqi: 48 },
          { time: "3 PM", temp: 27, precipitation: 0, aqi: 50 },
          { time: "4 PM", temp: 26, precipitation: 10, aqi: 52 },
          { time: "5 PM", temp: 25, precipitation: 30, aqi: 55 },
          { time: "6 PM", temp: 24, precipitation: 20, aqi: 53 },
          { time: "7 PM", temp: 22, precipitation: 10, aqi: 51 },
          { time: "8 PM", temp: 21, precipitation: 0, aqi: 49 },
          { time: "9 PM", temp: 20, precipitation: 0, aqi: 47 },
          { time: "10 PM", temp: 19, precipitation: 0, aqi: 46 },
          { time: "11 PM", temp: 18, precipitation: 0, aqi: 45 },
        ],
        daily: [
          { day: "Today", high: 27, low: 18, precipitation: 20, aqi: 45 },
          { day: "Tue", high: 26, low: 17, precipitation: 30, aqi: 50 },
          { day: "Wed", high: 25, low: 16, precipitation: 40, aqi: 55 },
          { day: "Thu", high: 24, low: 15, precipitation: 10, aqi: 48 },
          { day: "Fri", high: 23, low: 14, precipitation: 0, aqi: 42 },
          { day: "Sat", high: 22, low: 13, precipitation: 0, aqi: 40 },
          { day: "Sun", high: 24, low: 14, precipitation: 0, aqi: 44 },
        ],
      })
    }, 1000)
  })
}

export async function getAlertsData(locationId: string): Promise<Alert[]> {
  // Mock implementation
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          type: "warning",
          title: "Heavy Rain",
          description: "Heavy rainfall expected in the next 24 hours with potential for localized flooding.",
          time: "Valid until: Jul 10, 7:00 PM",
        },
        {
          id: 2,
          type: "info",
          title: "Air Quality Advisory",
          description:
            "Sensitive groups should limit prolonged outdoor exertion due to moderate air quality conditions.",
          time: "Valid until: Jul 11, 8:00 AM",
        },
      ])
    }, 1000)
  })
}

export async function searchLocations(query: string): Promise<any[]> {
  // Mock implementation
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: "nyc", name: "New York", country: "US" },
        { id: "nyb", name: "New Brunswick", country: "US" },
        { id: "nyn", name: "New Haven", country: "US" },
      ])
    }, 500)
  })
}

