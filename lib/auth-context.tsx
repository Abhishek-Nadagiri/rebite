"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { User } from "./types"

interface AuthContextType {
  user: User | null
  login: (email: string, password: string, role: "consumer" | "restaurant") => Promise<void>
  signup: (email: string, password: string, name: string, role: "consumer" | "restaurant") => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem("rebite_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string, role: "consumer" | "restaurant") => {
    // Mock login - replace with real API call
    const mockUser: User = {
      id: Math.random().toString(36).substring(7),
      email,
      name: email.split("@")[0],
      role,
      createdAt: new Date(),
    }

    if (role === "restaurant") {
      mockUser.restaurantId = "rest-" + Math.random().toString(36).substring(7)
    }

    setUser(mockUser)
    localStorage.setItem("rebite_user", JSON.stringify(mockUser))
  }

  const signup = async (email: string, password: string, name: string, role: "consumer" | "restaurant") => {
    // Mock signup - replace with real API call
    const mockUser: User = {
      id: Math.random().toString(36).substring(7),
      email,
      name,
      role,
      createdAt: new Date(),
    }

    if (role === "restaurant") {
      mockUser.restaurantId = "rest-" + Math.random().toString(36).substring(7)
    }

    setUser(mockUser)
    localStorage.setItem("rebite_user", JSON.stringify(mockUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("rebite_user")
  }

  return <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
