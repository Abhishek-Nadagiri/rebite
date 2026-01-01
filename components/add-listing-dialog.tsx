"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { FoodListing } from "@/lib/types"

interface AddListingDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAdd: (listing: Omit<FoodListing, "id" | "createdAt" | "restaurantId">) => void
}

export function AddListingDialog({ open, onOpenChange, onAdd }: AddListingDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const originalPrice = Number.parseFloat(formData.get("originalPrice") as string)
    const discountedPrice = Number.parseFloat(formData.get("discountedPrice") as string)
    const discount = Math.round(((originalPrice - discountedPrice) / originalPrice) * 100)

    const hours = Number.parseInt(formData.get("hours") as string)
    const availableUntil = new Date(Date.now() + hours * 60 * 60 * 1000)

    const listing: Omit<FoodListing, "id" | "createdAt" | "restaurantId"> = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      originalPrice,
      discountedPrice,
      discount,
      quantity: Number.parseInt(formData.get("quantity") as string),
      availableUntil,
      category: formData.get("category") as string,
      image: "/delicious-food-plate.png",
      allergens: (formData.get("allergens") as string)
        .split(",")
        .map((a) => a.trim())
        .filter(Boolean),
      dietaryInfo: (formData.get("dietaryInfo") as string)
        .split(",")
        .map((d) => d.trim())
        .filter(Boolean),
    }

    await new Promise((resolve) => setTimeout(resolve, 500))
    onAdd(listing)
    setIsSubmitting(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Listing</DialogTitle>
          <DialogDescription>Create a new surplus food listing for customers to discover</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 col-span-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" placeholder="Fresh Garden Salad" required />
            </div>

            <div className="space-y-2 col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe your food item..."
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select name="category" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Salads">Salads</SelectItem>
                  <SelectItem value="Main Course">Main Course</SelectItem>
                  <SelectItem value="Sandwiches">Sandwiches</SelectItem>
                  <SelectItem value="Bakery">Bakery</SelectItem>
                  <SelectItem value="Desserts">Desserts</SelectItem>
                  <SelectItem value="Seafood">Seafood</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity Available</Label>
              <Input id="quantity" name="quantity" type="number" min="1" defaultValue="5" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="originalPrice">Original Price ($)</Label>
              <Input
                id="originalPrice"
                name="originalPrice"
                type="number"
                step="0.01"
                min="0.01"
                placeholder="12.99"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="discountedPrice">Discounted Price ($)</Label>
              <Input
                id="discountedPrice"
                name="discountedPrice"
                type="number"
                step="0.01"
                min="0.01"
                placeholder="4.99"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hours">Available For (hours)</Label>
              <Input id="hours" name="hours" type="number" min="1" defaultValue="3" required />
            </div>

            <div className="space-y-2 col-span-2">
              <Label htmlFor="allergens">Allergens (comma separated)</Label>
              <Input id="allergens" name="allergens" placeholder="nuts, dairy, gluten" />
            </div>

            <div className="space-y-2 col-span-2">
              <Label htmlFor="dietaryInfo">Dietary Info (comma separated)</Label>
              <Input id="dietaryInfo" name="dietaryInfo" placeholder="vegetarian, vegan, gluten-free" />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add Listing"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
