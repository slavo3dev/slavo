import { FC, useEffect, useState } from "react";
import { DropDown } from "@/components/DropDown";

interface BlogDropDownProps {
    categories: string[];
    onSearch: (param?: string) => void;
}

export const BlogDropDown: FC<BlogDropDownProps> = ({ categories, onSearch }) => {
    const [activeCategory, setActiveCategory] = useState<string>("ALL");

    const handleCategorySelect = (category: string) => {
        setActiveCategory(category);
    };

    useEffect(() => {
        if (activeCategory) {
            onSearch(activeCategory);
        }
    }, [activeCategory, onSearch]);

    return (
        <DropDown
            label="Blog"
            items={categories}
            onSelect={handleCategorySelect}
        />
    );
};