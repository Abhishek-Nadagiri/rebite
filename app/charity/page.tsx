"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { mockCharityCampaigns } from "@/lib/mock-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Heart, Share2, Calendar } from "lucide-react"

export default function CharityPage() {
  const { user } = useAuth()
  const [donatedCampaigns, setDonatedCampaigns] = useState<string[]>([])

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">Please log in to participate in campaigns.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleDonate = (campaignId: string) => {
    setDonatedCampaigns((prev) =>
      prev.includes(campaignId) ? prev.filter((id) => id !== campaignId) : [...prev, campaignId]
    )
  }

  const communityStats = {
    totalDonations: 12450,
    mealsDonated: 3240,
    beneficiariesHelped: 2850,
    co2Prevented: 9850,
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-2">Give Back</h1>
          <p className="text-muted-foreground">
            Every meal you save contributes to meaningful causes. Together, we&apos;re making a difference.
          </p>
        </div>

        {/* Community Impact */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Donations", value: `$${communityStats.totalDonations.toLocaleString()}`, icon: "💰" },
            { label: "Meals Donated", value: communityStats.mealsDonated.toLocaleString(), icon: "🍽️" },
            { label: "People Helped", value: communityStats.beneficiariesHelped.toLocaleString(), icon: "👥" },
            { label: "CO2 Prevented", value: `${communityStats.co2Prevented} kg`, icon: "🌍" },
          ].map((stat, idx) => (
            <Card key={idx}>
              <CardContent className="pt-6">
                <p className="text-3xl mb-2">{stat.icon}</p>
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Campaigns */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Active Campaigns</h2>
          </div>

          {mockCharityCampaigns.map((campaign) => {
            const progressPercent = (campaign.currentAmount / campaign.targetAmount) * 100
            const isDonated = donatedCampaigns.includes(campaign.id)

            return (
              <Card key={campaign.id} className="overflow-hidden">
                <div className="md:grid md:grid-cols-3 gap-6">
                  {/* Image placeholder */}
                  <div className="h-48 md:h-auto bg-gradient-to-br from-orange-100 to-orange-50 dark:from-orange-950/30 dark:to-orange-950/10 flex items-center justify-center">
                    <div className="text-5xl">
                      {campaign.id === "campaign-1" ? "🏦" : "🌊"}
                    </div>
                  </div>

                  <div className="md:col-span-2 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-foreground mb-2">{campaign.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                          <Heart className="w-4 h-4" />
                          Beneficiary: {campaign.beneficiary}
                        </div>
                      </div>
                      <Badge className="bg-orange-500">
                        {Math.round((Date.now() - campaign.createdAt.getTime()) / (24 * 60 * 60 * 1000))} days running
                      </Badge>
                    </div>

                    <p className="text-muted-foreground mb-4">{campaign.description}</p>

                    {/* Progress */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-sm font-medium text-foreground">
                          ${campaign.currentAmount.toLocaleString()} of ${campaign.targetAmount.toLocaleString()}
                        </p>
                        <p className="text-sm text-muted-foreground">{Math.round(progressPercent)}%</p>
                      </div>
                      <Progress value={progressPercent} className="h-2" />
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <Button
                        onClick={() => handleDonate(campaign.id)}
                        className={`flex-1 gap-2 ${
                          isDonated
                            ? "bg-green-500 hover:bg-green-600"
                            : "bg-orange-500 hover:bg-orange-600"
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${isDonated ? "fill-white" : ""}`} />
                        {isDonated ? "Supporting" : "Support Campaign"}
                      </Button>
                      <Button variant="outline" className="gap-2">
                        <Share2 className="w-4 h-4" />
                        Share
                      </Button>
                    </div>

                    {/* Deadline */}
                    <p className="text-xs text-muted-foreground mt-4 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Ends {campaign.endDate.toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        {/* How It Works */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle>How Your Purchases Help</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "You Save Meals",
                  description: "Purchase surplus food at discounted prices from restaurants",
                  icon: "🛒",
                },
                {
                  title: "We Donate",
                  description: "A portion of proceeds go directly to charitable organizations",
                  icon: "🤝",
                },
                {
                  title: "Community Wins",
                  description: "Meals reach those in need while reducing food waste",
                  icon: "🌟",
                },
              ].map((step, idx) => (
                <div key={idx} className="text-center">
                  <p className="text-5xl mb-4">{step.icon}</p>
                  <h3 className="font-bold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
