"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { mockListings, mockRestaurants } from "@/lib/mock-data"
import { FoodListingCard } from "@/components/food-listing-card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, X } from "lucide-react"
import type { FoodListing } from "@/lib/types"

export default function MarketplacePage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [listings, setListings] = useState<FoodListing[]>(mockListings)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedDiet, setSelectedDiet] = useState<string>("all")
  const [favoriteRestaurants, setFavoriteRestaurants] = useState<string[]>([])

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
    if (user && user.favoriteRestaurants) {
      setFavoriteRestaurants(user.favoriteRestaurants)
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  if (!user) return null

  const categories = ["all", ...Array.from(new Set(mockListings.map((l) => l.category)))]
  const dietaryOptions = ["all", "vegetarian", "vegan", "gluten-free"]

  const filteredListings = listings.filter((listing) => {
    const matchesSearch =
      searchQuery === "" ||
      listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = selectedCategory === "all" || listing.category === selectedCategory

    const matchesDiet =
      selectedDiet === "all" || listing.dietaryInfo.some((info) => info.toLowerCase() === selectedDiet.toLowerCase())

    return matchesSearch && matchesCategory && matchesDiet
  })

  const sortedListings = [...filteredListings].sort((a, b) => {
    const aIsFavorite = favoriteRestaurants.includes(a.restaurantId)
    const bIsFavorite = favoriteRestaurants.includes(b.restaurantId)

    if (aIsFavorite && !bIsFavorite) return -1
    if (!aIsFavorite && bIsFavorite) return 1
    return 0
  })

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategory("all")
    setSelectedDiet("all")
  }

  const hasActiveFilters = searchQuery !== "" || selectedCategory !== "all" || selectedDiet !== "all"

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Discover Surplus Food</h1>
          <p className="text-lg text-muted-foreground">Save money on quality meals from local restaurants</p>
        </div>

        {/* Filters */}
        <div className="bg-card border border-border rounded-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search for food..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat === "all" ? "All Categories" : cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedDiet} onValueChange={setSelectedDiet}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Dietary" />
              </SelectTrigger>
              <SelectContent>
                {dietaryOptions.map((diet) => (
                  <SelectItem key={diet} value={diet}>
                    {diet === "all" ? "All Diets" : diet.charAt(0).toUpperCase() + diet.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {hasActiveFilters && (
            <div className="flex items-center gap-2 mt-4">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {searchQuery && (
                <Badge variant="secondary" className="gap-1">
                  Search: {searchQuery}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSearchQuery("")} />
                </Badge>
              )}
              {selectedCategory !== "all" && (
                <Badge variant="secondary" className="gap-1">
                  {selectedCategory}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCategory("all")} />
                </Badge>
              )}
              {selectedDiet !== "all" && (
                <Badge variant="secondary" className="gap-1">
                  {selectedDiet}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedDiet("all")} />
                </Badge>
              )}
              <button onClick={clearFilters} className="text-sm text-primary hover:underline ml-2">
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            {sortedListings.length} {sortedListings.length === 1 ? "listing" : "listings"} available
          </p>
        </div>

        {/* Listings Grid */}
        {sortedListings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedListings.map((listing) => {
              const restaurant = mockRestaurants.find((r) => r.id === listing.restaurantId)
              return (
                <FoodListingCard
                  key={listing.id}
                  listing={listing}
                  restaurant={restaurant}
                  isFavorite={favoriteRestaurants.includes(listing.restaurantId)}
                  onToggleFavorite={(restaurantId) => {
                    setFavoriteRestaurants((prev) =>
                      prev.includes(restaurantId) ? prev.filter((id) => id !== restaurantId) : [...prev, restaurantId],
                    )
                  }}
                />
              )
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground mb-4">No listings found matching your criteria</p>
            <button onClick={clearFilters} className="text-primary hover:underline">
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
