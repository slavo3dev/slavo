import { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { DropDown } from '@/components/DropDown'
import { useCategoryHook } from '@/lib/hooks/useCategoryHook'
import { CatProps } from "../BlogMenuCat"

export const BlogDropDown: FC<CatProps> = ({ categories, onSearch }) => {

    const router = useRouter()
    const { activeCategory, handleCategoryClick } = useCategoryHook(categories, "selectedCategory");
    const [selectedOption, setSelectedOption] = useState(activeCategory);

    // Handler to manage category selection and trigger onSearch
     useEffect(() => {
        setSelectedOption(activeCategory);
    }, [activeCategory]);

    const handleItemClick = (category: string) => {
        setSelectedOption(category); // Update the selected option state
        handleCategoryClick(category); // Update the active category in the hook
        
        const categorySlug = category.toLowerCase().replace(" ", "-");
        category === "ALL" 
            ? router.push("/blog")  // Redirect to the blog page if "ALL" is selected
            : onSearch(categorySlug); // Trigger search for a specific category
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