import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { StoredLocationInfo } from "./types";

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
function getWindDirection(degrees: number): string {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
  const index = Math.round(degrees / 45) % 8
  return directions[index]
}