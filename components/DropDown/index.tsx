import { FC, useState, useEffect, useRef } from 'react';

interface DropDownProps {
    label: string;
    items: string[];
    onItemClick: (item: string) => void;
}

export const DropDown: FC<DropDownProps> = ({ label, items, onItemClick }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Log the dropdown visibility
    console.log("Dropdown is open:", isOpen);

    // Log the items passed to the dropdown
    console.log("Items in dropdown:", items);  // Check if items are passed properly

    // Close the dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleClick = (item: string) => {
        console.log("Item clicked:", item);  // Log item when clicked
        onItemClick(item);  // Call the onItemClick handler passed from parent
    };

    return (
        <div ref={dropdownRef} style={{ position: 'relative', display: 'inline-block' }}>
            <button
                onClick={() => setIsOpen((prev) => !prev)} // Toggle dropdown visibility
                aria-haspopup="true"
                aria-expanded={isOpen}
            >
                {label}
            </button>
            {isOpen && (
                <ul
                    style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        background: 'white',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        listStyle: 'none',
                        padding: 0,
                        margin: 0,
                        zIndex: 10,
                    }}
                >
                    {items.map((item, index) => (
                        <li
                            key={index}
                            style={{
                                padding: '8px 16px',
                                cursor: 'pointer',
                                borderBottom: '1px solid #ddd',
                            }}
                            onClick={(e) => {
                                console.log("Item clicked event triggered"); // Log when the click event is triggered
                                handleClick(item); // Trigger the handleClick function
                            }}
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
