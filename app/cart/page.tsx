"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { useCart } from "@/lib/cart-context"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingCart, Plus, Minus, Trash2, ArrowRight } from "lucide-react"
import { mockRestaurants } from "@/lib/mock-data"

export default function CartPage() {
  const { user, isLoading: authLoading } = useAuth()
  const { cart, removeFromCart, updateQuantity, clearCart, totalAmount } = useCart()
  const router = useRouter()
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login")
    }
  }, [user, authLoading, router])

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  if (!user) return null

  const handleCheckout = async () => {
    setIsCheckingOut(true)
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))
    clearCart()
    setIsCheckingOut(false)
    router.push("/checkout/success")
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Shopping Cart</h1>
          <p className="text-lg text-muted-foreground">Review your items before checkout</p>
        </div>

        {cart.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <ShoppingCart className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
              <p className="text-muted-foreground text-center mb-6">
                Browse the marketplace to find amazing food deals!
              </p>
              <Button onClick={() => router.push("/marketplace")}>
                Browse Marketplace
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => {
                const restaurant = mockRestaurants.find((r) => r.id === item.restaurantId)
                return (
                  <Card key={item.id}>
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          className="w-24 h-24 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-semibold text-lg">{item.title}</h3>
                              {restaurant && <p className="text-sm text-muted-foreground">{restaurant.name}</p>}
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-muted-foreground hover:text-destructive transition-colors"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>

                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center gap-3 border border-border rounded-lg">
                              <button
                                onClick={() => updateQuantity(item.id, item.cartQuantity - 1)}
                                className="p-2 hover:bg-muted transition-colors rounded-l-lg"
                                disabled={item.cartQuantity <= 1}
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="w-12 text-center font-medium">{item.cartQuantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.cartQuantity + 1)}
                                className="p-2 hover:bg-muted transition-colors rounded-r-lg"
                                disabled={item.cartQuantity >= item.quantity}
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                            <div className="text-right">
                              <div className="text-xl font-bold text-primary">
                                ${(item.discountedPrice * item.cartQuantity).toFixed(2)}
                              </div>
                              <div className="text-sm text-muted-foreground line-through">
                                ${(item.originalPrice * item.cartQuantity).toFixed(2)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Order Summary */}
            <div>
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">${totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Service Fee</span>
                    <span className="font-medium">$0.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Savings</span>
                    <span className="font-medium text-success">
                      -$
                      {cart
                        .reduce((sum, item) => sum + (item.originalPrice - item.discountedPrice) * item.cartQuantity, 0)
                        .toFixed(2)}
                    </span>
                  </div>
                  <div className="border-t border-border pt-4">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-lg">Total</span>
                      <span className="font-bold text-2xl text-primary">${totalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-3">
                  <Button onClick={handleCheckout} disabled={isCheckingOut} className="w-full">
                    {isCheckingOut ? "Processing..." : "Proceed to Checkout"}
                    {!isCheckingOut && <ArrowRight className="w-4 h-4 ml-2" />}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => router.push("/marketplace")}
                    className="w-full bg-transparent"
                  >
                    Continue Shopping
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
