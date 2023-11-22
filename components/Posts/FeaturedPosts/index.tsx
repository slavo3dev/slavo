import { FC } from "react";
import classes from "./FeaturedPosts.module.css";
import { PostsGrid } from "../PostsGrid";
import { PostsList } from "Types/PostsList";
import { Title } from "../../Title";
import {  ButtonEvents } from "@/components/Buttons/ButtonEvents";

export const FeaturedPosts: FC<PostsList> = ({ posts }) =>
{
	return (
		<div className={classes.latest}>
			<Title title={"Featured Posts"} /> 
			<PostsGrid posts={ posts } /> 
			<ButtonEvents link={"/blog"}>See All Articles</ButtonEvents>
		</div>
	);
};