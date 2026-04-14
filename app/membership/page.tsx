"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { mockSubscriptionPlans } from "@/lib/mock-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, X } from "lucide-react"

export default function MembershipPage() {
  const { user } = useAuth()
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly")
  const [currentPlan] = useState("free")

  const plans = user?.role === "restaurant" ? mockSubscriptionPlans.filter((p) => p.id === "business") : mockSubscriptionPlans.filter((p) => p.id !== "business")

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-2">Choose Your Plan</h1>
          <p className="text-muted-foreground mb-8">Unlock more features and maximize your savings</p>

          {/* Billing Period Toggle */}
          <div className="inline-flex rounded-lg border border-border p-1">
            <button
              onClick={() => setBillingPeriod("monthly")}
              className={`px-6 py-2 rounded transition-colors ${
                billingPeriod === "monthly"
                  ? "bg-orange-500 text-white"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod("yearly")}
              className={`px-6 py-2 rounded transition-colors ${
                billingPeriod === "yearly"
                  ? "bg-orange-500 text-white"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Yearly (Save 20%)
            </button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {plans.map((plan) => {
            const isCurrentPlan = currentPlan === plan.id
            const isPopular = plan.id === "premium"

            return (
              <Card
                key={plan.id}
                className={`relative transition-all ${
                  isPopular ? "ring-2 ring-orange-500 md:scale-105" : ""
                } ${isCurrentPlan ? "border-orange-500" : ""}`}
              >
                {isPopular && (
                  <div className="absolute top-0 left-0 right-0 bg-orange-500 text-white text-center py-2 rounded-t-lg">
                    <span className="text-sm font-semibold">Most Popular</span>
                  </div>
                )}

                <CardHeader className={isPopular ? "pt-16" : ""}>
                  <CardTitle className="text-2xl capitalize">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-foreground">${plan.price}</span>
                    <span className="text-muted-foreground ml-2">/month</span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {isCurrentPlan && (
                    <Badge className="w-full justify-center bg-green-500">Current Plan</Badge>
                  )}

                  <Button
                    className={`w-full ${
                      isCurrentPlan
                        ? "bg-muted text-foreground cursor-not-allowed"
                        : isPopular
                          ? "bg-orange-500 hover:bg-orange-600"
                          : ""
                    }`}
                    disabled={isCurrentPlan}
                  >
                    {isCurrentPlan ? "Current Plan" : `Upgrade to ${plan.name}`}
                  </Button>

                  {/* Features */}
                  <div className="space-y-3">
                    {plan.features.slice(0, 5).map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        {feature.included ? (
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        ) : (
                          <X className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                        )}
                        <span
                          className={`text-sm ${
                            feature.included ? "text-foreground" : "text-muted-foreground line-through"
                          }`}
                        >
                          {feature.name}
                        </span>
                      </div>
                    ))}
                  </div>

                  {plan.benefits.length > 0 && (
                    <div className="pt-4 border-t border-border">
                      <p className="text-sm font-semibold text-foreground mb-2">Key Benefits:</p>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        {plan.benefits.slice(0, 3).map((benefit, idx) => (
                          <li key={idx}>✓ {benefit}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* FAQ Section */}
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {[
              {
                question: "Can I change plans anytime?",
                answer:
                  "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.",
              },
              {
                question: "What payment methods do you accept?",
                answer:
                  "We accept all major credit cards, Apple Pay, Google Pay, and PayPal for secure transactions.",
              },
              {
                question: "Is there a free trial?",
                answer:
                  "Start with our Free plan with no credit card required. Upgrade whenever you&apos;re ready!",
              },
              {
                question: "Do you offer refunds?",
                answer:
                  "If you&apos;re not satisfied within 30 days, we offer a full refund. No questions asked.",
              },
            ].map((item, idx) => (
              <div key={idx}>
                <h3 className="font-semibold text-foreground mb-2">{item.question}</h3>
                <p className="text-sm text-muted-foreground">{item.answer}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
