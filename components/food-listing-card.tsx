"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/lib/cart-context"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, Star, ShoppingCart, Heart } from "lucide-react"
import type { FoodListing, Restaurant } from "@/lib/types"

interface FoodListingCardProps {
  listing: FoodListing
  restaurant?: Restaurant
  isFavorite?: boolean
  onToggleFavorite?: (restaurantId: string) => void
}

export function FoodListingCard({ listing, restaurant, isFavorite, onToggleFavorite }: FoodListingCardProps) {
  const [isAdding, setIsAdding] = useState(false)
  const { addToCart } = useCart()
  const router = useRouter()

  const timeRemaining = Math.floor((listing.availableUntil.getTime() - Date.now()) / (1000 * 60 * 60))
  const minutesRemaining = Math.floor(((listing.availableUntil.getTime() - Date.now()) / (1000 * 60)) % 60)

  const handleAddToCart = async () => {
    setIsAdding(true)
    await new Promise((resolve) => setTimeout(resolve, 300))
    addToCart(listing, 1)
    setIsAdding(false)
  }

  const handleCardClick = () => {
    router.push(`/marketplace/${listing.id}`)
  }

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onToggleFavorite && restaurant) {
      onToggleFavorite(restaurant.id)
    }
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer" onClick={handleCardClick}>
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={listing.image || "/placeholder.svg"}
          alt={listing.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <Badge className="bg-destructive text-white font-semibold text-sm px-3 py-1">{listing.discount}% OFF</Badge>
        </div>
        {timeRemaining < 2 && (
          <div className="absolute top-3 left-3">
            <Badge variant="secondary" className="bg-accent text-accent-foreground font-semibold">
              <Clock className="w-3 h-3 mr-1" />
              Ending Soon
            </Badge>
          </div>
        )}
        {onToggleFavorite && (
          <button
            onClick={handleFavoriteClick}
            className="absolute bottom-3 right-3 bg-white/90 rounded-full p-2 hover:bg-white transition-colors"
          >
            <Heart className={`w-5 h-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
          </button>
        )}
      </div>

      <CardContent className="p-4">
        {restaurant && (
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{restaurant.name}</span>
            <div className="flex items-center gap-1 ml-auto">
              <Star className="w-4 h-4 fill-accent text-accent" />
              <span className="text-sm font-medium">{restaurant.rating}</span>
            </div>
          </div>
        )}

        <h3 className="font-semibold text-lg mb-2 text-foreground line-clamp-1">{listing.title}</h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2 leading-relaxed">{listing.description}</p>

        <div className="flex flex-wrap gap-1 mb-3">
          {listing.dietaryInfo.slice(0, 3).map((info) => (
            <Badge key={info} variant="outline" className="text-xs capitalize">
              {info}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-primary">${listing.discountedPrice.toFixed(2)}</span>
            <span className="text-sm text-muted-foreground line-through">${listing.originalPrice.toFixed(2)}</span>
          </div>
          <div className="text-sm text-muted-foreground">
            <Clock className="w-4 h-4 inline mr-1" />
            {timeRemaining}h {minutesRemaining}m
          </div>
        </div>

        <div className="text-xs text-muted-foreground mt-2">
          {listing.quantity} {listing.quantity === 1 ? "item" : "items"} left
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          onClick={(e) => {
            e.stopPropagation()
            handleAddToCart()
          }}
          disabled={isAdding || listing.quantity === 0}
          className="w-full"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          {isAdding ? "Adding..." : listing.quantity === 0 ? "Sold Out" : "Add to Cart"}
        </Button>
      </CardFooter>
    </Card>
  )
}
