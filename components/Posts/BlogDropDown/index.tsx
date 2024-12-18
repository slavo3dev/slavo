import { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { DropDown } from '@/components/DropDown'
import { useCategoryHook } from '@/lib/hooks/useCategoryHook'
import { CatProps } from "../BlogMenuCat"

export const BlogDropDown: FC<CatProps> = ({ categories, onSearch }) => {

    const router = useRouter()
    const { activeCategory, handleCategoryClick } = useCategoryHook(categories, "selectedCategory");
    const [selectedOption, setSelectedOption] = useState(activeCategory);

     useEffect(() => {
        setSelectedOption(activeCategory);
    }, [activeCategory]);

    const handleItemClick = (category: string) => {
        setSelectedOption(category); 
        handleCategoryClick(category);
        
        const categorySlug = category.toLowerCase().replace(" ", "-");
        category === "ALL" 
            ? router.push("/blog") 
            : onSearch(categorySlug); 
    };

    return (
        <DropDown
            label="Blog" 
            items={categories}
            onItemClick={handleItemClick}
        />
    );
};