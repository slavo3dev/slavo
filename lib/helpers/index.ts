

export const formattedDate = (data: any) => new Date( data ).toLocaleDateString( "en-US", {
	day: "numeric",
	month: "long",
	year: "numeric"
} );


type Post = {
  category: string;
  // ... other properties
};

export const getCategories = (posts: Post[]): string[] => {
	const categories = posts
		.map(post => post.category) // Extract categories from posts
		.sort() // Sort the categories alphabetically
		.filter((item, index, arr) => arr.indexOf(item) === index); // Filter out duplicates

	categories.unshift("ALL"); // Prepend "ALL" to the array

	return categories;
};
