"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { useForm } from "react-hook-form"
import { useTheme } from "next-themes"
import { CheckCircle } from "lucide-react"

interface SettingsFormValues {
  units: string
  darkMode: string
}

export default function SettingsForm() {
  const [isSaving, setIsSaving] = useState(false)
  const { setTheme, theme } = useTheme()
  const [temperatureUnit, setTemperatureUnit] = useState<string>()
  const [mounted, setMounted] = useState(false)
  const [success, setSuccess] = useState(false)

  const form = useForm<SettingsFormValues>({
    defaultValues: {
      units: "C",
      darkMode: theme,
    },
  })

  useEffect(() => {
    setMounted(true)
    const savedUnit = localStorage.getItem('temperature-unit') || "C"
    setTemperatureUnit(savedUnit)
  }, [])


  useEffect(() => {
    if (mounted && temperatureUnit) {
      form.reset({
        units: temperatureUnit,
        darkMode: theme,
      })
    }
  }, [mounted, temperatureUnit, theme, form])

  function onSubmit(data: SettingsFormValues) {
    setIsSaving(true);

    let hasChanges = false;

    if (theme !== data.darkMode) {
      setTheme(data.darkMode);
      hasChanges = true;
    }

    if (temperatureUnit !== data.units) {
      localStorage.setItem('temperature-unit', data.units);
      hasChanges = true;
    }

    if (hasChanges) {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    }

    setIsSaving(false);
  }


  return (
    <>
      {mounted &&

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
                      value={field.value}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="C" />
                        </FormControl>
                        <FormLabel className="font-normal text-sm md:text-base">Celsius (°C)</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="F" />
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

            <div className="flex justify-between">
              <div className="flex gap-1 items-center animate-pulse">
                {success &&
                  <>
                    <CheckCircle color="#16a34a" size={20} />
                    <p className=" text-green-600 font-semibold text-sm">Preference saved</p>
                  </>
                }
              </div>
              <Button type="submit" disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Settings"}
              </Button>
            </div>
          </form>
        </Form>
      }
    </>
  )
}

