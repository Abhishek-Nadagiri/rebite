"use client"

import { useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { mockListings } from "@/lib/mock-data"
import { TrendingUp, ShoppingBag, DollarSign, Package } from "lucide-react"

export default function RestaurantDashboard() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

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

  // Mock stats for the restaurant
  const restaurantListings = mockListings.filter((l) => l.restaurantId === user.restaurantId || true) // Show all for demo
  const activeListings = restaurantListings.filter((l) => l.quantity > 0)
  const totalRevenue = restaurantListings.reduce((sum, l) => sum + l.discountedPrice * (10 - l.quantity), 0)
  const itemsSaved = restaurantListings.reduce((sum, l) => sum + (10 - l.quantity), 0)

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-lg text-muted-foreground">Manage your surplus food listings</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Listings</CardTitle>
              <ShoppingBag className="w-5 h-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{activeListings.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Currently available</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Items Saved</CardTitle>
              <Package className="w-5 h-5 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{itemsSaved}</div>
              <p className="text-xs text-muted-foreground mt-1">From going to waste</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Revenue</CardTitle>
              <DollarSign className="w-5 h-5 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">${totalRevenue.toFixed(0)}</div>
              <p className="text-xs text-muted-foreground mt-1">Total earnings</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Impact Score</CardTitle>
              <TrendingUp className="w-5 h-5 text-chart-3" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">94</div>
              <p className="text-xs text-success mt-1">+12% this week</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Listings */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Listings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeListings.slice(0, 5).map((listing) => (
                <div key={listing.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center gap-4">
                    <img
                      src={listing.image || "/placeholder.svg"}
                      alt={listing.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-foreground">{listing.title}</h4>
                      <p className="text-sm text-muted-foreground">{listing.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-primary">${listing.discountedPrice.toFixed(2)}</div>
                    <div className="text-sm text-muted-foreground">{listing.quantity} left</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
