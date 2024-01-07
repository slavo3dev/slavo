import { FC } from "react";
import { PostCard } from "../PostCard";
import { PostsList } from "Types/PostsList";
import { Post } from "@/Types/PostType";

export const PostsGrid: FC<PostsList> = ({ posts }) => {   
	return (
		<div className="grid grid-cols-1 gap-6 px-8 mt-12 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:px-0">
			{ posts.map( ( post: Post) => <PostCard key={post.slug} post={post} />)}
		</div>
	);
};