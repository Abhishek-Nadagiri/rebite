"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Utensils, ShoppingBag, TrendingDown, Heart, ArrowRight } from "lucide-react"

export default function Home() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && user) {
      if (user.role === "restaurant") {
        router.push("/restaurant/dashboard")
      } else {
        router.push("/marketplace")
      }
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Utensils className="w-12 h-12 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (user) {
    return null // Will redirect
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-orange-500/10 text-orange-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Utensils className="w-4 h-4" />
                Fighting Food Waste Together
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight text-balance">
                Save Money. Save Food. Save the Planet.
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed text-pretty">
                Discover delicious surplus meals from local restaurants at up to 70% off. Join the movement to reduce
                food waste and make a real environmental impact.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/signup">
                  <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary-dark">
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="/fresh-healthy-food-plate-aerial-view.jpg"
                alt="Fresh food"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">1,247</div>
              <div className="text-primary-light opacity-90">Meals Saved</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">3.7t</div>
              <div className="text-primary-light opacity-90">CO2 Reduced</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">$18K</div>
              <div className="text-primary-light opacity-90">Money Saved</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">935kg</div>
              <div className="text-primary-light opacity-90">Waste Prevented</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">How ReBite Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Simple, sustainable, and smart. Join thousands making a difference.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card border border-border rounded-xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <ShoppingBag className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Browse Surplus Food</h3>
              <p className="text-muted-foreground leading-relaxed">
                Discover amazing deals on quality food from local restaurants. Fresh meals at up to 70% off regular
                prices.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mb-6">
                <TrendingDown className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Save Money</h3>
              <p className="text-muted-foreground leading-relaxed">
                Get restaurant-quality meals for a fraction of the price. Perfect for budget-conscious foodies who care
                about quality.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-success/10 rounded-full flex items-center justify-center mb-6">
                <Heart className="w-7 h-7 text-success" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Make an Impact</h3>
              <p className="text-muted-foreground leading-relaxed">
                Every meal saved reduces waste and CO2 emissions. Track your environmental impact and share your
                contribution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90 text-pretty">
            Join ReBite today and start saving money while fighting food waste. Your next delicious meal is waiting.
          </p>
          <Link href="/signup">
            <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
              Sign Up Free
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Utensils className="w-6 h-6 text-orange-500" />
              <span className="font-poppins font-bold text-lg">ReBite</span>
            </div>
            <p className="text-sm text-muted-foreground">© 2025 ReBite. Fighting food waste, one meal at a time.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
