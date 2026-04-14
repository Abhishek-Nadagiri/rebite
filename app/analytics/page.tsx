"use client"

import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Download, TrendingUp, Leaf, Droplet, PiggyBank } from "lucide-react"

export default function AnalyticsPage() {
  const { user } = useAuth()

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">Please log in to view analytics.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const dailyData = [
    { day: "Mon", meals: 3, co2: 9.2, money: 18 },
    { day: "Tue", meals: 2, co2: 6.1, money: 12 },
    { day: "Wed", meals: 4, co2: 12.3, money: 24 },
    { day: "Thu", meals: 3, co2: 9.2, money: 18 },
    { day: "Fri", meals: 5, co2: 15.4, money: 30 },
    { day: "Sat", meals: 6, co2: 18.5, money: 36 },
    { day: "Sun", meals: 4, co2: 12.3, money: 24 },
  ]

  const categoryData = [
    { name: "Salads", value: 28 },
    { name: "Main Course", value: 24 },
    { name: "Bakery", value: 18 },
    { name: "Desserts", value: 15 },
    { name: "Sandwiches", value: 15 },
  ]

  const COLORS = ["#f97316", "#fb923c", "#fed7aa", "#fecaca", "#fca5a5"]

  const monthlyData = [
    { month: "Jan", meals: 24, co2: 73.6, money: 144 },
    { month: "Feb", meals: 31, co2: 95.1, money: 186 },
    { month: "Mar", meals: 28, co2: 85.9, money: 168 },
  ]

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Advanced Analytics</h1>
            <p className="text-muted-foreground">Track your detailed environmental and financial impact</p>
          </div>
          <Button className="bg-orange-500 hover:bg-orange-600 gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </Button>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-green-100 dark:bg-green-950/30">
                  <Leaf className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">CO2 Saved</p>
                  <p className="text-2xl font-bold text-foreground">381 kg</p>
                  <p className="text-xs text-green-600">+12% this month</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-950/30">
                  <Droplet className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Water Saved</p>
                  <p className="text-2xl font-bold text-foreground">2,400 gal</p>
                  <p className="text-xs text-blue-600">+8% this month</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-orange-100 dark:bg-orange-950/30">
                  <PiggyBank className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Money Saved</p>
                  <p className="text-2xl font-bold text-foreground">$635</p>
                  <p className="text-xs text-orange-600">+15% this month</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-950/30">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Meals Saved</p>
                  <p className="text-2xl font-bold text-foreground">127</p>
                  <p className="text-xs text-purple-600">Average 4.2/day</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Weekly Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dailyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="day" stroke="var(--color-muted-foreground)" />
                  <YAxis stroke="var(--color-muted-foreground)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--color-card)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="meals"
                    stroke="#f97316"
                    strokeWidth={2}
                    dot={{ fill: "#f97316", r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Category Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Purchases by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Monthly Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="meals" fill="#f97316" name="Meals Saved" />
                <Bar dataKey="money" fill="#22c55e" name="Money Saved ($)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Environmental Equivalents */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Your Impact Equivalents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { label: "Trees Planted", value: "5.8", icon: "🌲" },
                { label: "Cars Off Road (days)", value: "18", icon: "🚗" },
                { label: "Phones Charged", value: "312", icon: "🔋" },
                { label: "Showers (hot water)", value: "89", icon: "🚿" },
              ].map((item, idx) => (
                <div key={idx} className="text-center p-4 rounded-lg bg-muted/50">
                  <p className="text-3xl mb-2">{item.icon}</p>
                  <p className="text-2xl font-bold text-foreground mb-1">{item.value}</p>
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
