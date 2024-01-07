import Image from "next/image";
import { FC } from "react";

interface Props
{
    imgSrc: string;
    title: string;
}

export const PostImage: FC<Props> = ({imgSrc, title}) => {
    
	return (
		<div className="mt-8 sm:mt-12 lg:mt-16 aspect-w-16 aspect-h-9 lg:aspect-h-6 text-center">
			<Image className="w-full h-full" src={imgSrc} alt={title} width={ 600 } height={350} />
		</div>
	);
};