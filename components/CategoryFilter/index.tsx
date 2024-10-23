import { FC, useEffect } from "react";
import { CATEGORIES } from "@/lib/constants";
import { useCategoryHook } from "@/lib/hooks/useCategoryHook";
import { CategoryTags } from "@/lib/helpers/categoryTags";

export const CategoryFilter: FC<any> = ({ setCurrentCategory }) => {

    const { activeCategory, handleCategoryClick, isActive } = useCategoryHook(
        CATEGORIES.map((cat : any) => cat.name),
        "selectedResCat"
    );

    useEffect(() => {
        setCurrentCategory(activeCategory);
    }, [activeCategory, setCurrentCategory]);

    return (
       <CategoryTags
            categories={CATEGORIES}
            handleCategoryClick={handleCategoryClick}
            isActive={isActive}
       />
    );
}
