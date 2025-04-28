"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
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

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium text-foreground">Saved Locations</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {savedLocations.map((location, index) => (
          <Link
            href={`/location?place=${location.display_name}&lat=${location.latitude}&long=${location.longitude}`}
            key={`${location.latitude}-${location.longitude}-${index}`}
          >
            <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
              <CardContent className="p-3 md:p-4">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium">{location.display_name}</h3>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      Lat: {location.latitude.toFixed(2)}, Long: {location.longitude.toFixed(2)}
                    </p>
                  </div>
                  <div className="text-right">
                    {/* Put more info here later */}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
