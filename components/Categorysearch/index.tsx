import { useEffect, useState } from "react";
import { FC } from "react";
import classes from "./category-search.module.css";
import { useRouter } from "next/router";
import { useCategoryHook } from "@/lib/hooks/useCategoryHook";

interface Props {
  onSearch: (param?: any) => void;
  posts: any;
}

export const CategorySearch: FC<Props> = ( { onSearch, posts }: Props ) =>
{
	const router = useRouter();
    
	const categories: [string] = posts.map( ( post: any ) => post.category ).sort().filter( ( item: string, index: number, arr: [] ) => { return !index || item != arr[ index - 1 ]; } );
	categories.unshift("ALL");

	const { activeCategory, handleCategoryClick } = useCategoryHook(categories, "selectedCategory");
	const [selectedOption, setSelectedOption] = useState(activeCategory); 

	useEffect(() => { 
		setSelectedOption(activeCategory);
	  }, [activeCategory]);

	function submitHandler(event: any) {
		const category = event.target.value; 
		setSelectedOption(category);
		handleCategoryClick(category);
		
		const categorySlug = category.toLowerCase().replace(" ", "-"); 
		
		category === "ALL" ? router.push( "/blog" ) : onSearch(categorySlug);	
	}
    
	return (
		<form className={classes.form}>
			<div className={classes.controls}>
				<div className={classes.control}>
					<label htmlFor="category">Choose Category</label>
					<select id="category"  className={classes.selectElement} value={selectedOption} onChange={submitHandler}>
						{ categories.map( (category: string )=> <option key={category} value= {category}>{category}</option>)}
					</select>
				</div>
			</div>
		</form>
	
	
	);
};
