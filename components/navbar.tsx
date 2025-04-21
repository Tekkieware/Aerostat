"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Settings, Info, Menu, X } from "lucide-react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"

export function Navbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const routes = [
    {
      href: "/",
      label: "Home",
      icon: <Home className="h-5 w-5 mr-2" />,
      active: pathname === "/",
    },
    {
      href: "/settings",
      label: "Settings",
      icon: <Settings className="h-5 w-5 mr-2" />,
      active: pathname === "/settings",
    },
    {
      href: "/about",
      label: "About",
      icon: <Info className="h-5 w-5 mr-2" />,
      active: pathname === "/about",
    },
  ]

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="font-bold text-xl text-foreground">
            Atmosphere
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-6">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center text-sm font-medium transition-colors hover:text-primary",
                route.active ? "text-primary" : "text-muted-foreground",
              )}
            >
              {route.icon}
              {route.label}
            </Link>
          ))}
          {mounted && <ThemeToggle />}
        </div>

        {/* Mobile Navigation */}
        <div className="flex items-center gap-2 md:hidden">
          {mounted && <ThemeToggle />}
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="container md:hidden py-4 border-t">
          <div className="flex flex-col space-y-4">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "flex items-center text-sm font-medium transition-colors hover:text-primary p-2 rounded-md",
                  route.active ? "bg-primary/10 text-primary" : "text-muted-foreground",
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {route.icon}
                {route.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

