import { FC, useState } from "react";
import { BlogTitle } from "./BlogTitle";
import { PostsGrid } from "./PostsGrid";
import { PostsList } from "Types/PostsList";
import { Loader } from "@/components/ui/Loader";
import { BlogMenuCat } from "../BlogMenuCat";
import { getCategories } from "@/lib/helpers";

export const BlogPosts: FC<PostsList> = ( { posts } ) =>
{
	const [ category, setCategory ] = useState( "ALL" );
    
	const filtredPost = category.toLocaleLowerCase() === "all" ? posts : posts.filter(post => post.category.toLocaleLowerCase() === category.toLocaleLowerCase());
        
	return (
		<section className="py-12 bg-gray-50 sm:py-16 lg:py-20">
			<div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
				<BlogTitle />
				<div className="max-w-5xl mx-auto">
					<div className="max-w-md mx-auto lg:flex lg:items-center lg:justify-between lg:max-w-none">
						<BlogMenuCat categories={ getCategories(posts) } onSearch={(cat?: string) => { cat && setCategory(cat);}} />
					</div>
				</div>
				{ posts ? <PostsGrid posts={ filtredPost } /> : <Loader title="We are Loading Posts" /> }
			</div>
		</section>
	);
};