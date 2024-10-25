/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import type { NextPage } from "next";
import { FeaturedPosts, Subscribe, Growth, Solution, Hero } from "@components";
import { getFeaturedPosts } from "@/lib/posts-lib";

const Home: NextPage = ({ posts }: any) => {

	const [isBlurred, setIsBlurred] = useState<boolean>(false); 

	return (
		<>
			<Subscribe setBlur={setIsBlurred}/>
			<div className={`transition-all ${isBlurred ? 'blurred' : ''}`}>	
				<Hero />
				<FeaturedPosts posts={ posts } />
				{/* <LearningSources /> */}
				<Solution />
				<Growth />
			</div>
		</>
	);
};

export function getStaticProps() {
	const featuredPost = getFeaturedPosts();

	return {
		props: {
			posts: featuredPost,
		},
		revalidate: 60,
	};
}

export default Home;
