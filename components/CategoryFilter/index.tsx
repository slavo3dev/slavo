import { FC, useEffect } from "react";
import { CATEGORIES } from "@/lib/constants";
import { useCategory } from "@/lib/hooks/useCategory";

export const CategoryFilter: FC<any> = ({ setCurrentCategory }) => {

    const { activeCategory, handleCategoryClick, isActive } = useCategory(
        CATEGORIES.map((cat : any) => cat.name),
        "selectedResCat"
    );

    useEffect(() => {
        setCurrentCategory(activeCategory);
    }, [activeCategory, setCurrentCategory]);

    return (
        <aside className="flex flex-wrap gap-5 mt-8 justify-center">
            {CATEGORIES.map((cat: any) => (
                <span
                    key={cat.name}
                    onClick={() => handleCategoryClick(cat.name)}
                    className={`text-xs font-semibold text-indigo-600 border border-indigo-300 rounded-full inline-flex items-center px-2.5 py-1 hover:text-red-600 cursor-pointer 
                        ${isActive(cat.name) ? "bg-blue-500 text-white" : "bg-indigo-50"}`}
                >
                    {cat.name === "all" ? "ALL" : cat.name}
                </span>
            ))}
        </aside>
    );
}
