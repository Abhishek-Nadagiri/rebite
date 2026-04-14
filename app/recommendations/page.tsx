"use client"

import { useAuth } from "@/lib/auth-context"
import { mockListings, mockRestaurants } from "@/lib/mock-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Zap, TrendingUp, Heart } from "lucide-react"
import { useState } from "react"

export default function RecommendationsPage() {
  const { user } = useAuth()
  const [savedItems, setSavedItems] = useState<string[]>([])

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">Please log in to see recommendations.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const toggleSave = (listingId: string) => {
    setSavedItems((prev) =>
      prev.includes(listingId) ? prev.filter((id) => id !== listingId) : [...prev, listingId]
    )
  }

  // Mock recommendations with scores
  const recommendations = mockListings.map((listing) => ({
    ...listing,
    recommendation: "Based on your preferences",
    score: Math.floor(Math.random() * 30 + 70),
    reason: [
      "Matches your dietary preferences",
      "Popular in your area",
      "Great value",
      "New restaurant you follow",
    ][Math.floor(Math.random() * 4)],
  }))

  const categories = [
    { name: "Just For You", icon: "⭐", color: "bg-yellow-100 dark:bg-yellow-950/30" },
    { name: "New Arrivals", icon: "🆕", color: "bg-blue-100 dark:bg-blue-950/30" },
    { name: "Trending", icon: "🔥", color: "bg-red-100 dark:bg-red-950/30" },
    { name: "Great Deals", icon: "💰", color: "bg-green-100 dark:bg-green-950/30" },
  ]

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Smart Recommendations</h1>
          <p className="text-muted-foreground">
            Personalized deals based on your preferences, dietary needs, and purchase history
          </p>
        </div>

        {/* Category Filter */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.name}
              className={`p-4 rounded-lg border-2 border-border hover:border-orange-500 transition-colors text-left ${cat.color}`}
            >
              <p className="text-2xl mb-2">{cat.icon}</p>
              <p className="font-semibold text-foreground">{cat.name}</p>
            </button>
          ))}
        </div>

        {/* Why These Recommendations? */}
        <Card className="mb-8 border-blue-500/30 bg-blue-50/50 dark:bg-blue-950/10">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <Zap className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">How We Recommend</h3>
                <p className="text-sm text-muted-foreground">
                  Our AI analyzes your purchase history, dietary preferences (vegetarian, gluten-free), favorite
                  restaurants, and what&apos;s trending in your area to show you deals you&apos;ll love.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recommendations Grid */}
        <div className="space-y-6">
          {recommendations.map((listing) => {
            const restaurant = mockRestaurants.find((r) => r.id === listing.restaurantId)
            const isSaved = savedItems.includes(listing.id)

            return (
              <Card key={listing.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="md:grid md:grid-cols-4 gap-6">
                  {/* Image */}
                  <div className="h-48 md:h-auto bg-muted overflow-hidden">
                    <img
                      src={listing.image}
                      alt={listing.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>

                  {/* Content */}
                  <div className="md:col-span-3 p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-foreground mb-1">{listing.title}</h3>
                          <p className="text-sm text-muted-foreground">{restaurant?.name}</p>
                        </div>
                        <div className="text-right">
                          <div className="inline-block px-3 py-1 bg-orange-100 dark:bg-orange-950/30 rounded-full">
                            <p className="text-sm font-bold text-orange-600">
                              {((listing.discountedPrice / listing.originalPrice) * 100).toFixed(0)}% Off
                            </p>
                          </div>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground mb-4">{listing.description}</p>

                      {/* Reason */}
                      <div className="flex items-center gap-2 mb-4">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                        <span className="text-xs text-green-600 font-medium">{listing.reason}</span>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {listing.dietaryInfo.map((diet) => (
                          <Badge key={diet} variant="secondary" className="text-xs">
                            {diet}
                          </Badge>
                        ))}
                        {listing.allergens.length > 0 && (
                          <Badge variant="destructive" className="text-xs">
                            Contains: {listing.allergens.join(", ")}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Price and Action */}
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-orange-500">
                          ${listing.discountedPrice.toFixed(2)}
                        </span>
                        <span className="text-sm line-through text-muted-foreground">
                          ${listing.originalPrice.toFixed(2)}
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleSave(listing.id)}
                          className={isSaved ? "bg-orange-50 border-orange-500" : ""}
                        >
                          <Heart
                            className={`w-4 h-4 ${isSaved ? "fill-orange-500 text-orange-500" : ""}`}
                          />
                        </Button>
                        <Button className="gap-2 bg-orange-500 hover:bg-orange-600">
                          <ShoppingCart className="w-4 h-4" />
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
