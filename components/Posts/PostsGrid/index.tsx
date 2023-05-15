import { FC } from "react";
import classes from "./postsgrid.module.css";
import { PostCard } from "../PostCard";
import { PostsList } from "Types/PostsList";

interface Post  {
    title: string;
    date: string;
    excerpt: string;
    image: string;
    slug: string;
}

export const PostsGrid: FC<PostsList> = ({ posts }) =>
{   
	return (
		<ul className={classes.grid}>
			{ posts.map( ( post: Post) => <PostCard key={post.slug} post={post} />)}
		</ul>
	);
};