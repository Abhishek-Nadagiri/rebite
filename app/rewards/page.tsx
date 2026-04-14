"use client"

import { useAuth } from "@/lib/auth-context"
import { mockBadges, mockLoyaltyTiers } from "@/lib/mock-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Zap, Trophy, Star, Award } from "lucide-react"

export default function RewardsPage() {
  const { user } = useAuth()

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">Please log in to view rewards.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Mock user stats
  const userPoints = 1250
  const userTier = "gold"
  const currentStreak = 7
  const nextMilestone = 1500
  const unlockedBadges = [0, 1, 3, 4]

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Rewards & Achievements</h1>
          <p className="text-muted-foreground">Track your progress and unlock exclusive benefits</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Points Card */}
          <Card className="border-2 border-orange-500/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-600">
                <Zap className="w-5 h-5" />
                ReBite Points
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-foreground mb-2">{userPoints}</p>
              <p className="text-sm text-muted-foreground mb-4">
                {nextMilestone - userPoints} points to next tier
              </p>
              <Progress
                value={(userPoints / nextMilestone) * 100}
                className="mb-4"
              />
              <Button className="w-full bg-orange-500 hover:bg-orange-600">
                Redeem Points
              </Button>
            </CardContent>
          </Card>

          {/* Loyalty Tier */}
          <Card className="border-2 border-yellow-500/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-yellow-600">
                <Star className="w-5 h-5" />
                Loyalty Tier
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <p className="text-3xl font-bold text-foreground capitalize">{userTier}</p>
                <span className="text-4xl">👑</span>
              </div>
              <div className="space-y-2">
                {mockLoyaltyTiers
                  .filter((tier) => tier.name === userTier)
                  .map((tier) => (
                    <div key={tier.name}>
                      <p className="text-sm font-medium text-foreground mb-2">
                        {tier.discountPercentage}% extra discount
                      </p>
                      <div className="text-xs text-muted-foreground space-y-1">
                        {tier.benefits.slice(0, 2).map((benefit, idx) => (
                          <p key={idx}>✓ {benefit}</p>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          {/* Streak */}
          <Card className="border-2 border-red-500/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600">
                <Award className="w-5 h-5" />
                Current Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-foreground mb-2">{currentStreak}</p>
              <p className="text-sm text-muted-foreground mb-4">Days in a row</p>
              <p className="text-xs text-muted-foreground">
                Longest streak: <span className="font-semibold text-foreground">14 days</span>
              </p>
              <Button variant="outline" className="w-full mt-4">
                Continue Streak
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Loyalty Tiers Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Loyalty Tiers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              {mockLoyaltyTiers.map((tier, idx) => (
                <div
                  key={tier.name}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    userTier === tier.name
                      ? "border-orange-500 bg-orange-50 dark:bg-orange-950/30"
                      : "border-border hover:border-orange-500/50"
                  }`}
                >
                  <div className="text-3xl mb-2">
                    {idx === 0 && "🥉"}
                    {idx === 1 && "🥈"}
                    {idx === 2 && "🥇"}
                    {idx === 3 && "👑"}
                  </div>
                  <h3 className="font-bold text-foreground mb-1 capitalize">{tier.name}</h3>
                  <p className="text-xs text-muted-foreground mb-3">
                    {tier.minPoints}+ points
                  </p>
                  <ul className="text-xs space-y-1">
                    {tier.benefits.slice(0, 2).map((benefit, idx) => (
                      <li key={idx} className="text-muted-foreground">
                        ✓ {benefit.substring(0, 25)}...
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-orange-500" />
              Achievements & Badges
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {mockBadges.map((badge, idx) => (
                <div
                  key={badge.id}
                  className={`p-4 rounded-lg border-2 flex flex-col items-center text-center transition-all ${
                    unlockedBadges.includes(idx)
                      ? "border-orange-500 bg-orange-50 dark:bg-orange-950/30"
                      : "border-border bg-muted/50 opacity-50"
                  }`}
                >
                  <div className="text-4xl mb-2">{badge.icon}</div>
                  <h3 className="font-bold text-foreground mb-1">{badge.name}</h3>
                  <p className="text-xs text-muted-foreground mb-3">{badge.description}</p>
                  {unlockedBadges.includes(idx) ? (
                    <Badge className="bg-orange-500">Unlocked</Badge>
                  ) : (
                    <Badge variant="outline">{badge.criteria}</Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
