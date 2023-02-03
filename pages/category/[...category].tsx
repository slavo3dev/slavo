import { BlogPosts, CategorySearch } from "@components/index";
import { useRouter } from "next/router";
import { getAllPosts } from "lib/posts-lib";



export async function getStaticProps ()
{
	const blogArticles = getAllPosts(); 

	return {
		props: {
			posts: blogArticles
		},
		revalidate: 60
	};
	
}

export const getStaticPaths = async () =>
{

	return {
		paths: [], //indicates that no page needs be created at build time
		fallback: "blocking" //indicates the type of fallback
	};
};

export default function Category ( props: any )
{

	const router = useRouter();
	let slugId = "Title Not Found";

	if ( router && router?.query.category )
	{
		slugId = router?.query?.category[ 0 ];
	}
    
	function findCategoryHandle ( category: string )
	{
		
		const fullPath = `/category/${category}`;

		router.push(fullPath);
	}

	const categoryPosts = props.posts.filter( ( blog: any ) => blog.category.toLowerCase().replace( " ", "-" ) === slugId && blog );
    
	
	return (
		<>
			<CategorySearch onSearch={findCategoryHandle} posts={props.posts} />
			<h1 style={ { textAlign: "center", padding: "10px" } }>Category: { slugId.toUpperCase().replace( "-", " " ) }</h1>
			<BlogPosts posts={ categoryPosts } />
		</>
	);
}