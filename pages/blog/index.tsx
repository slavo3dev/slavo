/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextPage } from "next";
import { BlogPosts } from "@/components/index";
import { getAllPosts } from "@/lib/posts-lib";

const blog: NextPage = ( { posts }: any ) =>
{
	return <BlogPosts posts={posts} />;
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

export default blog;