import { FC } from "react";
import { BlogTitle } from "./BlogTitle";
import { PostsGrid } from "./PostsGrid";
import { PostsList } from "Types/PostsList";
import { Loader } from "@/components/ui/Loader";
import { BlogMenuCat } from "../BlogMenuCat";

export const BlogPosts: FC<PostsList> = ({ posts }) => {
	const categories: string[] = posts
		.map(post => post.category) // Extract categories from posts
		.sort() // Sort the categories alphabetically
		.filter((item, index, arr) => arr.indexOf(item) === index); // Filter out duplicates

	categories.unshift( "ALL" );
    
	return (
		<section className="py-12 bg-gray-50 sm:py-16 lg:py-20">
			<div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
				<BlogTitle />
				<div className="max-w-5xl mx-auto">
					<div className="max-w-md mx-auto lg:flex lg:items-center lg:justify-between lg:max-w-none">
						<BlogMenuCat categories={categories} />
					</div>
				</div>
				{ posts ? <PostsGrid posts={ posts } /> : <Loader title="We are Loading Posts" /> }
			</div>
		</section>
	);
};