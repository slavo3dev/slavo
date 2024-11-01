/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextPage } from "next";
import { FeaturedPosts, Subscribe, Growth, Solution, Hero } from "@components";
import { getFeaturedPosts } from "lib/posts-lib";

const Home: NextPage = ({ posts }: any) => {

	

	return (
		<>
			<Hero />
			<FeaturedPosts posts={ posts } />
			{/* <LearningSources /> */}
			<Solution />
			<Growth />		
		</>
)};

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
