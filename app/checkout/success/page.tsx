"use client"

import { useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Home, Package } from "lucide-react"
import Link from "next/link"

export default function CheckoutSuccessPage() {
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

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardContent className="flex flex-col items-center text-center py-12 px-6">
          <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 className="w-12 h-12 text-success" />
          </div>

          <h1 className="text-3xl font-bold text-foreground mb-3">Order Confirmed!</h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Your order has been placed successfully. You'll receive a confirmation email shortly with pickup details.
          </p>

          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-8 w-full">
            <p className="text-sm text-muted-foreground mb-2">Order Number</p>
            <p className="text-xl font-bold text-primary">
              #{Math.random().toString(36).substring(2, 10).toUpperCase()}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <Link href="/orders" className="flex-1">
              <Button variant="outline" className="w-full bg-transparent">
                <Package className="w-4 h-4 mr-2" />
                View Orders
              </Button>
            </Link>
            <Link href="/marketplace" className="flex-1">
              <Button className="w-full">
                <Home className="w-4 h-4 mr-2" />
                Back to Marketplace
              </Button>
            </Link>
          </div>

          <div className="mt-8 p-4 bg-success/5 border border-success/20 rounded-lg w-full">
            <p className="text-sm font-semibold text-success mb-1">Great job!</p>
            <p className="text-sm text-muted-foreground">
              You've just helped reduce food waste and made a positive environmental impact.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
