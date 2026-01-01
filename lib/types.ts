export type UserRole = "consumer" | "restaurant"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  restaurantId?: string
  favoriteRestaurants?: string[]
  createdAt: Date
}

export interface Restaurant {
  id: string
  name: string
  address: string
  phone: string
  email: string
  description: string
  image: string
  rating: number
  ownerId: string
  createdAt: Date
}

export interface FoodListing {
  id: string
  restaurantId: string
  title: string
  description: string
  originalPrice: number
  discountedPrice: number
  discount: number
  quantity: number
  availableUntil: Date
  category: string
  image: string
  allergens: string[]
  dietaryInfo: string[]
  cookedAt?: Date
  expiryTime?: Date
  pickupInstructions?: string
  createdAt: Date
}

export interface Order {
  id: string
  userId: string
  restaurantId: string
  items: OrderItem[]
  totalAmount: number
  originalTotal?: number
  moneySaved?: number
  orderType?: "purchase" | "donation"
  status: "pending" | "confirmed" | "ready" | "completed" | "cancelled"
  pickupTime: Date
  createdAt: Date
}

export interface OrderItem {
  listingId: string
  title: string
  quantity: number
  price: number
}

export interface ImpactMetrics {
  totalMealsSaved: number
  co2Saved: number // in kg
  moneySaved: number
  wasteReduced: number // in kg
}

export interface YouTubeVideo {
  id: string
  title: string
  thumbnail: string
  channel: string
  url: string
}
