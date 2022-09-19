import { FC } from "react";
import classes from "./blogposts.module.css";
import { PostsGrid } from "../PostsGrid";
import { PostsList } from "Types/PostsList";

export const BlogPosts: FC<PostsList> = ({ posts }) =>
{
	return (
		<section className={ classes.allposts }>
			<h1>Articles</h1>
			<PostsGrid posts={posts} />
		</section>
	);
};