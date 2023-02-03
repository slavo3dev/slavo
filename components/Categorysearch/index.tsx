import React from "react";
import { useRef } from "react";
import { FC } from "react";
import classes from "./category-search.module.css";

interface Props {
    onSearch: ( param?: any ) => void,
    posts: any
}


export const CategorySearch: FC<Props> = ( { onSearch , posts}: Props ) => {
	const categoryInputRef = useRef<HTMLSelectElement | null>( null );
	
	const categories: [string] = posts.map(( post: any ) => post.category).sort().filter((item: string, index:number, arr:[]) => {
		return !index || item != arr[index - 1];
	});

	function submitHandler(event: any) {
		event.preventDefault();
	
		const selectedCategory = categoryInputRef.current?.value;
		const categorySlug = selectedCategory?.toLowerCase().replace( " ", "-" );

		onSearch(categorySlug);
	}

	return (
		<form className={classes.form} onSubmit={submitHandler}>
			<div className={classes.controls}>
				<div className={classes.control}>
					<label htmlFor="category">Category</label>
					<select id="category" ref={ categoryInputRef }>
						{ categories.map( (category: string )=> <option key={category} value= {category} >{category}</option>)}
					</select>
				</div>
			</div>
			<button>Categories</button>
		</form>
	);
};