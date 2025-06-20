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
  
  export type WeatherData = {
    latitude: number;
    longitude: number;
    generationtime_ms: number;
    utc_offset_seconds: number;
    timezone: string;
    timezone_abbreviation: string;
    elevation: number;
    current_units: {
      time: string;
      interval: string;
      temperature_2m: string;
      relative_humidity_2m: string;
      apparent_temperature: string;
      precipitation: string;
      weather_code: string;
      wind_speed_10m: string;
      wind_direction_10m: string;
      surface_pressure: string;
    };
    current: {
      time: string;
      interval: number;
      temperature_2m: number;
      relative_humidity_2m: number;
      apparent_temperature: number;
      precipitation: number;
      weather_code: number;
      wind_speed_10m: number;
      wind_direction_10m: number;
      surface_pressure: number;
    };
    hourly_units: {
      time: string;
      temperature_2m: string;
      precipitation_probability: string;
    };
    hourly: {
      time: string[];
      temperature_2m: number[];
      precipitation_probability: number[];
    };
    daily_units: {
        time: string,
        precipitation_probability_max: string,
        temperature_2m_max: string,
        uv_index_max: string 
    },
    daily: {
        time: string[],
        precipitation_probability_max: number[],
        temperature_2m_max: number[],
        uv_index_max: number[]
    }
  };
  
  

  export type StoredLocationInfo = {
    display_name: string
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
  

  export type UVLevel = {
    min: number;
    max: number;
    risk: string;
    color: string;
    advice: string;
  };


  export type weatherState = {
    locationData?: WeatherData;
    currentData?: WeatherData;
    isLoadingLocationData: boolean;
    isLoadingCurrentData: boolean;
    fetchLocationData: (latitude: number, longitude: number)=> Promise<void>;
    fetchCurrentData: (latitude: number, longitude: number)=> Promise<void>;
  };