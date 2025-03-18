import { FC, useState, useRef, useEffect } from 'react';
import { DropDownMenuProps } from '@/Types/Navigation';

export const DropDownMenu: FC<DropDownMenuProps> = ({ label, items, onSelect, className }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleMenu = () => setIsOpen((prev) => !prev)

    const handleItemClick = (item: string) => {
      onSelect(item);
      setIsOpen(false); 
  }

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };
      
      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isOpen]);

    return (
        <div ref={dropdownRef} className="relative inline-block group"
        >
            <button
                onClick={toggleMenu} 
                aria-haspopup="true"
                aria-expanded={isOpen}
            >
                {label}
            </button>
            {isOpen && (
              <ul className="absolute left-0 mt-2 bg-white shadow-xl w-48 z-50 flex flex-col rounded-lg border border-gray-300">
                    {items.map((item) => (
                        <li
                            key={item}
                            className="block px-4 py-2 cursor-pointer border-b border-gray-200 hover:bg-gray-100 last:border-none"
                            onClick={() => {
                                handleItemClick(item); 
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
