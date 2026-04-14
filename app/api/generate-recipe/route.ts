export async function POST(request: Request) {
  try {
    const { ingredients, dietaryRestrictions, cuisine, rebiteItems } = await request.json()

    if (!ingredients || ingredients.length === 0) {
      return Response.json({ error: "Ingredients are required" }, { status: 400 })
    }

    // Mock AI response - simulates recipe generation
    await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulate API delay

    // Combine ReBite items with home ingredients
    const allIngredients = [...ingredients]
    const rebiteItemNames = rebiteItems || []

    const mainIngredient = rebiteItemNames.length > 0 ? rebiteItemNames[0] : ingredients[0]
    const recipeName = `${cuisine ? cuisine.charAt(0).toUpperCase() + cuisine.slice(1) : "Delicious"} ${mainIngredient.charAt(0).toUpperCase() + mainIngredient.slice(1)} Dish`

    // Generate mock YouTube videos based on ingredients
    const searchQuery = `${mainIngredient} ${cuisine || ""} recipe`.trim()
    const videos = [
      {
        id: "vid-1",
        title: `How to Make Perfect ${mainIngredient.charAt(0).toUpperCase() + mainIngredient.slice(1)} - Easy Recipe`,
        thumbnail: `/placeholder.svg?height=180&width=320&query=${encodeURIComponent(searchQuery + " cooking")}`,
        channel: "Chef's Kitchen",
        url: `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`,
      },
      {
        id: "vid-2",
        title: `${cuisine ? cuisine.charAt(0).toUpperCase() + cuisine.slice(1) : "Quick"} ${mainIngredient} Recipe in 20 Minutes`,
        thumbnail: `/placeholder.svg?height=180&width=320&query=${encodeURIComponent(searchQuery + " food")}`,
        channel: "Food Network",
        url: `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery + " quick")}`,
      },
      {
        id: "vid-3",
        title: `Restaurant Style ${mainIngredient} | Professional Chef Recipe`,
        thumbnail: `/placeholder.svg?height=180&width=320&query=${encodeURIComponent(searchQuery + " professional")}`,
        channel: "Pro Chef Cooking",
        url: `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery + " restaurant style")}`,
      },
    ]

    const recipe = {
      name: recipeName,
      prepTime: "15 minutes",
      cookTime: "25 minutes",
      servings: 4,
      ingredients: [
        `2 cups ${mainIngredient}`,
        ...allIngredients.slice(1).map((ing: string) => `1 cup ${ing}`),
        "2 tablespoons olive oil",
        "Salt and pepper to taste",
        "Fresh herbs for garnish",
      ],
      instructions: [
        rebiteItemNames.length > 0
          ? `Start with your ReBite ${mainIngredient}, ensuring it's at the right temperature.`
          : `Prepare and clean the ${mainIngredient}, cutting into appropriate sizes.`,
        `Heat olive oil in a large pan over medium heat.`,
        `Add ${allIngredients.slice(0, 2).join(" and ")} to the pan and cook for 5-7 minutes until tender.`,
        `Season with salt and pepper to taste${dietaryRestrictions ? `, ensuring ${dietaryRestrictions} requirements are met` : ""}.`,
        `Continue cooking for another 10-12 minutes, stirring occasionally.`,
        `Add remaining ingredients and cook for 5 more minutes.`,
        `Garnish with fresh herbs and serve hot.`,
      ],
      nutrition: {
        calories: 320,
        protein: "18g",
        carbs: "35g",
        fat: "12g",
      },
      wasteReductionTips: [
        rebiteItemNames.length > 0
          ? `You're already saving food waste by using ReBite surplus items!`
          : `Save any leftover ${mainIngredient} scraps for vegetable stock.`,
        "Store leftovers in an airtight container for up to 3 days.",
        "Freeze portions for quick future meals.",
        "Use herb stems and vegetable scraps for composting.",
      ],
      videos,
    }

    return Response.json({ recipe })
  } catch (error) {
    console.error("[v0] Recipe generation error:", error)
    return Response.json({ error: "Failed to generate recipe" }, { status: 500 })
  }
}
