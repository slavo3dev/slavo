import { FC } from "react";
import { TitleProps } from "@/lib/types";

export const Title: FC<TitleProps> = ( { title } ) =>
{
    
	return (
		<div className="max-w-5xl mx-auto">
			<div className="max-w-md mx-auto lg:flex lg:items-center lg:justify-between lg:max-w-none">
				<h1 className="max-w-xs text-3xl font-bold text-gray-900 sm:text-4xl" >
					{ title }
				</h1>
			</div>
		</div>
	);
};