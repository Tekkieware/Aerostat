"use client"

import { Cloud, Droplets, Info, Leaf, MapPin, Settings, Shield, Wind } from "lucide-react"
import { motion } from "framer-motion"
import Banner from "@/components/banner"
import { useSearchParams } from "next/navigation"
import { Card } from "@/components/ui/card"

export default function AboutPage() {
  const params = useSearchParams()
  const latitude = params.get("lat")
  const longitude = params.get("long")
  const place = params.get("place")    

  return (
    <div className="min-h-screen bg-background">
      <Banner title={place!} />

      <main className="container mx-auto -mt-5 px-4 pb-16 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto max-w-full"
        >
          <Card className="border-none shadow-lg">
           
          </Card>
        </motion.div>
      </main>
    </div>
  )
}
