/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Post } from "@/Types/PostType";

const postsPath = path.join( process.cwd(), "posts" );

export function getPostsFiles() {
	return fs.readdirSync( postsPath );
}

export const getPostData = ( indentifier: string ): Post => 
{ 
	const postSlug = indentifier.replace(/\.md$/, "");
	const filePath = path.join( postsPath, `${postSlug}.md` );
	const fileContent = fs.readFileSync( filePath, "utf-8" );
	const { data, content } = matter( fileContent );

	const postData = {
		title: data.title, 
		date: data.date, 
		excerpt: data.excerpt,
		slug: postSlug,
		category: data.category
	}

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

export const getCategories = (posts: Post[]): string[] => {
	const categories = posts
		.map(post => post.category) // Extract categories from posts
		.filter(category => category)
		.sort() // Sort the categories alphabetically
		.filter((item, index, arr) => arr.indexOf(item) === index); // Filter out duplicates

	categories.unshift("ALL"); // Prepend "ALL" to the array

	return categories;
};