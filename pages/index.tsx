/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextPage } from "next";
import { 
  FeaturedPosts, 
  Growth, 
  Solution, 
  Hero, 
  PorchShowcase, 
  WhoItsFor, 
  ProgramsOverview,
  FreeResourcesTeaser
} from "@components";
import { getFeaturedPosts } from "lib/posts-lib";


const Home: NextPage = ({ posts }: any) => {

	return (
		<>
			<Hero />
			<WhoItsFor />
      <ProgramsOverview />
			<PorchShowcase limit={9} className="bg-white" />
			<FreeResourcesTeaser />
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