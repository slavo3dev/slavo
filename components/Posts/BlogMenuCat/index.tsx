import { useCategoryHook } from "@/lib/hooks/useCategoryHook";
import { FC } from "react";
import { CategoryTags } from "@/lib/helpers/categoryTags";

export interface CatProps {
    categories: string[];
    onSearch: ( param: string ) => void;
    selectedCategory: string; 
    setActiveCategory: () => void;
}


export const BlogMenuCat: FC<CatProps> = ({ categories, onSearch, selectedCategory, setActiveCategory  }) => {
    const { activeCategory, handleCategoryClick, isActive } = useCategoryHook(categories, "selectedCategory");

    return (
        <CategoryTags
          categories={categories}
          handleCategoryClick={(category) => {
          handleCategoryClick(category);
          onSearch(category); 
      }}
      isActive={isActive}
        />
    );
};