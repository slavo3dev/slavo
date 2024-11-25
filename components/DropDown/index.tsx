import { FC, useState } from "react"

interface DropDownProps {
    label: string;
    items: string[];
    onSelect: (category: string) => void;
}

export const DropDown: FC<DropDownProps> = ({ label, items, onSelect }) => {

    const [isOpen, setIsOpen] = useState<boolean>(false); 

    return (
        <div>
            <button onClick={() => setIsOpen(!isOpen)}>
                {label}
            </button>
            {isOpen && (
             <ul>
                {items.map((item, index) => (
                    <li key={index} onClick={() => onSelect(item)}>
                        {item}
                    </li>
                ))}
             </ul>   
            )}
        </div>
    )
}