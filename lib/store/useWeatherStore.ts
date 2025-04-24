import { create } from 'zustand'
import { WeatherData, weatherState } from '../types'


export const useWeatherStore = create<weatherState>((set, get) => ({
  isLoadingLocationData: false,
  fetchLocationData: async (latitude: number, longitude: number) => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    set({ isLoadingLocationData: true })
    if(get().locationData){
      set({ isLoadingLocationData: false })
      return;
    }
    try {
      const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude.toFixed(2)}&longitude=${longitude.toFixed(2)}&hourly=temperature_2m,precipitation_probability&daily=precipitation_probability_max,temperature_2m_max,uv_index_max&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_direction_10m,surface_pressure&timezone=auto`)
      const data: WeatherData = await res.json()
      set({ locationData: data })
    } catch (error) {
      console.error('Failed to fetch location weather Data', error)
    } finally {
      set({ isLoadingLocationData: false })
    }
  }
}))
