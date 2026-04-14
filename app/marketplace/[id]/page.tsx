"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { useCart } from "@/lib/cart-context"
import { mockListings, mockRestaurants } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Clock, MapPin, Star, ShoppingCart, ArrowLeft, AlertCircle, Navigation, Heart, Gift } from "lucide-react"
import Link from "next/link"
import type { FoodListing } from "@/lib/types"

export default function FoodDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)
  const [showDonateOption, setShowDonateOption] = useState(false)

  const listing = mockListings.find((l) => l.id === params.id) as FoodListing | undefined
  const restaurant = listing ? mockRestaurants.find((r) => r.id === listing.restaurantId) : undefined

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  if (!listing || !restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Food item not found</p>
      </div>
    )
  }

  const timeRemaining = Math.floor((listing.availableUntil.getTime() - Date.now()) / (1000 * 60 * 60))
  const minutesRemaining = Math.floor(((listing.availableUntil.getTime() - Date.now()) / (1000 * 60)) % 60)

  const cookedTime = listing.cookedAt ? new Date(listing.cookedAt).getTime() : Date.now()
  const currentTime = Date.now()
  const expiryTime = listing.expiryTime ? new Date(listing.expiryTime).getTime() : currentTime + 4 * 60 * 60 * 1000
  const totalDuration = expiryTime - cookedTime
  const elapsed = currentTime - cookedTime
  const freshnessPercentage = Math.max(0, Math.min(100, ((totalDuration - elapsed) / totalDuration) * 100))

  const handleAddToCart = async (isDonation = false) => {
    setIsAdding(true)
    await new Promise((resolve) => setTimeout(resolve, 500))

    if (isDonation) {
      // Mock donation - in real app would create donation order
      alert(`Thank you for sponsoring ${quantity} meal(s)! Total: $${(listing.discountedPrice * quantity).toFixed(2)}`)
    } else {
      addToCart(listing, quantity)
      router.push("/cart")
    }
    setIsAdding(false)
  }

  const handleOpenInMaps = () => {
    const address = encodeURIComponent(restaurant.address)
    window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, "_blank")
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Button variant="ghost" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Marketplace
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Section */}
          <div>
            <div className="relative rounded-xl overflow-hidden mb-4">
              <img src={listing.image || "/placeholder.svg"} alt={listing.title} className="w-full h-96 object-cover" />
              <div className="absolute top-4 right-4">
                <Badge className="bg-destructive text-white font-bold text-lg px-4 py-2">{listing.discount}% OFF</Badge>
              </div>
            </div>

            <Card className="mb-4">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Freshness Timeline
                </h3>
                <div className="space-y-4">
                  <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="absolute h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                      style={{ width: `${freshnessPercentage}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-sm">
                    <div>
                      <p className="text-muted-foreground">Cooked</p>
                      <p className="font-medium">
                        {listing.cookedAt
                          ? new Date(listing.cookedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                          : "N/A"}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-muted-foreground">Now</p>
                      <p className="font-medium text-primary">Fresh!</p>
                    </div>
                    <div className="text-right">
                      <p className="text-muted-foreground">Safe Until</p>
                      <p className="font-medium">
                        {listing.expiryTime
                          ? new Date(listing.expiryTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {listing.pickupInstructions && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-primary" />
                    Pickup Instructions
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{listing.pickupInstructions}</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Details Section */}
          <div>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">{listing.title}</h1>
                <Link
                  href={`/restaurant/${restaurant.id}`}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <MapPin className="w-4 h-4" />
                  <span>{restaurant.name}</span>
                  <div className="flex items-center gap-1 ml-2">
                    <Star className="w-4 h-4 fill-accent text-accent" />
                    <span className="text-sm font-medium">{restaurant.rating}</span>
                  </div>
                </Link>
              </div>
              <Button variant="outline" size="icon">
                <Heart className="w-5 h-5" />
              </Button>
            </div>

            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">{listing.description}</p>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl font-bold text-primary">${listing.discountedPrice.toFixed(2)}</span>
              <span className="text-xl text-muted-foreground line-through">${listing.originalPrice.toFixed(2)}</span>
              <Badge variant="secondary" className="text-sm">
                Save ${(listing.originalPrice - listing.discountedPrice).toFixed(2)}
              </Badge>
            </div>

            <Separator className="my-6" />

            <div className="space-y-4 mb-6">
              <div>
                <h3 className="font-semibold mb-2">Category</h3>
                <Badge variant="outline">{listing.category}</Badge>
              </div>

              {listing.dietaryInfo.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Dietary Information</h3>
                  <div className="flex flex-wrap gap-2">
                    {listing.dietaryInfo.map((info) => (
                      <Badge key={info} variant="secondary" className="capitalize">
                        {info}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {listing.allergens.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-destructive" />
                    Contains Allergens
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {listing.allergens.map((allergen) => (
                      <Badge key={allergen} variant="destructive" className="capitalize">
                        {allergen}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h3 className="font-semibold mb-2">Availability</h3>
                <p className="text-muted-foreground">
                  {timeRemaining > 0
                    ? `${timeRemaining} hour${timeRemaining !== 1 ? "s" : ""} ${minutesRemaining} minute${minutesRemaining !== 1 ? "s" : ""} remaining`
                    : "Ending soon"}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {listing.quantity} {listing.quantity === 1 ? "item" : "items"} left
                </p>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Restaurant Location */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Restaurant Location</h3>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-muted-foreground mb-2">{restaurant.address}</p>
                  <Button variant="outline" size="sm" onClick={handleOpenInMaps}>
                    <Navigation className="w-4 h-4 mr-2" />
                    Open in Maps
                  </Button>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Quantity Selector */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Quantity</h3>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.min(listing.quantity, quantity + 1))}
                  disabled={quantity >= listing.quantity}
                >
                  +
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={() => handleAddToCart(false)}
                disabled={isAdding || listing.quantity === 0}
                size="lg"
                className="w-full"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {isAdding ? "Adding..." : `Add to Cart - $${(listing.discountedPrice * quantity).toFixed(2)}`}
              </Button>

              <Button
                onClick={() => handleAddToCart(true)}
                disabled={isAdding || listing.quantity === 0}
                size="lg"
                variant="outline"
                className="w-full"
              >
                <Gift className="w-5 h-5 mr-2" />
                {isAdding ? "Processing..." : `Donate This Food - $${(listing.discountedPrice * quantity).toFixed(2)}`}
              </Button>
              <p className="text-xs text-muted-foreground text-center">Sponsor a meal for someone in need</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
