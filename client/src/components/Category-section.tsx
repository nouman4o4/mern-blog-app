import React, { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router";

// Define a type for the category
interface Category {
  id: number; // A unique identifier for each category
  name: string; // The name of the category
  imageUrl: string; // The URL of the category image
}

// Dummy data for favorite categories
const categories: Category[] = [
  {
    id: 1,
    name: "Technology",
    imageUrl:
      "https://html.quomodosoft.com/binduz/assets/images/favorites-categories-1.png",
  },
  {
    id: 2,
    name: "Travel",
    imageUrl:
      "https://html.quomodosoft.com/binduz/assets/images/favorites-categories-3.png",
  },
  {
    id: 3,
    name: "Food",
    imageUrl:
      "https://html.quomodosoft.com/binduz/assets/images/favorites-categories-4.png",
  },
  {
    id: 4,
    name: "Lifestyle",
    imageUrl:
      "https://html.quomodosoft.com/binduz/assets/images/favorites-categories-5.png",
  },
  {
    id: 5,
    name: "Business",
    imageUrl:
      "https://html.quomodosoft.com/binduz/assets/images/favorites-categories-6.png",
  },
  {
    id: 6,
    name: "Health",
    imageUrl:
      "https://html.quomodosoft.com/binduz/assets/images/favorites-categories-7.png",
  },
];

const Categories: React.FC = () => {
  const navigate = useNavigate();
  const handleSelctCategory = (selectedCategory: string) => {
    navigate(`/?category=${selectedCategory}`);
  };
  return (
    <div className="w-full min-h- bg-gray-50 p-6 px-1 md:p-12">
      <h3 className="text-xl font-bold my-1 text-black p-3">
        Favorite Categories
      </h3>
      <div className="w-full h-full flex flex-wrap justify-start">
        {categories.map((category) => (
          <div
            key={category.id}
            onClick={() =>
              handleSelctCategory(category.name.toLowerCase())
            }
            className="box w-25 h-30 p-1 m-2 cursor-pointer">
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
  );
};

export default Categories;
