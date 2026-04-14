"use client"

import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { TrendingUp, TrendingDown, AlertCircle, Target, Users, DollarSign } from "lucide-react"

export default function AdvancedAnalyticsPage() {
  const { user } = useAuth()

  if (!user || user.role !== "restaurant") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">This page is only available for restaurant owners.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const demandForecast = [
    { day: "Mon", predicted: 12, actual: 11 },
    { day: "Tue", predicted: 14, actual: 15 },
    { day: "Wed", predicted: 10, actual: 9 },
    { day: "Thu", predicted: 16, actual: 18 },
    { day: "Fri", predicted: 20, actual: 22 },
    { day: "Sat", predicted: 24, actual: 25 },
    { day: "Sun", predicted: 18, actual: 17 },
  ]

  const customerSegments = [
    { segment: "Breakfast", value: 28, trend: "+5%" },
    { segment: "Lunch", value: 45, trend: "+12%" },
    { segment: "Dinner", value: 22, trend: "-3%" },
    { segment: "Late Night", value: 5, trend: "+8%" },
  ]

  const competitorData = [
    { restaurant: "Your Restaurant", avgDiscount: 58, avgPrice: 8.5, orders: 156 },
    { restaurant: "Competitor A", avgDiscount: 55, avgPrice: 9.2, orders: 142 },
    { restaurant: "Competitor B", avgDiscount: 60, avgPrice: 7.8, orders: 128 },
  ]

  const pricingRecommendations = [
    { listing: "Salad Bowl", currentPrice: 4.99, recommendedPrice: 5.49, reason: "High demand, optimize margin" },
    { listing: "Sandwich", currentPrice: 5.99, recommendedPrice: 5.49, reason: "Inventory surplus, reduce price" },
    { listing: "Dessert", currentPrice: 3.49, recommendedPrice: 3.99, reason: "Low inventory, increase price" },
  ]

  const performanceMetrics = [
    { label: "Conversion Rate", value: "8.4%", change: "+1.2%", trend: "up" },
    { label: "Avg Order Value", value: "$12.34", change: "+$0.87", trend: "up" },
    { label: "Repeat Rate", value: "34%", change: "+5%", trend: "up" },
    { label: "Waste Reduction", value: "89%", change: "+4%", trend: "up" },
  ]

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Advanced Analytics</h1>
            <p className="text-muted-foreground">AI-powered insights and recommendations for your restaurant</p>
          </div>
          <Button className="bg-orange-500 hover:bg-orange-600">
            Generate Full Report
          </Button>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {performanceMetrics.map((metric, idx) => (
            <Card key={idx}>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground mb-2">{metric.label}</p>
                <p className="text-3xl font-bold text-foreground mb-2">{metric.value}</p>
                <div className="flex items-center gap-1">
                  {metric.trend === "up" ? (
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-600" />
                  )}
                  <span className={metric.trend === "up" ? "text-green-600" : "text-red-600"}>
                    {metric.change}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Demand Forecasting */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-orange-500" />
              Demand Forecasting
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-2">
              AI-predicted demand vs. actual orders (7-day history)
            </p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={demandForecast}>
                <defs>
                  <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                  </linearGradient>
                </defs>
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
                <Legend />
                <Area
                  type="monotone"
                  dataKey="predicted"
                  stroke="#f97316"
                  fillOpacity={1}
                  fill="url(#colorPredicted)"
                  name="Predicted Demand"
                />
                <Line type="monotone" dataKey="actual" stroke="#22c55e" strokeWidth={2} name="Actual Orders" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Customer Segmentation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-orange-500" />
                Customer Segments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {customerSegments.map((segment, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <p className="font-medium text-foreground">{segment.segment}</p>
                      <Badge
                        variant="outline"
                        className={segment.trend.startsWith("+") ? "border-green-500/50 text-green-600" : "border-red-500/50 text-red-600"}
                      >
                        {segment.trend}
                      </Badge>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-orange-500 h-2 rounded-full"
                        style={{ width: `${segment.value}%` }}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">{segment.value}% of orders</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Competitor Comparison */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-orange-500" />
                Competitor Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={competitorData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="restaurant" stroke="var(--color-muted-foreground)" angle={-45} textAnchor="end" height={80} />
                  <YAxis stroke="var(--color-muted-foreground)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--color-card)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="orders" fill="#f97316" name="Orders/Week" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Dynamic Pricing Recommendations */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-orange-500" />
                Pricing Optimization
              </CardTitle>
              <Badge className="bg-blue-500">AI-Powered</Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Smart recommendations to maximize revenue while maintaining competitive pricing
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pricingRecommendations.map((rec, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 border border-border rounded-lg hover:border-orange-500/50 transition-colors">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{rec.listing}</h3>
                    <p className="text-sm text-muted-foreground">{rec.reason}</p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-sm text-muted-foreground">
                      <span className="line-through">${rec.currentPrice}</span>
                      <span className="ml-2 font-bold text-orange-600 text-lg">
                        ${rec.recommendedPrice}
                      </span>
                    </p>
                    <Button variant="outline" size="sm" className="text-orange-600 border-orange-500/50 hover:bg-orange-50 dark:hover:bg-orange-950/30">
                      Apply Recommendation
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Insights & Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-blue-500" />
              AI Insights & Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                icon: "📈",
                title: "Peak Hours Optimization",
                description:
                  "Friday 6-8 PM shows highest demand. Consider preparing extra inventory during this window to capture more orders.",
              },
              {
                icon: "🎯",
                title: "Underperforming Category",
                description:
                  "Desserts have only 15% attachment rate. Bundle with main courses or promote separately to increase sales.",
              },
              {
                icon: "💰",
                title: "Margin Opportunity",
                description:
                  "Salad bowls have 68% margin. They&apos;re high-demand items—consider increasing quantity to maximize profit.",
              },
              {
                icon: "⏰",
                title: "Waste Forecast",
                description:
                  "Based on historical patterns, expect 12-14 unsold items next Thursday. Adjust portions accordingly.",
              },
            ].map((insight, idx) => (
              <div key={idx} className="p-4 border border-border rounded-lg">
                <div className="flex gap-3">
                  <span className="text-2xl flex-shrink-0">{insight.icon}</span>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">{insight.title}</h3>
                    <p className="text-sm text-muted-foreground">{insight.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
