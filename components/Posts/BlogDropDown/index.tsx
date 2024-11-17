import { FC, useEffect } from 'react';
import { useCategoryHook } from '@/lib/hooks/useCategoryHook';
import { DropDownMenu } from '@/components/DropDownMenu';
import { BlogDropDownProps } from '@/lib/types';

export const BlogDropDown: FC<BlogDropDownProps> = ({ categories, onSearch }) => {
    
    const {activeCategory, handleCategoryClick, isActive} = useCategoryHook(categories, "selectedCategory"); 
    
    useEffect(() => {
        if (activeCategory) {
            onSearch(activeCategory); 
        }
    }, [activeCategory, onSearch]); 

    const dropDownCategories = categories.map((category) => ({
        itemLabel: category,
        onClick: () => handleCategoryClick(category)
    }));
    return (
        <>
            <DropDownMenu label="Blog" items={dropDownCategories} />
        </>
    )
}


