import { FC } from "react";
import { CATEGORIES } from "@/lib/constants";


export const CategoryFilter: FC<any> = ({ setCurrentCategory }) => {
	return (
		<aside>
			<ul className="flex w-full">
				<button
					className="hover:bg-blue-100 bg-blue-500 text-white font-bold py-2 px-4 mt-3 rounded m-3"
					onClick={() => setCurrentCategory("all")}
				>
            All
				</button>
				{CATEGORIES.map((cat: any) => (
					<button
						key={cat.name}
						className="hover:bg-blue-100 bg-blue-500 text-white font-bold py-2 px-4 mt-3 rounded m-3"
						onClick={() => setCurrentCategory(cat.name)}
					>
						{cat.name}
					</button>
				))}
			</ul>
		</aside>
	);
};