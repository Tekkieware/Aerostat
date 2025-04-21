import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import SettingsForm from "@/components/settings-form"

export default function SettingsPage() {
  return (
    <>
      <main className="min-h-screen bg-background p-4 md:p-8 pb-16">
        <div className="container mx-auto max-w-3xl space-y-6 md:space-y-8">
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary/20"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-2xl font-bold text-foreground md:text-3xl">Settings</h1>
          </div>

          <div className="rounded-xl bg-card p-4 md:p-6 shadow-sm">
            <SettingsForm />
          </div>
        </div>
      </main>
    </>
  )
}

