"use client"
import { Settings, Settings2 } from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Banner from "@/components/banner"
import SettingsForm from "@/components/settings-form"

export default function SettingsPage() {


  return (
    <div className="min-h-screen bg-background">
      <Banner title="Settings" />

      <main className="sm:container mx-auto -mt-5 md:-mt-10 px-4 pb-16 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto max-w-4xl"
        >
          <Card className="border-none shadow-lg">
            <CardHeader className="pb-5">
              <CardTitle className="flex items-center gap-2 text-2xl font-bold">
                <Settings className="h-5 w-5 text-primary" />
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
