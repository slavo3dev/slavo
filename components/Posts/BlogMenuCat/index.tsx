import { FC, useEffect } from "react";
import { useCategory } from "@/lib/hooks/useCategory";

interface Props {
    categories: string[];
    onSearch: (param?: string) => void;
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
