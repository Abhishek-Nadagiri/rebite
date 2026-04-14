"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Edit2, Save, Users, Utensils, MapPin, Mail } from "lucide-react"

export default function ProfilePage() {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    bio: "Passionate about reducing food waste and living sustainably 🌱",
    location: "San Francisco, CA",
    dietaryPreferences: ["vegetarian", "gluten-free"],
    followers: 145,
    following: 52,
  })

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">Please log in to view your profile.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="pt-8">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-5xl shadow-lg">
                  👤
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-foreground mb-1">{user.name}</h1>
                    <p className="text-muted-foreground mb-3">Member since {new Date(2024, 0, 15).toLocaleDateString()}</p>
                    <Badge className="bg-orange-500">Gold Tier ⭐</Badge>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(!isEditing)}
                    className="gap-2"
                  >
                    <Edit2 className="w-4 h-4" />
                    {isEditing ? "Done" : "Edit"}
                  </Button>
                </div>

                {isEditing ? (
                  <div className="space-y-4">
                    <textarea
                      value={profile.bio}
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                      placeholder="Tell us about yourself"
                      className="w-full p-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                      rows={2}
                    />
                    <Input
                      value={profile.location}
                      onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                      placeholder="Location"
                    />
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-muted-foreground">{profile.bio}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      {profile.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="w-4 h-4" />
                      {user.email}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-border">
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-500">{profile.followers}</p>
                <p className="text-sm text-muted-foreground">Followers</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-500">{profile.following}</p>
                <p className="text-sm text-muted-foreground">Following</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-500">127</p>
                <p className="text-sm text-muted-foreground">Meals Saved</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Dietary Preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Utensils className="w-5 h-5 text-orange-500" />
                  Dietary Preferences
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {profile.dietaryPreferences.map((pref) => (
                    <Badge key={pref} variant="secondary">
                      {pref}
                    </Badge>
                  ))}
                </div>
                {isEditing && (
                  <Button variant="outline" className="w-full mt-4">
                    Manage Preferences
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  "Purchased Fresh Garden Salad from Green Leaf Bistro",
                  "Unlocked Waste Warrior badge",
                  "Generated 3 AI recipes",
                  "Started following Ocean Breeze Cafe",
                ].map((activity, idx) => (
                  <div key={idx} className="flex items-center gap-3 pb-4 border-b border-border last:border-0">
                    <div className="w-2 h-2 rounded-full bg-orange-500 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">{activity}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Impact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">CO2 Prevented</p>
                  <p className="text-2xl font-bold text-green-500">381 kg</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Money Saved</p>
                  <p className="text-2xl font-bold text-orange-500">$635</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Water Saved</p>
                  <p className="text-2xl font-bold text-blue-500">2.4K gal</p>
                </div>
              </CardContent>
            </Card>

            {/* Following */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="w-4 h-4 text-orange-500" />
                  Following
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {["Green Leaf Bistro", "Savory Kitchen", "Ocean Breeze"].map((name) => (
                  <div key={name} className="flex items-center justify-between">
                    <p className="text-sm font-medium text-foreground">{name}</p>
                    <Button variant="ghost" size="sm">
                      Unfollow
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  Notification Settings
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Privacy Settings
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Account Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
