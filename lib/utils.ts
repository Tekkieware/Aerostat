import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { StoredLocationInfo, UVLevel } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



export function hasLocationChanged(
  newLoc: { latitude: number; longitude: number },
  oldLoc: StoredLocationInfo,
  delta = 0.001 
): boolean {
  return (
    Math.abs(newLoc.latitude - oldLoc.latitude) > delta ||
    Math.abs(newLoc.longitude - oldLoc.longitude) > delta
  )
}


/**
 * Function to convert Celsius to Fahrenheit
 * @param celsius the temperature in celcius
 * @returns the temperature in fahrenheit
 */
export const toFahrenheit = (celsius: number) => (celsius * 9) / 5 + 32

/**
 * Function to convert wind direction, given as degrees, into a cardinal direction
 * @param degrees wind direction in degrees
 * @returns wind cardinal direction
 */
export function getWindDirection(degrees: number): string {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
  const index = Math.round(degrees / 45) % 8
  return directions[index]
}


 // Helper function to determine color based on AQI
 export const getAqiColor = (aqi: number) => {
  if (aqi <= 50) return "bg-secondary text-secondary-foreground"
  if (aqi <= 100) return "bg-yellow-500 text-yellow-50"
  if (aqi <= 150) return "bg-orange-500 text-orange-50"
  return "bg-accent text-accent-foreground"
}




 // Helper function to determine progress color based on AQI
 export const getProgressColor = (aqi: number) => {
  if (aqi <= 50) return "bg-secondary"
  if (aqi <= 100) return "bg-yellow-500"
  if (aqi <= 150) return "bg-orange-500"
  return "bg-accent"
}

export const uvIndexMap: UVLevel[] = [
  {
    min: 0,
    max: 2.9,
    risk: 'Low',
    color: '#2ECC71', 
    advice: 'With low UV levels. You can safely enjoy being outside!',
  },
  {
    min: 3,
    max: 5.9,
    risk: 'Moderate',
    color: '#F1C40F', 
    advice: 'With moderate UV levels. Seek shade during midday hours, cover up and wear sunscreen.',
  },
  {
    min: 6,
    max: 7.9,
    risk: 'High',
    color: '#E67E22', 
    advice: 'With high UV levels. Reduce time in the sun between 10 a.m. and 4 p.m. Wear SPF 30+ sunscreen, sunglasses, and protective clothing.',
  },
  {
    min: 8,
    max: 10.9,
    risk: 'Very High',
    color: '#E74C3C', 
    advice: 'With high UV levels. Take extra precautions. Avoid sun exposure during midday hours. Cover up and use broad-spectrum SPF 30+ sunscreen.',
  },
  {
    min: 11,
    max: Infinity,
    risk: 'Extreme',
    color: '#E74C3C', 
    advice: 'With high UV levels. Try to avoid being outside during midday. Full protection is essential: wear SPF 50+, hat, sunglasses, and seek shade.',
  },
];

//Get UV index risk data 
export function getUVRiskLevel(index: number ) {
  return uvIndexMap.find((level) => index >= level.min && index <= level.max);
}

//Get current UV index
export const getCurrentUVIndex = (time: string[], uv_index_max: number[]) => {
  const today = new Date().toISOString().split("T")[0]; 
  const index = time.findIndex((date: string) => date === today);
  const uvToday = uv_index_max[index];
  return uvToday;
}

//Get humidy level
export const getHumidityLevel = (humidity: number): string => {
  if (humidity < 30) return "Low";
  if (humidity >= 30 && humidity < 60) return "Moderate";
  if (humidity >= 60 && humidity <= 100) return "High";
  return "Unknown";
}

//Get tenmperature level
export const getTemperatureLevel = (
  temp: number,
  unit: string
): string => {
  const celsius = unit === "F" ? (temp - 32) * (5 / 9) : temp;

  if (celsius < 0) return "Freezing ❄️";
  if (celsius >= 0 && celsius < 10) return "Cold 🧥";
  if (celsius >= 10 && celsius < 20) return "Cool 🌬️";
  if (celsius >= 20 && celsius < 30) return "Warm ☀️";
  if (celsius >= 30 && celsius < 40) return "Hot 🔥";
  if (celsius >= 40) return "Extreme Heat 🥵";

  return "Unknown";
};
