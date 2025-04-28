"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Trash2 } from "lucide-react"; // Import trash icon
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type StoredLocationInfo = {
  latitude: number;
  longitude: number;
  display_name: string;
};

export default function SavedLocations() {
  const [savedLocations, setSavedLocations] = useState<StoredLocationInfo[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("stored-locations");
    if (stored) {
      const parsed: StoredLocationInfo[] = JSON.parse(stored);
      setSavedLocations(parsed);
    }
  }, []);

  const handleDelete = (latitude: number, longitude: number) => {
    const updated = savedLocations.filter(
      (loc) => loc.latitude !== latitude || loc.longitude !== longitude
    );
    setSavedLocations(updated);
    localStorage.setItem("stored-locations", JSON.stringify(updated));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium text-foreground">Saved Locations</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {savedLocations.map((location, index) => (
          <Card
            key={`${location.latitude}-${location.longitude}-${index}`}
            className="relative hover:bg-muted/50 transition-colors"
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault(); 
                handleDelete(location.latitude, location.longitude);
              }}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
            >
              <Trash2 size={18} />
            </button>
            <Link
              href={`/location?place=${location.display_name}&lat=${location.latitude}&long=${location.longitude}`}
              className="block"
            >
              <CardContent className="p-3 md:p-4">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium">{location.display_name}</h3>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      Lat: {location.latitude.toFixed(2)}, Long: {location.longitude.toFixed(2)}
                    </p>
                  </div>
                  <div className="text-right">
                    {/* Put additional info here later */}
                  </div>
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
