import { useCategory } from "@/lib/hooks/useCategory";
import { FC, useEffect } from "react";

interface Props {
    categories: string[];
    onSearch: ( param?: string ) => void
}

export const BlogMenuCat: FC<Props> = ({ categories, onSearch }) => {
    const { activeCategory, handleCategoryClick, isActive } = useCategory(categories);

    useEffect(() => {
        if (activeCategory) {
            onSearch(activeCategory);
        }
    }, [activeCategory, onSearch]);

    return (
        <div className="flex flex-wrap gap-5 mt-8 justify-center cursor-pointer">
            {categories.map((category: string, index: number) => (
                <span
                    key={category}
                    onClick={() => handleCategoryClick(category)}
                    className={`text-xs font-semibold text-indigo-600 border border-indigo-300 rounded-full inline-flex items-center px-2.5 py-1 hover:text-red-600 ${
                        isActive(category) ? "bg-blue-500 text-white" : "bg-indigo-50"
                    }`}
                >
                    {category}
                </span>
            ))}
        </div>
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