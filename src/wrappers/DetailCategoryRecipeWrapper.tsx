import { Swiper, SwiperSlide } from "swiper/react"
import FeaturedCard from "../components/FeaturedCard"
import { Category } from "../types/type"
import { useEffect, useState } from "react"
import axios from "axios"
import { Link, useParams } from "react-router-dom"

export default function DetailCategoryRecipeWrapper() {
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
    <section id="MadeByPeople">
      <div className="flex items-center justify-between px-5">
        <h2 className="font-bold">Made by People</h2>
        <a
          href="#"
          className="font-semibold text-sm leading-[21px] text-[#FF4C1C]"
        >
          Explore All
        </a>
      </div>
      <div className="swiper w-full mt-3">
        <Swiper
          className="w-full mt-3"
          direction="horizontal"
          spaceBetween={16}
          slidesPerView="auto"
          slidesOffsetBefore={20}
          slidesOffsetAfter={20}
        >
          {category.recipes.length > 0 ? (
            category.recipes.map((recipe) => (
              <SwiperSlide key={recipe.id} className="!w-fit">
                <Link to={`/recipe/${recipe.slug}`}>
                  <FeaturedCard recipe={recipe} />
                </Link>
              </SwiperSlide>
            ))
          ) : (
            <p>Belum Ada Data Resep dari Kategori Terkait</p>
          )}
        </Swiper>
      </div>
    </section>
  )
}
