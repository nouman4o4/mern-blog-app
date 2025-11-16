import React, { useState } from "react"
import { useNavigate } from "react-router"

// Define a type for the category
interface Category {
  id: number // A unique identifier for each category
  name: string // The name of the category
  imageUrl: string // The URL of the category image
}

// Dummy data for favorite categories
const categories: Category[] = [
  {
    id: 0,
    name: "Recent",
    imageUrl:
      "https://thumbs.dreamstime.com/b/young-girl-writing-blog-laptop-sitting-wooden-desk-cup-coffee-smartphone-99344707.jpg",
  },
  {
    id: 1,
    name: "Technology",
    imageUrl:
      "https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Travel",
    imageUrl:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Food",
    imageUrl:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Lifestyle",
    imageUrl:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    name: "Business",
    imageUrl:
      "https://images.unsplash.com/photo-1556742031-c6961e8560b0?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    name: "Health",
    imageUrl:
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80",
  },
]

const Categories: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("")

  const navigate = useNavigate()
  const handleSelctCategory = (selectedCategory: string) => {
    setSelectedCategory(selectedCategory)

    navigate(
      selectedCategory === "recent" ? "/" : `/?category=${selectedCategory}`
    )
  }
  return (
    <div className="w-full min-h- bg-gray-50 p-6 px-1 md:p-12">
      <h3 className="text-xl font-bold my-1 text-black p-3">
        Favorite Categories
      </h3>
      <div className="w-full h-full flex flex-wrap justify-start">
        {categories.map((category) => (
          <div
            key={category.id}
            onClick={() => handleSelctCategory(category.name.toLowerCase())}
            className={`box w-25 h-30 p-1 m-2 cursor-pointer border-b-4 ${
              category.name.toLocaleLowerCase() === selectedCategory
                ? "border-red-300"
                : " border-transparent"
            }`}
          >
            <div className="photo w-full h-21 overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src={category.imageUrl}
                alt={category.name}
              />
            </div>
            <h4 className="font-semibold py-1">{category.name}</h4>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Categories
