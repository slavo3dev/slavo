import { useState, useEffect } from 'react';

export const useCategory = (categories: string[], initialCategory?: string) => {
    const [activeCategory, setActiveCategory] = useState(initialCategory || categories[0]);

    useEffect(() => {
        const storedCategory = localStorage.getItem('selectedCategory');
        if (storedCategory) {
            setActiveCategory(storedCategory);
        }
    }, []);

    const handleCategoryClick = (category: string) => {
        setActiveCategory(category);
        localStorage.setItem('selectedOption', category);
        localStorage.setItem('selectedCategory', category);
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

