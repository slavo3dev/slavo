import type { NextPage } from "next";
import { BlogPosts, CategorySearch } from "@/components/index";
import { getAllPosts } from "lib/posts-lib";
import { useRouter } from "next/router";




const blog: NextPage = ( { posts }: any ) => {

  const router = useRouter();

	function findCategoryHandle ( category: string ) {
		const fullPath = category
			? `/category/${category}`
			: "/blog"; 
		router.push( fullPath );
	}

	return (
    <>
      <CategorySearch onSearch={ findCategoryHandle } posts={ posts } />
		  <BlogPosts posts={posts} />
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