import { FC } from "react";
import { FeaturedPostCard } from "./FeaturedPostCard";
import { PostsList } from "Types/PostsList";
import {FeaturedTitle} from "./FeaturedTitile";
import { LinkEvents } from "@components";
import { BlogMenuCat } from "../BlogMenuCat";

export const FeaturedPosts: FC<PostsList> = ({ posts }) =>
{

	// const filterPosts = posts.filter( post => post.category.toLowerCase() === "self help");
    
	const categories: string[] = posts
		.map(post => post.category) // Extract categories from posts
		.sort() // Sort the categories alphabetically
		.filter((item, index, arr) => arr.indexOf(item) === index); // Filter out duplicates

	categories.unshift("ALL");

	return (
		<section className="py-12 bg-white sm:py-16 lg:py-20 text-center">
			<div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl text-center">
				<FeaturedTitle /> 
				{/* <BlogMenuCat categories={ categories } />	 */}
				<div className="grid grid-cols-1 gap-12 mt-12 xl:gap-20 sm:grid-cols-2 lg:grid-cols-3 sm:mt-16">
					{ posts.map( post => <FeaturedPostCard key={post.slug} post={post} />)}
				</div>
			</div>
			<LinkEvents link={ "/blog" } description={"See All Articles"} />
		</section>
	);
};