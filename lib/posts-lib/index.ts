/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsPath = path.join( process.cwd(), "posts" );

type Post = {
	category: string;
	slug: string;
	content: string;
	// any other fields you have in the front matter (e.g., title, date, etc.)
  };

export function getPostsFiles() {
	return fs.readdirSync( postsPath );
}

export const getPostData = ( indentifier: string ) => 
{ 
	const postSlug = indentifier.replace(/\.md$/, "");
	const filePath = path.join( postsPath, `${postSlug}.md` );
	const fileContent = fs.readFileSync( filePath, "utf-8" );
	const { data, content } = matter( fileContent );

	const postData: Post = {
		slug: postSlug,
		content,
		category: data.category || "Uncategorized", // Provide a default value if category is missing
		// Add other fields from front matter if necessary
	  };
	
	  return postData;
	};

export const getAllPosts = () => 
{
	const postsFiles = getPostsFiles();
    
	const allPosts = postsFiles.map( postFile => getPostData( postFile ) );
    
	return allPosts.sort( ( postA: any, postB: any) => postA.date > postB.date ? -1 : 1);
};


export const getFeaturedPosts = () => 
{
	const allPosts: any[] = getAllPosts();

	return allPosts
		.filter( ( post: { isFeatured: boolean; } ) => post.isFeatured )
		.sort( function ( a: { date: string; }, b: { date: string; } )
		{
			const dateA: any = new Date(a.date.split("-").reverse().join("-"));
			const dateB: any = new Date(b.date.split("-").reverse().join("-"));
			return dateB - dateA;
		});
};
