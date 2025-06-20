"use client";
import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { CheckCircle, Plus } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { StoredLocationInfo } from '@/lib/types';

const SaveLocationButton = () => {
  const params = useSearchParams();
  const latitude = params.get("lat");
  const longitude = params.get("long");
  const place = params.get("place");

  const locationData: StoredLocationInfo = {
    latitude: Number(latitude),
    longitude: Number(longitude),
    display_name: place!,
  };

  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (!isNaN(locationData.latitude) && !isNaN(locationData.longitude)) {
      const saved = isLocationSaved(locationData.latitude, locationData.longitude);
      setIsSaved(saved);
    }
  }, [latitude, longitude, isSaved]);
  const handleSave = () => {
    if (!latitude || !longitude || !place) {
      console.error("Missing location data");
      return;
    }
  

    const stored = localStorage.getItem("stored-locations");
    let locations: StoredLocationInfo[] = stored ? JSON.parse(stored) : [];
  
    const exists = locations.some(
      (loc) =>
        loc.latitude === locationData.latitude &&
        loc.longitude === locationData.longitude
    );
  
    if (exists) {
      console.log("Location already saved!");
      return;
    }
  
    locations.push(locationData);
    localStorage.setItem("stored-locations", JSON.stringify(locations));
  
    console.log("Location saved:", locationData);
    setIsSaved(true)
  };

  function isLocationSaved(latitude: number, longitude: number): boolean {
    if (typeof window === "undefined") return false;
    const stored = localStorage.getItem("stored-locations");
    if (!stored) return false;
  
    const savedLocations = JSON.parse(stored) as { latitude: number; longitude: number }[];
  
    return savedLocations.some(
      (loc) => loc.latitude === latitude && loc.longitude === longitude
    );
  }

  
  return (
    <>
    {isSaved ? 
      <div className="flex items-center gap-1 w-full justify-center py-5 rounded-sm border-2 border-green-700 text-green-700">
        <CheckCircle color='#15803d' />
      <p className=' font-bold text-sm text-green-700'>Saved location</p>
      </div>
    :

    <div className="flex w-full justify-end">
      <Button variant="outline" size="sm" onClick={handleSave}>
        <Plus className="h-4 w-4 mr-2" />
        Save Location
      </Button>
    </div>
    }
    </>
  );
};

export default SaveLocationButton;
