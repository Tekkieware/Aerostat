"use client"

import {Cloud, Droplets, Info, Leaf, MapPin, Settings, Shield, Wind } from "lucide-react"

import { useState } from "react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Banner from "@/components/banner"
import SettingsForm from "@/components/settings-form"

export default function SettingsPage() {


  return (
    <div className="min-h-screen bg-background">
      <Banner title="Settings" />

      <main className="container mx-auto -mt-10 px-4 pb-16 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto max-w-4xl"
        >
          <Card className="border-none shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-2xl font-bold">
                <Info className="h-5 w-5 text-primary" />
                Customize Your Experience
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SettingsForm />
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  )
}
