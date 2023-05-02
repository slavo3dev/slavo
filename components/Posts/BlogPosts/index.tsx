import { FC } from "react";
import classes from "./blogposts.module.css";
import { PostsGrid } from "../PostsGrid";
import { PostsList } from "Types/PostsList";
import { Loader } from "@/components/ui/Loader";

export const BlogPosts: FC<PostsList> = ({ posts }) =>
{
	return (
		<section className={ classes.allposts }>
			{ posts ? <PostsGrid posts={posts} /> : <Loader title="We are Loading Posts" />}
		</section>
	);
};