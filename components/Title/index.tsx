import { FC } from "react";
import { TitleProps } from "@/lib/types";

export const Title: FC<TitleProps> = ( { title } ) =>
{
    
	return (
		<div className="w-full text-center p-6">
			<h1
				className="text-transparent bg-clip-text bg-gradient-to-r to-blue-600 from-blue-300 mb-4 text-3xl font-extrabold md:text-5xl lg:text-6xl">{ title }</h1>
		</div>
	);
};