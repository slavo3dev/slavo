/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextPage } from "next";
import { FeaturedPosts, Growth, Solution, Hero, BlurWrapper } from "@components";
import { getFeaturedPosts } from "@/lib/posts-lib";

const Home: NextPage = ({ posts }: any) => {

	

	return (
		<BlurWrapper>
			<Hero />
			<FeaturedPosts posts={ posts } />
			{/* <LearningSources /> */}
			<Solution />
			<Growth />		
		</BlurWrapper>
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
