"use client"

import { Cloud, Droplets, Info, Leaf, MapPin, Settings, Shield, Wind } from "lucide-react"

import { useState } from "react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Banner from "@/components/banner"
import Link from "next/link"

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-background">
      <Banner title="About" />

      <main className="container mx-auto -mt-5 md:-mt-10 px-4 pb-16 relative">
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
                Weather & Air Quality App
              </CardTitle>
              <CardDescription className="text-base">
                Real-time environmental data to help you plan your day and make health-conscious decisions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="mt-2">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="info">Information</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-6 space-y-6">
                  <div className="rounded-lg bg-primary-100 p-6 dark:bg-muted">
                    <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-primary">
                      <Cloud className="h-5 w-5" />
                      Our Mission
                    </h3>
                    <p className="text-muted-foreground">
                      We provide accurate, real-time weather and air quality information to help you make informed
                      decisions about your outdoor activities and health. Our goal is to make environmental data
                      accessible and actionable for everyone.
                    </p>
                  </div>

                  <div>
                    <h3 className="mb-4 text-lg font-semibold">Data Sources</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="rounded-lg border bg-card p-4 transition-all hover:shadow-md">
                        <div className="mb-2 flex items-center gap-2">
                          <div className="rounded-full bg-primary/10 p-2">
                            <Cloud className="h-5 w-5 text-primary" />
                          </div>
                          <h4 className="font-medium">Weather Data</h4>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Provided by <a className=" text-primary" href="https://open-meteo.com/en/docs">Open Meteo</a> API with hourly updates and 7-day forecasts
                        </p>
                      </div>

                      <div className="rounded-lg border bg-card p-4 transition-all hover:shadow-md">
                        <div className="mb-2 flex items-center gap-2">
                          <div className="rounded-full bg-secondary/10 p-2">
                            <Wind className="h-5 w-5 text-secondary" />
                          </div>
                          <h4 className="font-medium">Air Quality Data</h4>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Sourced from <a className=" text-primary" href="https://open-meteo.com/en/docs/air-quality-api">Open Meteo</a> API with real-time pollutant measurements and health recommendations
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="features" className="mt-6">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {[
                      {
                        icon: <Cloud className="h-5 w-5" />,
                        title: "Weather Forecasts",
                        desc: "Real-time conditions and 7-day predictions",
                      },
                      {
                        icon: <Wind className="h-5 w-5" />,
                        title: "Air Quality Index",
                        desc: "AQI and detailed pollutant information",
                      },
                      {
                        icon: <MapPin className="h-5 w-5" />,
                        title: "Location Services",
                        desc: "Search and save multiple locations",
                      },
                      {
                        icon: <Droplets className="h-5 w-5" />,
                        title: "Precipitation Forcasts",
                        desc: "Timely rain/snow conditions and 7-day predictions",
                      },
                      {
                        icon: <Settings className="h-5 w-5" />,
                        title: "Customization",
                        desc: "Personalize units and mode preferences",
                      },
                    ].map((feature, i) => (
                      <motion.div
                        key={feature.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 * i }}
                        className="group rounded-lg border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-md"
                      >
                        <div className="mb-2 flex items-center gap-2">
                          <div className="rounded-full bg-primary/10 p-2 transition-colors group-hover:bg-primary/20">
                            <div className="text-primary">{feature.icon}</div>
                          </div>
                          <h4 className="font-medium">{feature.title}</h4>
                        </div>
                        <p className="text-sm text-muted-foreground">{feature.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="info" className="mt-6 space-y-6">
                  <div className="rounded-lg border bg-card p-6">
                    <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                      <Shield className="h-5 w-5 text-accent" />
                      Privacy Policy
                    </h3>
                    <p className="mb-4 text-muted-foreground">
                      This app uses your location data only to provide weather and air quality information for your
                      area. Your location data is not stored or shared with third parties.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      We respect your privacy and are committed to protecting your personal information. We do not
                      collect any unnecessary data and use industry-standard security measures to protect the data we do
                      collect.
                    </p>
                  </div>

                  <div>
                    <h3 className="mb-4 text-lg font-semibold">Contact Information</h3>
                    <div className="rounded-lg border bg-card p-6">
                      <p className="mb-4 text-muted-foreground">For support or feedback, please contact me via:</p>
                      <p className="font-medium text-primary">isaiahozadhe247@gmail.com</p>

                      <Separator className="my-6" />

                      <div className="flex flex-wrap gap-2">
                        <Link href="https://github.com/Tekkieware" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                          <Button variant="outline" size="sm" className="gap-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-github"
                            >
                              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                              <path d="M9 18c-4.51 2-5-2-7-2" />
                            </svg>
                            GitHub
                          </Button>
                        </Link>
                        <Link href="https://www.linkedin.com/in/isaiah-ozadhe" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                        <Button variant="outline" size="sm" className="gap-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-linkedin"
                          >
                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                            <rect width="4" height="12" x="2" y="9" />
                            <circle cx="4" cy="4" r="2" />
                          </svg>
                          LinkedIn
                        </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  )
}
