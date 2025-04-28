"use client"

import { useEffect, useRef, useState } from "react"
import { Search, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Location } from "@/lib/types"
import { useRouter } from "next/navigation"

export default function LocationSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const [suggestions, setSuggestions] = useState<Location[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [loading, setLoading] = useState(false)
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)  
  const suggestionsRef = useRef<HTMLDivElement | null>(null)  
  const router = useRouter()

 
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (searchQuery.length <= 2) {
      setSuggestions([])
      setShowSuggestions(false)
      return
    }

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current)
    }

 
    if (document.activeElement === inputRef.current) {
      debounceTimeout.current = setTimeout(() => {
        fetchSuggestions(searchQuery)
      }, 3000)
    }

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current)
      }
    }
  }, [searchQuery])

  const fetchSuggestions = async (query: string) => {
    setLoading(true)
    try {
      const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}`
      )
      const data = await res.json()

      if (data.results) {
        setSuggestions(data.results)
        setShowSuggestions(true)
      } else {
        setSuggestions([])
        setShowSuggestions(false)
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error)
      setSuggestions([])
      setShowSuggestions(false)
    } finally {
      setLoading(false)
    }
  }

  const handleSelectLocation = (location: Location) => {
    const displayName = `${location.name}, ${location.admin1 ?? ""}, ${location.country}`
      .replace(/,\s*,/g, ",")
      .trim()

    setSearchQuery(displayName)
    setSuggestions([])
    setShowSuggestions(false)
    router.push(`/location?place=${displayName}&lat=${location.latitude}&long=${location.longitude}`)
  }

  return (
    <div className="relative">
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            {loading ? (
              <Loader2 className="h-4 w-4 text-muted-foreground animate-spin" />
            ) : (
              <Search className="h-4 w-4 text-muted-foreground" />
            )}
          </div>
          <Input
            ref={inputRef}  
            type="text"
            placeholder="Search for a location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
            onFocus={() => searchQuery.length > 2 && setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            disabled={loading}
          />
        </div>
        <Button type="submit" className="sm:w-auto" disabled={loading}>
          Search
        </Button>
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}  
          className="absolute z-10 w-full mt-1 rounded-md bg-card shadow-lg border border-border"
        >
          <ul className="py-1">
            {suggestions.map((loc) => {
              const displayName = `${loc.name}, ${loc.admin1 ?? ""}, ${loc.country}`
                .replace(/,\s*,/g, ",")
                .trim()

              return (
                <li
                  key={loc.id}
                  className="px-4 py-2 hover:bg-primary/10 cursor-pointer text-sm"
                  onClick={() => handleSelectLocation(loc)}
                >
                  {displayName}
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}
