"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { FoodListing } from "./types"

interface CartItem extends FoodListing {
  cartQuantity: number
}

interface CartContextType {
  cart: CartItem[]
  addToCart: (listing: FoodListing, quantity?: number) => void
  removeFromCart: (listingId: string) => void
  updateQuantity: (listingId: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalAmount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])

  useEffect(() => {
    const storedCart = localStorage.getItem("rebite_cart")
    if (storedCart) {
      setCart(JSON.parse(storedCart))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("rebite_cart", JSON.stringify(cart))
  }, [cart])

  const addToCart = (listing: FoodListing, quantity = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === listing.id)
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === listing.id
            ? { ...item, cartQuantity: Math.min(item.cartQuantity + quantity, item.quantity) }
            : item,
        )
      }
      return [...prevCart, { ...listing, cartQuantity: quantity }]
    })
  }

  const removeFromCart = (listingId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== listingId))
  }

  const updateQuantity = (listingId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(listingId)
      return
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === listingId ? { ...item, cartQuantity: Math.min(quantity, item.quantity) } : item,
      ),
    )
  }

  const clearCart = () => {
    setCart([])
  }

  const totalItems = cart.reduce((sum, item) => sum + item.cartQuantity, 0)
  const totalAmount = cart.reduce((sum, item) => sum + item.discountedPrice * item.cartQuantity, 0)

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalAmount }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
