import { useCategoryHook } from "@/lib/hooks/useCategoryHook";
import { FC, useEffect } from "react";
import { CategoryTags } from "@/lib/helpers/categoryTags";

export interface CatProps {
    categories: string[];
    onSearch: ( param: string ) => void
}


export const BlogMenuCat: FC<CatProps> = ({ categories, onSearch }) => {
    const { activeCategory, handleCategoryClick, isActive } = useCategoryHook(categories, "selectedCategory");

    useEffect(() => {
        if (activeCategory) {
            onSearch(activeCategory);
        }
    }, [activeCategory, onSearch]);

    return (
        <CategoryTags
            categories={categories}
            handleCategoryClick={handleCategoryClick}
            isActive={isActive}
        />
    );
};

/* 
    <span className="text-xs font-semibold text-gray-900 bg-gray-50 border border-gray-300 rounded-full inline-flex items-center px-2.5 py-1"> Normal </span>

    <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 border border-indigo-300 rounded-full inline-flex items-center px-2.5 py-1"> Regular </span>

    <span className="text-xs font-semibold text-green-600 bg-green-50 border border-green-300 rounded-full inline-flex items-center px-2.5 py-1"> Positive </span>

    <span className="text-xs font-semibold text-yellow-600 bg-yellow-50 border border-yellow-300 rounded-full inline-flex items-center px-2.5 py-1"> New </span>

    <span className="text-xs font-semibold text-red-600 bg-red-50 border border-red-300 rounded-full inline-flex items-center px-2.5 py-1"> Important </span>

    <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 border border-indigo-300 rounded-full inline-flex items-center px-1.5 py-1"> 18 </span>
*/