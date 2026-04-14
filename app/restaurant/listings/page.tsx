"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockListings } from "@/lib/mock-data"
import { Plus, Edit, Trash2, Clock } from "lucide-react"
import { AddListingDialog } from "@/components/add-listing-dialog"
import type { FoodListing } from "@/lib/types"

export default function RestaurantListingsPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [listings, setListings] = useState<FoodListing[]>(mockListings)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "restaurant")) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  if (!user || user.role !== "restaurant") return null

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this listing?")) {
      setListings(listings.filter((l) => l.id !== id))
    }
  }

  const handleAddListing = (newListing: Omit<FoodListing, "id" | "createdAt" | "restaurantId">) => {
    const listing: FoodListing = {
      ...newListing,
      id: "listing-" + Math.random().toString(36).substring(7),
      restaurantId: user.restaurantId || "rest-1",
      createdAt: new Date(),
    }
    setListings([listing, ...listings])
    setIsAddDialogOpen(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Food Listings</h1>
            <p className="text-lg text-muted-foreground">Manage your surplus food inventory</p>
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Listing
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => {
            const timeRemaining = Math.floor((listing.availableUntil.getTime() - Date.now()) / (1000 * 60 * 60))
            const isExpiringSoon = timeRemaining < 2

            return (
              <Card key={listing.id} className="overflow-hidden">
                <div className="relative h-48 w-full">
                  <img
                    src={listing.image || "/placeholder.svg"}
                    alt={listing.title}
                    className="w-full h-full object-cover"
                  />
                  {isExpiringSoon && (
                    <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">
                      <Clock className="w-3 h-3 mr-1" />
                      Expiring Soon
                    </Badge>
                  )}
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{listing.title}</CardTitle>
                  <p className="text-sm text-muted-foreground line-clamp-2">{listing.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-2xl font-bold text-primary">${listing.discountedPrice.toFixed(2)}</span>
                    <Badge variant="outline">{listing.discount}% OFF</Badge>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{listing.quantity} remaining</span>
                    <span>{timeRemaining}h left</span>
                  </div>
                </CardContent>
                <CardFooter className="gap-2">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(listing.id)}
                    className="text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>

        <AddListingDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} onAdd={handleAddListing} />
      </div>
    </div>
  )
}
