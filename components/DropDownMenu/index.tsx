import { FC, useState } from "react";
import Link from "next/link";

interface DropdownMenuProps {
    label: string;
    items: { label: string; href: string }[];
}

export const DropdownMenu: FC<DropdownMenuProps> = ({ label, items }) => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const handleDropdownToggle = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent navigation
        setDropdownOpen(!isDropdownOpen);
    };

    return (
        <li className="relative">
            <a 
                href="#" 
                onClick={handleDropdownToggle}
                className="hover:text-blue-500 hover:bg-blue-50"
            >
                {label}
            </a>
            {isDropdownOpen && (
                <ul className="absolute left-0 mt-2 bg-white shadow-lg w-48 z-50 flex flex-col">
                    {items.map((item, index) => (
                        <li key={index} className="px-4 py-2 text-black font-bold hover:bg-gray-100">
                            <Link href={item.href}>{item.label}</Link>
                        </li>
                    ))}
                </ul>
            )}
        </li>
    );
};
