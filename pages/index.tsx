/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextPage } from "next";
import { FeaturedPosts, Subscribe, Growth, Solution, Hero, MainNavigation } from "@components";
import { getFeaturedPosts, getAllPosts } from "lib/posts-lib";
import { getCategories } from "@/lib/helpers";
import { Post } from "@/Types/PostType";

const Home: NextPage = ({ posts, categories }: any) => {
	console.log("Categories in Home:", categories);
	

	return (
		<>
			<Hero />
			<FeaturedPosts posts={ posts } />
			<MainNavigation categories={categories}/>
			{/* <LearningSources /> */}
			<Solution />
			<Growth />		
		</>
)};

export function getStaticProps() {
	const featuredPost = getFeaturedPosts();
	const allPosts = getAllPosts(); 
	const categories = getCategories(allPosts)
	console.log("Categories in getStaticProps:", categories)

	return {
		props: {
			posts: featuredPost,
			categories,
		},
		revalidate: 60,
	};
}

export default Home;
