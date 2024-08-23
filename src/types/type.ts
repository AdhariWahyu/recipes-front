export interface Recipe {
  id: number
  name: string
  slug: string
  url_file: string
  url_video: string
  photos: Photo[]
  author: Author
  category: Category
  thumbnail: string
  tutorials: Tutorial[]
  recipe_ingredients: RecipeIngredient[]
  about: string
}

interface Photo {
  id: number
  photo: string
}

interface Tutorial {
  id: number
  name: string
}

interface Author {
  id: number
  name: string
  photo: string
}

interface RecipeIngredient {
  id: number
  ingredients: Ingredient
}

interface Ingredient {
  id: number
  name: string
  photo: string
}

export interface Category {
  id: number
  name: string
  slug: string
  icon: string
  recipes_count: number
  recipes: Recipe[]
}
