import { FC, useState } from "react";
import { FeaturedPostCard } from "./FeaturedPostCard";
import { PostsList } from "Types/PostsList";
import {FeaturedTitle} from "./FeaturedTitile";
import { LinkEvents } from "@components";
import { BlogMenuCat } from "../BlogMenuCat";
import { getCategories } from "lib/helpers";

export const FeaturedPosts: FC<PostsList> = ({ posts }) =>
{

	const [ category, setCategory ] = useState( "ALL" );
    
	const filtredPost = category.toLocaleLowerCase() === "all" ? posts : posts.filter(post => post.category.toLocaleLowerCase() === category.toLocaleLowerCase());

	return (
		<section className="py-12 bg-white sm:py-16 lg:py-20 text-center">
			<div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl text-center">
				<FeaturedTitle /> 
				<BlogMenuCat categories={ getCategories(posts) } onSearch={(cat?: string) => { cat && setCategory(cat);}} selectedCategory="" setActiveCategory={() =>{}} />
				<div className="grid grid-cols-1 gap-12 mt-12 xl:gap-20 sm:grid-cols-2 lg:grid-cols-3 sm:mt-16">
					{ filtredPost.map( post => <FeaturedPostCard key={post.slug} post={post} />)}
				</div>
			</div>
			<LinkEvents link={ "/blog" } description={"See All Articles"} />
		</section>
	);
};