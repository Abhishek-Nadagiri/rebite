"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Utensils, ShoppingBag, LayoutDashboard, ChefHat, BarChart3, LogOut, Menu, X, ShoppingCart } from "lucide-react"
import { useState, useEffect } from "react"

export function Navigation() {
  const { user, logout } = useAuth()
  const { totalItems } = useCart()
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [mobileMenuOpen])

  const isActive = (path: string) => pathname === path

  const consumerLinks = [
    { href: "/marketplace", label: "Marketplace", icon: ShoppingBag },
    { href: "/recipes", label: "AI Recipes", icon: ChefHat },
    { href: "/orders", label: "My Orders", icon: LayoutDashboard },
    { href: "/impact", label: "Impact", icon: BarChart3 },
  ]

  const restaurantLinks = [
    { href: "/restaurant/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/restaurant/listings", label: "Listings", icon: ShoppingBag },
    { href: "/restaurant/orders", label: "Orders", icon: ChefHat },
    { href: "/impact", label: "Impact", icon: BarChart3 },
  ]

  const links = user?.role === "restaurant" ? restaurantLinks : consumerLinks

  return (
    <nav className="border-b border-border bg-card sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-500">
              <Utensils className="w-6 h-6 text-white" />
            </div>
            <span className="font-poppins font-bold text-xl text-foreground">ReBite</span>
          </Link>

          {user && (
            <>
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-1">
                {links.map((link) => {
                  const Icon = link.icon
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                        isActive(link.href)
                          ? "bg-primary text-white"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{link.label}</span>
                    </Link>
                  )
                })}
              </div>

              <div className="hidden md:flex items-center gap-3">
                {user.role === "consumer" && (
                  <Link href="/cart">
                    <Button variant="outline" size="sm" className="relative bg-transparent">
                      <ShoppingCart className="w-4 h-4" />
                      {totalItems > 0 && (
                        <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                          {totalItems}
                        </Badge>
                      )}
                    </Button>
                  </Link>
                )}
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">{user.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
                </div>
                <Button onClick={logout} variant="outline" size="sm">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors relative z-[60]"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-foreground" />
                ) : (
                  <Menu className="w-6 h-6 text-foreground" />
                )}
              </button>
            </>
          )}

          {!user && (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link href="/signup">
                <Button>Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {user && (
        <>
          {/* Backdrop */}
          <div
            className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden z-40 ${
              mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Slide-in Menu Panel */}
          <div
            className={`fixed top-0 right-0 h-full w-[85%] max-w-sm bg-card border-l border-border shadow-2xl transform transition-transform duration-300 ease-out md:hidden z-50 ${
              mobileMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex flex-col h-full">
              {/* Menu Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg">
                    <Utensils className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="text-base font-bold text-foreground">{user.name}</p>
                    <p className="text-xs text-muted-foreground capitalize flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span>
                      {user.role}
                    </p>
                  </div>
                </div>
              </div>

              {/* Menu Links */}
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-1">
                  {user.role === "consumer" && (
                    <Link
                      href="/cart"
                      onClick={() => setMobileMenuOpen(false)}
                      className="group flex items-center justify-between px-4 py-4 rounded-xl text-muted-foreground hover:bg-orange-50 dark:hover:bg-orange-950/30 hover:text-orange-600 dark:hover:text-orange-400 transition-all duration-200"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted group-hover:bg-orange-100 dark:group-hover:bg-orange-900/40 transition-colors">
                          <ShoppingCart className="w-5 h-5" />
                        </div>
                        <span className="font-semibold text-base">Cart</span>
                      </div>
                      {totalItems > 0 && (
                        <Badge className="bg-orange-500 hover:bg-orange-600 text-white border-0">{totalItems}</Badge>
                      )}
                    </Link>
                  )}

                  {links.map((link, index) => {
                    const Icon = link.icon
                    const active = isActive(link.href)
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        style={{ animationDelay: `${index * 50}ms` }}
                        className={`group flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-200 ${
                          active
                            ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30"
                            : "text-muted-foreground hover:bg-orange-50 dark:hover:bg-orange-950/30 hover:text-orange-600 dark:hover:text-orange-400"
                        }`}
                      >
                        <div
                          className={`flex items-center justify-center w-10 h-10 rounded-lg transition-colors ${
                            active
                              ? "bg-white/20"
                              : "bg-muted group-hover:bg-orange-100 dark:group-hover:bg-orange-900/40"
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="font-semibold text-base">{link.label}</span>
                      </Link>
                    )
                  })}
                </div>
              </div>

              {/* Menu Footer */}
              <div className="p-4 border-t border-border">
                <Button
                  onClick={() => {
                    logout()
                    setMobileMenuOpen(false)
                  }}
                  variant="outline"
                  className="w-full justify-start gap-3 h-12 text-base font-medium hover:bg-red-50 hover:text-red-600 hover:border-red-200 dark:hover:bg-red-950/30 dark:hover:border-red-800 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  )
}
