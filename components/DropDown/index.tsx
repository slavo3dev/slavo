import { FC, useState, useEffect, useRef } from 'react';

interface DropDownProps {
    label: string;
    items: string[];
    onItemClick: (item: string) => void;
}

export const DropDown: FC<DropDownProps> = ({ label, items, onItemClick }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

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
        onItemClick(item); 
    };

    return (
        <div ref={dropdownRef} style={{ position: 'relative', display: 'inline-block' }}>
            <button
                onClick={() => setIsOpen((prev) => !prev)} 
                aria-haspopup="true"
                aria-expanded={isOpen}
            >
                {label}
            </button>
            {isOpen && (
              <ul className="absolute left-0 mt-2 bg-white shadow-xl w-48 z-50 flex flex-col rounded-lg border border-gray-300">
                    {items.map((item, index) => (
                        <li
                            key={index}
                            style={{
                                display: 'block',  // Ensure the list items stack in a column
                                padding: '8px 16px',
                                cursor: 'pointer',
                                borderBottom: '1px solid #ddd',
                                backgroundColor: '#fff',
                            }}
                            onClick={() => {
                                handleClick(item); // Trigger the handleClick function
                                setIsOpen(false);
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
