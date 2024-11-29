import { FC } from 'react'
import { DropDown } from '@/components/DropDown'
import { useCategoryHook } from '@/lib/hooks/useCategoryHook'
import { CatProps } from "../BlogMenuCat"

export const BlogDropDown: FC<CatProps> = ({ categories, onSearch }) => {


    const { activeCategory, handleCategoryClick } = useCategoryHook(categories, "selectedCategory");

    // Handler to manage category selection and trigger onSearch
    const handleItemClick = (category: string) => {
        handleCategoryClick(category); // Updates the active category
        onSearch(category); // Triggers the search with the selected category
    };

    return (
        <DropDown
            label="Blog" // Show the active category or a default label
            items={categories}
            // Use the handleItemClick to manage the dropdown item click logic
            onItemClick={handleItemClick}
        />
    );
};