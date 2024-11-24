import { FC, useState } from "react";
import Link from "next/link";

interface DropDownItems { 
    label: string; 
    slug: string; 
}

interface DropDownProps { 
    label: string; 
    items: DropDownItems[]; 

}

export const DropDown: FC <DropDownProps> = ({ label, items = [] }) => {
    console.log(items);  // Check if items are passed correctly
    
    const [isOpen, setIsOpen] = useState<boolean>(true);
    
    return (
        <>
            <button onClick = {() => setIsOpen(!isOpen)}>
                {label}
            </button>
            {isOpen && (
                <ul>
                 {items.map((item) => (
                    <li key={item.slug} className="">
                        <Link href={item.slug}>
                            <a onClick={() => setIsOpen(false)}>{item.label}</a>
                        </Link>
                    </li>
                 ))}
                </ul>
            )}
        </>
    )
}