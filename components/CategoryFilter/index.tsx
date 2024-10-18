import { FC, useState, useEffect } from "react";
import { CATEGORIES } from "@/lib/constants";
import { useLocalStorage } from "@/lib/hooks/useLocalStorage";


export const CategoryFilter: FC<any> = ({ setCurrentCategory }) => {

	const [selectedResCat, setSelectedResCat] = useState<string>("");
	
	useLocalStorage({ value: selectedResCat, setValue: setSelectedResCat, key: "selectedResCat" });
	

	useEffect(() => {

        if (selectedResCat) {
            setCurrentCategory(selectedResCat); // Search based on the initially stored active category
        }
    }, [selectedResCat, setCurrentCategory]);

	const handleResClick = (resCat: string) => {
        setSelectedResCat(resCat); 
        setCurrentCategory(resCat); 
    };

	return (
	    <aside className="flex flex-wrap gap-5 mt-8 justify-center">
        {CATEGORIES.map((cat: any, index: number) => {
			const isActive = selectedResCat
				? selectedResCat.toLocaleLowerCase() === cat.name.toLocaleLowerCase()
				: index === 0; 
			return (
            <span
                key={cat.name}
                onClick={() => handleResClick(cat.name)}
                className={`text-xs font-semibold text-indigo-600 border border-indigo-300 rounded-full inline-flex items-center px-2.5 py-1 hover:text-red-600 cursor-pointer 
                    ${isActive ? "bg-blue-500 text-white" : "bg-indigo-50"}`}
            >
                {cat.name === "all" ? "ALL" : cat.name}
            </span>
			);
		})}
    </aside>
)
}