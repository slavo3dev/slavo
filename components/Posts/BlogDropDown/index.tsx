import { FC, useEffect, useState } from "react";
import { useCategoryHook } from "@/lib/hooks/useCategoryHook";
import { CategoryTags } from "@/lib/helpers/categoryTags";

interface Props {
    categories: string[];
    onSearch: (param?: string) => void;
}

export const BlogDropDown: FC<Props> = ({ categories, onSearch }) => {
    const { activeCategory, handleCategoryClick, isActive } = useCategoryHook(categories, "selectedCategory");

    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to toggle dropdown visibility

    useEffect(() => {
        if (activeCategory) {
            onSearch(activeCategory);
        }
    }, [activeCategory, onSearch]);

    // Function to toggle the dropdown
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    // Function to close the dropdown when a category is selected
    const handleCategorySelect = (category: string) => {
        handleCategoryClick(category); // Trigger the category selection
        setIsDropdownOpen(false); // Close the dropdown
    };

    return (
        <div>
            {/* Dropdown Button */}
            <button onClick={toggleDropdown} className="dropdown-button">
                {activeCategory || "Select Category"}
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
                <div className="dropdown-menu">
                    <ul>
                        {categories.map((category) => (
                            <li
                                key={category}
                                onClick={() => handleCategorySelect(category)}
                                className={isActive(category) ? "active" : ""}
                            >
                                {category}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Optionally render CategoryTags as well, you can modify this as per your UI */}
            <CategoryTags
                categories={categories}
                handleCategoryClick={handleCategoryClick}
                isActive={isActive}
            />
        </div>
    );
};
