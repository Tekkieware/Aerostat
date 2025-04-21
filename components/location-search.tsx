"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function LocationSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  // Simulated search suggestions
  const handleSearch = (query: string) => {
    setSearchQuery(query)

    if (query.length > 2) {
      // In a real app, this would call an API
      const mockSuggestions = [
        `${query}, New York, US`,
        `${query}, California, US`,
        `${query}, London, UK`,
        `${query}, Tokyo, Japan`,
      ]
      setSuggestions(mockSuggestions)
      setShowSuggestions(true)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }

  const handleSelectLocation = (location: string) => {
    setSearchQuery(location)
    setSuggestions([])
    setShowSuggestions(false)
    // In a real app, this would navigate to the location or update the current view
  }

  return (
    <div className="relative">
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-muted-foreground" />
          </div>
          <Input
            type="text"
            placeholder="Search for a location..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10"
            onFocus={() => searchQuery.length > 2 && setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          />
        </div>
        <Button type="submit" className="sm:w-auto">
          Search
        </Button>
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 rounded-md bg-card shadow-lg border border-border">
          <ul className="py-1">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-primary/10 cursor-pointer text-sm"
                onClick={() => handleSelectLocation(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

