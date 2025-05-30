import { Suspense } from "react"
import LocationClient from "@/components/location-client"
import { Loader } from "lucide-react"

export default function LocationPage() {
  return (
    <Suspense fallback={<Loader className=" animate-spin" />}>
      <LocationClient />
    </Suspense>
  )
}
