"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { useForm } from "react-hook-form"

interface SettingsFormValues {
  units: "metric" | "imperial"
  notifications: boolean
  darkMode: "system" | "dark" | "light"
  saveHistory: boolean
}

export default function SettingsForm() {
  const [isSaving, setIsSaving] = useState(false)

  const form = useForm<SettingsFormValues>({
    defaultValues: {
      units: "metric",
      notifications: true,
      darkMode: "light",
      saveHistory: true,
    },
  })

  function onSubmit(data: SettingsFormValues) {
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      console.log(data)
      setIsSaving(false)
      // In a real app, you would save to localStorage or an API
    }, 1000)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 md:space-y-8">
        <FormField
          control={form.control}
          name="units"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-base">Temperature Units</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="metric" />
                    </FormControl>
                    <FormLabel className="font-normal text-sm md:text-base">Celsius (°C)</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="imperial" />
                    </FormControl>
                    <FormLabel className="font-normal text-sm md:text-base">Fahrenheit (°F)</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="darkMode"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-base">Theme Preference</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="system" />
                    </FormControl>
                    <FormLabel className="font-normal text-sm md:text-base">System (Follow device setting)</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="light" />
                    </FormControl>
                    <FormLabel className="font-normal text-sm md:text-base">Light Mode</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="dark" />
                    </FormControl>
                    <FormLabel className="font-normal text-sm md:text-base">Dark Mode</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />

        <div className="space-y-3 md:space-y-4">
          <FormField
            control={form.control}
            name="notifications"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 md:p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-sm md:text-base">Weather Alerts</FormLabel>
                  <FormDescription className="text-xs md:text-sm">
                    Receive notifications about severe weather conditions
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="saveHistory"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 md:p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-sm md:text-base">Save Search History</FormLabel>
                  <FormDescription className="text-xs md:text-sm">Save your recent location searches</FormDescription>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Settings"}
          </Button>
        </div>
      </form>
    </Form>
  )
}

