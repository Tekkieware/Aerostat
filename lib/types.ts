export type Location = {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    elevation: number;
    feature_code: string;
    country_code: string;
    timezone: string;
    country_id: number;
    country: string;
    population?: number;
  } & {
    [key: `admin${number}`]: string | undefined;
  } & {
    [key: `admin${number}_id`]: number | undefined;
  };
  
  interface WeatherUnits {
    time: string
    interval: string
    temperature_2m: string
    relative_humidity_2m: string
    apparent_temperature: string
    precipitation: string
    wind_speed_10m: string
    wind_direction_10m: string
    weathercode: string
  }
  
  interface WeatherValues {
    time: string
    interval: number
    temperature_2m: number
    relative_humidity_2m: number
    apparent_temperature: number
    precipitation: number
    wind_speed_10m: number
    wind_direction_10m: number
    weathercode: number
  }
  
  export interface WeatherData {
    latitude: number
    longitude: number
    generationtime_ms: number
    utc_offset_seconds: number
    timezone: string
    timezone_abbreviation: string
    elevation: number
    current_units: WeatherUnits
    current: WeatherValues
  }
  

  export type StoredLocationInfo = {
    city: string
    country: string
    state: string
    latitude: number
    longitude: number
  }


  export interface AirQualityData {
    latitude: number
    longitude: number
    generationtime_ms: number
    utc_offset_seconds: number
    timezone: string
    timezone_abbreviation: string
    elevation: number
    current_units: {
      time: string
      european_aqi: string
      pm10: string
      pm2_5: string
      carbon_monoxide: string
      nitrogen_dioxide: string
      sulphur_dioxide: string
      ozone: string
    }
    current: {
      time: string
      european_aqi: number
      pm10: number
      pm2_5: number
      carbon_monoxide: number
      nitrogen_dioxide: number
      sulphur_dioxide: number
      ozone: number
    }
  }
  