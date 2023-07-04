import { FC } from "react";
import Image from "next/image";
import classes from "./postheader.module.css";
import { PostHeaderType } from "Types/PostType";
import { HeadBasePage } from "@/components/HeadBasePage";

export const PostHeader: FC<PostHeaderType> = ({ title, imgSrc}) =>
{
	return (
		<>
			<HeadBasePage title={title} />
			<header className={classes.postheader}>
				<h1>{title}</h1> 
				<Image src={ imgSrc } alt={title} width={ 200 } height={150}  />
			</header>
		</>
	);
};