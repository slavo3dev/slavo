/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextPage } from "next";
import { BlogPosts, CategorySearch } from "../../components";
import { getAllPosts } from "../../lib/posts-lib";
import { useRouter } from "next/router";
import React from "react";


const Blog: NextPage = ( { posts }: any ) =>
{

	const router = useRouter();
    
	function findCategoryHandle ( category: string )
	{
		
		const fullPath = `/category/${category}`;
		router.push(fullPath);
	}
	return (
		<React.Fragment> 
			<CategorySearch onSearch={findCategoryHandle} posts={posts} />
			<BlogPosts posts={posts} />
		</React.Fragment> );
};


export function getStaticProps() {
	const featuredPost = getAllPosts(); 

	return {
		props: {
			posts: featuredPost
		},
		revalidate: 60
	};
}

export default Blog;