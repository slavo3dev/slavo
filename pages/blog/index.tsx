/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextPage } from "next";
import { useState } from "react";
import { BlogPosts } from "@/components/index";
import { getAllPosts } from "@/lib/posts-lib";
import { Subscribe } from "@/components/index";


const blog: NextPage = ( { posts }: any ) => {

	const [isBlurred, setIsBlurred] = useState<boolean>(false);

	return (
		<>
			<Subscribe setBlur={setIsBlurred}/>
			<div className={`transition-all ${isBlurred ? 'blurred' : ''}`}>	
				<BlogPosts posts={posts} />
			</div>
		</>
	);
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