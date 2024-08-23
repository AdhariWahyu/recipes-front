import { useParams } from "react-router-dom"
import RecipeCardResult from "../components/RecipeCardResult"
import { useEffect, useState } from "react"
import { Category } from "../types/type"
import axios from "axios"

export default function CategoryLatestRecipeWrapper() {
  const { slug } = useParams<{ slug: string }>()
  const [category, setCategory] = useState<Category | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/category/${slug}`, {
        headers: {
          "X-API-KEY": "9874563210",
        },
      })
      .then((response) => {
        setCategory(response.data.data)
        setLoading(false)
      })
      .catch((error) => {
        setError(error)
        setLoading(false)
      })
  }, [slug])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!category) {
    return <div>Category not found</div>
  }
  return (
    <section id="LatestRecipes" className="px-5 mt-[30px]">
      <div className="flex items-center justify-between">
        <h2 className="font-bold">Latest Recipes</h2>
      </div>
      <div className="flex flex-col gap-[18px] mt-[18px]">
        {category.recipes.length > 0 ? (
          category.recipes.map((recipe) => (
            <RecipeCardResult key={recipe.id} recipe={recipe} />
          ))
        ) : (
          <p>Belum Ada Resep Terkait</p>
        )}
      </div>
    </section>
  )
}
