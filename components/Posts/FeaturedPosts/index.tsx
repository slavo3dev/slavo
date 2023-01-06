import { FC } from "react";
import classes from "./FeaturedPosts.module.css";
import { PostsGrid } from "../PostsGrid";
import { PostsList } from "Types/PostsList";


export const FeaturedPosts: FC<PostsList> = ({ posts }) =>
{
	return (
		<div className={classes.latest}>
			<h2>Featured Posts </h2> 
			<PostsGrid posts={posts} /> 
		</div>
	);
};