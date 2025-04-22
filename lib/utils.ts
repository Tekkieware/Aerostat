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
