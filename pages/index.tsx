/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextPage } from "next";
import { Hero, FeaturedPosts, Subscribe } from "@components";
import { getFeaturedPosts } from "@lib/posts-lib";

const Home: NextPage = ( { posts }: any ) =>
{
	return (
		<>
			<Hero />
			<FeaturedPosts posts={ posts } />
			<section className="py-20 bg-blue-400">
				<Subscribe />
			</section>
		</>
	);
};

export function getStaticProps() {
	const featuredPost = getFeaturedPosts(); 

	return {
		props: {
			posts: featuredPost
		},
		revalidate: 60
	};
}

export default Home;
