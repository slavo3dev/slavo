/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextPage } from "next";
import {Hero,FeaturedPosts,Subscribe,Growth,Solution,} from "@components";
import { getFeaturedPosts } from "@/lib/posts-lib";

const Home: NextPage = ({ posts }: any) => {
	return (
		<>
			<Solution />
			<Hero />
			<Subscribe />
			<FeaturedPosts posts={posts} />
			<Growth />
			<Subscribe />
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
