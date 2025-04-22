export type LocationResult = {
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
  
  