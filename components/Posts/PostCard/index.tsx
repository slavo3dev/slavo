import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import classes from "./postcard.module.css";
import { PostType } from "../../../Types/PostType";


export const PostCard: FC<PostType> = ( { post } ) =>
{

	const { title, image, date, excerpt, slug } = post;
    
	const formattedDate = new Date( date ).toLocaleDateString( "en-US", {
		day: "numeric",
		month: "long",
		year: "numeric"
	} );

	return (

		<li className={classes.post}>
			<Link href={`/blog/${slug}`}>
				<a>
					<div className={classes.image}>
						<Image src={`/images/post-img/${image}` } width={ 500 } height={ 300 } alt={title} layout="responsive"/>
					</div>
					<div className={classes.content}>
						<h3>{title}</h3>
						<time>{formattedDate}</time>
						<p>{excerpt}</p>
					</div>
				</a>
			</Link>  
		</li>

	);
};