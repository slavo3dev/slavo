import { FC } from "react";

interface CategoryTagsProps { 
    categories: string [] | { name: string } []; 
    handleCategoryClick: (category: string) => void;
    isActive: (category: string) => boolean;
}

export const CategoryTags: FC<CategoryTagsProps> = ({ categories, handleCategoryClick, isActive }) => {
    return (
        <div className="flex flex-wrap gap-5 mt-8 justify-center cursor-pointer mb-6">
            {categories.map((category: string | { name: string}) => {
                const categoryName = typeof category === "string" ? category : category.name; 
                return (
                    <span
                        key={categoryName}
                        onClick={() => handleCategoryClick(categoryName)}
                        className={`text-xs font-semibold text-indigo-600 border border-indigo-300 rounded-full inline-flex items-center px-2.5 py-1 hover:text-red-600 ${
                            isActive(categoryName) ? "bg-blue-500 text-white" : "bg-indigo-50"
                        }`}
                    >
                        {categoryName === "all" ? "ALL" : categoryName}
                    </span>
                )
            })}
        </div>
    )
}