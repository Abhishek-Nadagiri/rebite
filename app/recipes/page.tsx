"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { mockListings } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChefHat, Clock, Users, Sparkles, Plus, X, Loader2, ExternalLink, PlayCircle } from "lucide-react"
import type { YouTubeVideo } from "@/lib/types"

interface Recipe {
  name: string
  prepTime: string
  cookTime: string
  servings: number
  ingredients: string[]
  instructions: string[]
  nutrition: {
    calories: number
    protein: string
    carbs: string
    fat: string
  }
  wasteReductionTips: string[]
  videos?: YouTubeVideo[]
}

export default function RecipesPage() {
  const { user, isLoading: authLoading } = useAuth()
  const router = useRouter()
  const [ingredients, setIngredients] = useState<string[]>([])
  const [currentIngredient, setCurrentIngredient] = useState("")
  const [selectedRebiteItems, setSelectedRebiteItems] = useState<string[]>([])
  const [dietaryRestrictions, setDietaryRestrictions] = useState("")
  const [cuisine, setCuisine] = useState("")
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const userOrders = mockListings.slice(0, 4)

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

  const addIngredient = () => {
    if (currentIngredient.trim() && !ingredients.includes(currentIngredient.trim())) {
      setIngredients([...ingredients, currentIngredient.trim()])
      setCurrentIngredient("")
    }
  }

  const removeIngredient = (ingredient: string) => {
    setIngredients(ingredients.filter((i) => i !== ingredient))
  }

  const toggleRebiteItem = (itemTitle: string) => {
    setSelectedRebiteItems((prev) =>
      prev.includes(itemTitle) ? prev.filter((item) => item !== itemTitle) : [...prev, itemTitle],
    )
  }

  const handleGenerateRecipe = async () => {
    if (ingredients.length === 0 && selectedRebiteItems.length === 0) {
      alert("Please add at least one ingredient or select a ReBite item")
      return
    }

    setIsGenerating(true)
    setRecipe(null)

    try {
      const response = await fetch("/api/generate-recipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ingredients,
          rebiteItems: selectedRebiteItems,
          dietaryRestrictions,
          cuisine,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate recipe")
      }

      const data = await response.json()
      setRecipe(data.recipe)
    } catch (error) {
      console.error("[v0] Error generating recipe:", error)
      alert("Failed to generate recipe. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">AI Recipe Generator</h1>
          <p className="text-lg text-muted-foreground">
            Turn surplus ingredients into delicious meals with AI-powered recipes
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ChefHat className="w-5 h-5 text-primary" />
                Create Your Recipe
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Your ReBite Items (Optional)</Label>
                <div className="border border-border rounded-lg p-4 space-y-3 max-h-48 overflow-y-auto">
                  {userOrders.length > 0 ? (
                    userOrders.map((item) => (
                      <div key={item.id} className="flex items-center gap-3">
                        <Checkbox
                          id={item.id}
                          checked={selectedRebiteItems.includes(item.title)}
                          onCheckedChange={() => toggleRebiteItem(item.title)}
                        />
                        <label htmlFor={item.id} className="flex-1 flex items-center gap-3 cursor-pointer text-sm">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.title}
                            className="w-10 h-10 rounded object-cover"
                          />
                          <span>{item.title}</span>
                        </label>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No purchased items yet. Order from the marketplace first!
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="ingredient">Add Home Ingredients</Label>
                <div className="flex gap-2">
                  <Input
                    id="ingredient"
                    value={currentIngredient}
                    onChange={(e) => setCurrentIngredient(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addIngredient()
                      }
                    }}
                    placeholder="e.g., eggs, rice, spices"
                  />
                  <Button onClick={addIngredient} type="button">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                {ingredients.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {ingredients.map((ingredient) => (
                      <Badge key={ingredient} variant="secondary" className="gap-1 pr-1">
                        {ingredient}
                        <button
                          onClick={() => removeIngredient(ingredient)}
                          className="ml-1 hover:bg-muted rounded-full p-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="dietary">Dietary Restrictions (Optional)</Label>
                <Input
                  id="dietary"
                  value={dietaryRestrictions}
                  onChange={(e) => setDietaryRestrictions(e.target.value)}
                  placeholder="e.g., vegetarian, gluten-free, dairy-free"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cuisine">Cuisine Style (Optional)</Label>
                <Select value={cuisine} onValueChange={setCuisine}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select cuisine" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    <SelectItem value="italian">Italian</SelectItem>
                    <SelectItem value="mexican">Mexican</SelectItem>
                    <SelectItem value="asian">Asian</SelectItem>
                    <SelectItem value="mediterranean">Mediterranean</SelectItem>
                    <SelectItem value="american">American</SelectItem>
                    <SelectItem value="indian">Indian</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={handleGenerateRecipe}
                disabled={isGenerating || (ingredients.length === 0 && selectedRebiteItems.length === 0)}
                className="w-full"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating Recipe...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Recipe
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Recipe Display */}
          <div className="space-y-6">
            {!recipe && !isGenerating && (
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <ChefHat className="w-16 h-16 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Your Recipe Will Appear Here</h3>
                  <p className="text-muted-foreground text-center">Add ingredients and click generate to get started</p>
                </CardContent>
              </Card>
            )}

            {isGenerating && (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <Loader2 className="w-16 h-16 text-primary animate-spin mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Creating Your Recipe</h3>
                  <p className="text-muted-foreground text-center">AI is crafting the perfect dish for you...</p>
                </CardContent>
              </Card>
            )}

            {recipe && (
              <div className="space-y-6">
                {recipe.videos && recipe.videos.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <PlayCircle className="w-5 h-5 text-primary" />
                        Video Tutorials
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {recipe.videos.map((video) => (
                          <a
                            key={video.id}
                            href={video.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex gap-3 p-3 rounded-lg hover:bg-muted transition-colors group"
                          >
                            <img
                              src={video.thumbnail || "/placeholder.svg"}
                              alt={video.title}
                              className="w-32 h-20 rounded object-cover flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                                {video.title}
                              </h4>
                              <p className="text-xs text-muted-foreground mt-1">{video.channel}</p>
                            </div>
                            <ExternalLink className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" />
                          </a>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">{recipe.name}</CardTitle>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-2">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Prep: {recipe.prepTime}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Cook: {recipe.cookTime}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        Serves: {recipe.servings}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-lg mb-3">Ingredients</h3>
                      <ul className="space-y-2">
                        {recipe.ingredients.map((ingredient, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span>{ingredient}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg mb-3">Instructions</h3>
                      <ol className="space-y-3">
                        {recipe.instructions.map((instruction, index) => (
                          <li key={index} className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold">
                              {index + 1}
                            </span>
                            <span className="leading-relaxed">{instruction}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    <div className="bg-muted rounded-lg p-4">
                      <h3 className="font-semibold text-lg mb-3">Nutrition (per serving)</h3>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="text-muted-foreground">Calories:</span>{" "}
                          <span className="font-medium">{recipe.nutrition.calories}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Protein:</span>{" "}
                          <span className="font-medium">{recipe.nutrition.protein}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Carbs:</span>{" "}
                          <span className="font-medium">{recipe.nutrition.carbs}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Fat:</span>{" "}
                          <span className="font-medium">{recipe.nutrition.fat}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                      <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-success" />
                        Waste Reduction Tips
                      </h3>
                      <ul className="space-y-2">
                        {recipe.wasteReductionTips.map((tip, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <span className="text-success mt-0.5">✓</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
