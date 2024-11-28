import { FC, useState, useEffect, useRef } from 'react';

interface DropDownProps {
    label: string;
    items: string[];
    onItemClick: (item: string) => void;
}

export const DropDown: FC<DropDownProps> = ({ label, items, onItemClick }) => {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

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
                    {items.map((item) => (
                        <li
                            key={item}
                            style={{
                                padding: '8px 16px',
                                cursor: 'pointer',
                                borderBottom: '1px solid #ddd',
                            }}
                            onClick={() => {
                                onItemClick(item); // Trigger the click handler
                                setIsOpen(false); // Close dropdown
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
