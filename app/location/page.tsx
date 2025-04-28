"use client"

import { Cloud, Droplets, Info, Leaf, MapPin, Settings, Shield, Wind } from "lucide-react"

import { useState } from "react"
import Banner from "@/components/banner"
import { useSearchParams } from "next/navigation"

export default function AboutPage() {
  const params = useSearchParams()
  const latitude = params.get("lat")
  const longitude = params.get("long")
  const place = params.get("place")    

  return (
    <div className="min-h-screen bg-background">
      <Banner title={place!} />

    
    </div>
  )
}
