import { FC } from 'react'
import { useRouter } from 'next/router'
import { DropDownMenu } from '@/components/DropDown'
import { useCategoryHook } from '@/lib/hooks/useCategoryHook'
import { CatProps } from "../BlogMenuCat"

export const BlogDropDown: FC<CatProps> = ({ categories, onSearch }) => {
    const { activeCategory, handleCategoryClick } = useCategoryHook(categories, "selectedCategory");

    const router = useRouter(); 

    const handleItemClick = (category: string) => {
        handleCategoryClick(category);
        
        const categorySlug = category.toLowerCase().replace(" ", "-");
        category === "ALL" 
            ? router.push("/blog") 
            : onSearch(categorySlug); 
    };

    return (
        <DropDownMenu
            label="Blog" 
            items={categories}
            onSelect={handleItemClick}
        />
    );
};