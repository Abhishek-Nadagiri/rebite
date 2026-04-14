"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { mockActivities, mockUserProfiles } from "@/lib/mock-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Share2, MessageCircle, Users, TrendingUp } from "lucide-react"

export default function CommunityPage() {
  const { user } = useAuth()
  const [likedActivities, setLikedActivities] = useState<string[]>([])

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">Please log in to view the community.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const toggleLike = (activityId: string) => {
    setLikedActivities((prev) =>
      prev.includes(activityId) ? prev.filter((id) => id !== activityId) : [...prev, activityId]
    )
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Community Hub</h1>
          <p className="text-muted-foreground">Connect with other eco-conscious consumers and celebrate collective impact</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Activity Feed */}
          <div className="md:col-span-2 space-y-4">
            <Card>
              <CardHeader className="border-b">
                <CardTitle className="text-xl">Activity Feed</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                {mockActivities.map((activity) => (
                  <div key={activity.id} className="border-l-4 border-orange-500 pl-4 py-3 hover:bg-muted/50 rounded transition-colors">
                    <div className="flex items-start gap-3 mb-2">
                      <img
                        src={activity.userAvatar}
                        alt={activity.userName}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-foreground">{activity.userName}</p>
                        <p className="text-sm text-muted-foreground">{activity.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {activity.timestamp.toLocaleDateString()}
                        </p>
                      </div>
                      <Badge variant="outline" className="text-xs capitalize">
                        {activity.type}
                      </Badge>
                    </div>
                    <div className="flex gap-3 mt-3">
                      <button
                        onClick={() => toggleLike(activity.id)}
                        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-orange-500 transition-colors"
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            likedActivities.includes(activity.id) ? "fill-orange-500 text-orange-500" : ""
                          }`}
                        />
                        <span className="text-xs">Like</span>
                      </button>
                      <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-orange-500 transition-colors">
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-xs">Comment</span>
                      </button>
                      <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-orange-500 transition-colors">
                        <Share2 className="w-4 h-4" />
                        <span className="text-xs">Share</span>
                      </button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Community Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-orange-500" />
                  Community Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Active Members</p>
                  <p className="text-2xl font-bold text-foreground">12.4K</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Meals Saved Together</p>
                  <p className="text-2xl font-bold text-orange-500">245K</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">CO2 Prevented</p>
                  <p className="text-2xl font-bold text-green-500">735 tons</p>
                </div>
              </CardContent>
            </Card>

            {/* Top Contributors */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="w-5 h-5 text-orange-500" />
                  Top Contributors
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockUserProfiles.map((profile) => (
                  <div key={profile.id} className="flex items-center gap-3">
                    <img
                      src={profile.avatar}
                      alt={profile.userId}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{profile.userId}</p>
                      <p className="text-xs text-muted-foreground">{profile.followers.length} followers</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Follow
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
