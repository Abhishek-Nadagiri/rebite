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

// Community & Social Features
export interface UserProfile {
  id: string
  userId: string
  bio: string
  avatar: string
  location: string
  dietaryPreferences: string[]
  followers: string[]
  following: string[]
  joinedAt: Date
}

export interface Review {
  id: string
  userId: string
  userName: string
  restaurantId: string
  rating: number
  comment: string
  createdAt: Date
}

// Gamification & Rewards
export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  criteria: string
}

export interface UserAchievement {
  id: string
  userId: string
  badgeId: string
  unlockedAt: Date
}

export interface Streak {
  userId: string
  currentStreak: number
  longestStreak: number
  lastActivityDate: Date
}

export interface LoyaltyTier {
  name: "bronze" | "silver" | "gold" | "platinum"
  minPoints: number
  benefits: string[]
  discountPercentage: number
}

// Points & Rewards
export interface Points {
  userId: string
  totalPoints: number
  redeemablePoints: number
  pointsHistory: PointTransaction[]
}

export interface PointTransaction {
  id: string
  userId: string
  amount: number
  type: "earn" | "redeem"
  description: string
  createdAt: Date
}

// Advanced Analytics
export interface DetailedAnalytics {
  userId: string
  dailyStats: DailyStat[]
  weeklyStats: WeeklyStat[]
  monthlyStats: MonthlyStat[]
}

export interface DailyStat {
  date: Date
  mealsSaved: number
  co2Saved: number
  moneySaved: number
  waterSaved: number
}

export interface WeeklyStat {
  week: number
  year: number
  totalMealsSaved: number
  totalCO2Saved: number
  totalMoneySaved: number
  totalWaterSaved: number
}

export interface MonthlyStat {
  month: number
  year: number
  totalMealsSaved: number
  totalCO2Saved: number
  totalMoneySaved: number
  totalWaterSaved: number
}

// Premium Membership
export interface SubscriptionPlan {
  id: "free" | "pro" | "premium" | "business"
  name: string
  price: number
  billingPeriod: "monthly" | "yearly"
  features: SubscriptionFeature[]
  benefits: string[]
}

export interface SubscriptionFeature {
  name: string
  description: string
  included: boolean
}

export interface UserSubscription {
  userId: string
  planId: string
  status: "active" | "cancelled" | "expired"
  startDate: Date
  endDate: Date
  autoRenew: boolean
}

// Smart Recommendations
export interface Recommendation {
  listingId: string
  title: string
  restaurantId: string
  reason: string
  score: number
}

// Charity & Community
export interface CharityCampaign {
  id: string
  title: string
  description: string
  targetAmount: number
  currentAmount: number
  beneficiary: string
  endDate: Date
  createdAt: Date
}

export interface DonationRecord {
  id: string
  userId: string
  campaignId: string
  amount: number
  mealsDonated: number
  createdAt: Date
}

// Activity Feed
export interface Activity {
  id: string
  userId: string
  userName: string
  userAvatar: string
  type: "purchase" | "achievement" | "review" | "follow"
  description: string
  timestamp: Date
  metadata?: Record<string, string>
}

// Notifications
export interface Notification {
  id: string
  userId: string
  type: "deal" | "achievement" | "reminder" | "update" | "message"
  title: string
  message: string
  link?: string
  read: boolean
  createdAt: Date
}
