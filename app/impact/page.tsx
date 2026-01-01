"use client"

import { useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockImpactMetrics } from "@/lib/mock-data"
import { TrendingUp, Leaf, DollarSign, Weight, Heart, Users, Award, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ImpactPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
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

  if (!user) return null

  const { totalMealsSaved, co2Saved, moneySaved, wasteReduced } = mockImpactMetrics

  // Personal stats (mock - would come from user's actual orders)
  const personalMealsSaved = user.role === "consumer" ? 23 : 156
  const personalCO2Saved = user.role === "consumer" ? 69 : 468
  const personalWasteReduced = user.role === "consumer" ? 17 : 117

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Your Impact</h1>
          <p className="text-lg text-muted-foreground">
            See the difference you're making in the fight against food waste
          </p>
        </div>

        {/* Personal Impact Stats */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-foreground">Your Personal Impact</h2>
            <Badge className="bg-success text-white">
              <Award className="w-4 h-4 mr-1" />
              Eco Warrior
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-success/20 bg-gradient-to-br from-success/5 to-transparent">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Meals Saved</CardTitle>
                <Leaf className="w-5 h-5 text-success" />
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-foreground">{personalMealsSaved}</div>
                <p className="text-xs text-success mt-2 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +5 this week
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">CO2 Reduced</CardTitle>
                <Leaf className="w-5 h-5 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-foreground">{personalCO2Saved}kg</div>
                <p className="text-xs text-muted-foreground mt-2">
                  Equivalent to {Math.round(personalCO2Saved / 10)} trees planted
                </p>
              </CardContent>
            </Card>

            <Card className="border-accent/20 bg-gradient-to-br from-accent/5 to-transparent">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Waste Prevented</CardTitle>
                <Weight className="w-5 h-5 text-accent" />
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-foreground">{personalWasteReduced}kg</div>
                <p className="text-xs text-muted-foreground mt-2">Food kept from landfills</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Community Impact */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-6">Community Impact</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Meals Saved</CardTitle>
                <Heart className="w-5 h-5 text-destructive" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{totalMealsSaved.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground mt-1">Across all users</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">CO2 Saved</CardTitle>
                <Leaf className="w-5 h-5 text-success" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{(co2Saved / 1000).toFixed(1)}t</div>
                <p className="text-xs text-muted-foreground mt-1">Total carbon reduction</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Money Saved</CardTitle>
                <DollarSign className="w-5 h-5 text-accent" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">${(moneySaved / 1000).toFixed(1)}k</div>
                <p className="text-xs text-muted-foreground mt-1">Community savings</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Active Users</CardTitle>
                <Users className="w-5 h-5 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">2,847</div>
                <p className="text-xs text-success mt-1 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +18% this month
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Environmental Equivalents */}
        <Card className="mb-8 bg-gradient-to-br from-success/10 to-primary/10 border-success/20">
          <CardHeader>
            <CardTitle className="text-xl">Your Environmental Impact Equals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-success/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Leaf className="w-6 h-6 text-success" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{Math.round(personalCO2Saved / 10)}</div>
                  <p className="text-sm text-muted-foreground">Trees planted</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Leaf className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{Math.round(personalCO2Saved / 2.3)}</div>
                  <p className="text-sm text-muted-foreground">Gallons of gas saved</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Leaf className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{Math.round(personalWasteReduced * 2.2)}</div>
                  <p className="text-sm text-muted-foreground">Plastic bottles recycled</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Share Impact */}
        <Card>
          <CardContent className="flex flex-col md:flex-row items-center justify-between gap-6 py-8">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-semibold text-foreground mb-2">Share Your Impact</h3>
              <p className="text-muted-foreground">
                Inspire others to join the fight against food waste by sharing your achievements
              </p>
            </div>
            <Button size="lg" className="flex-shrink-0">
              <Share2 className="w-4 h-4 mr-2" />
              Share on Social Media
            </Button>
          </CardContent>
        </Card>

        {/* Achievements */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-foreground mb-6">Your Achievements</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="text-center p-6">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="w-8 h-8 text-success" />
              </div>
              <h4 className="font-semibold mb-1">First Save</h4>
              <p className="text-xs text-muted-foreground">Saved your first meal</p>
            </Card>

            <Card className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <h4 className="font-semibold mb-1">10 Meals</h4>
              <p className="text-xs text-muted-foreground">Rescued 10 meals</p>
            </Card>

            <Card className="text-center p-6">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="w-8 h-8 text-accent" />
              </div>
              <h4 className="font-semibold mb-1">Tree Hugger</h4>
              <p className="text-xs text-muted-foreground">50kg CO2 reduced</p>
            </Card>

            <Card className="text-center p-6 opacity-50">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="w-8 h-8 text-muted-foreground" />
              </div>
              <h4 className="font-semibold mb-1">Century</h4>
              <p className="text-xs text-muted-foreground">Save 100 meals (locked)</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
