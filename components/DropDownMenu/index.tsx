import { FC, useState } from "react";
import { DropDownMenuProps } from "@/lib/types";

export const DropDownMenu: FC<DropDownMenuProps> = ({ label, items }) => {
   
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleDropDown = () => {
        setIsOpen(!isOpen); 
    };

    return (
        <div> 
            <button
                onClick = {toggleDropDown}
                className=""
            >
                {label}
            </button>
            {isOpen && (
                <ul>
                    {items.map((item) => (
                        <li key={item.itemLabel}>
                            <button
                                onClick={() => {
                                    item.onClick(); 
                                    setIsOpen(false); 
                                }}
                            >
                                {item.itemLabel}
                            </button>
                        </li>
                    ))}
                    </ul>
                )}
            </div>
        );
}