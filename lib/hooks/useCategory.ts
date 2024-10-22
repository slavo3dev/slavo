import { useState, useEffect } from 'react';

export const useCategory = (categories: string[], selectedCategoryKey: string, initialCategory?: string) => {
    const [activeCategory, setActiveCategory] = useState(initialCategory || categories[0]);

    useEffect(() => {
        if (!localStorage.getItem(selectedCategoryKey)) {
            localStorage.setItem(selectedCategoryKey, initialCategory || categories[0])
        }
        const storedCategory = localStorage.getItem(selectedCategoryKey);
        if (storedCategory) {
            setActiveCategory(storedCategory);
        }
    }, [selectedCategoryKey, categories, initialCategory]);

    const handleCategoryClick = (category: string) => {
        setActiveCategory(category);
        localStorage.setItem(selectedCategoryKey, category);
    };

    const isActive = (category: string) => {
        return activeCategory.toLocaleLowerCase() === category.toLocaleLowerCase();
    };

    return {
        activeCategory,
        handleCategoryClick,
        isActive,
    };
};



