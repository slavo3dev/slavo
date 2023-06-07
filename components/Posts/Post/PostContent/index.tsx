/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import classes from "./postcontent.module.css";
// import { PostType } from "Types/PostType";
import remarkGfm from "remark-gfm";
import { PostHeader } from "../PostHeader";
import ReactMarkdown from "react-markdown";
import { HeadBasePage } from "@/components/HeadBasePage";
import { customRenderers } from "@/lib/formatText";

interface PostContentDataType
{
    post: any
}

export const PostContent: FC<PostContentDataType> = ({ post }) =>
{
	const imgPath = `/images/post-img/${ post.image }`;
    
	return (
		<>
			<HeadBasePage
				title={`Blog Title: ${post.title} | Career Change: Learn Web Development for a Bright Future`}  />
			<article className={classes.content}>
				<PostHeader title={ post.title } imgSrc={ imgPath } />
				<article className="prose lg:prose-xl">
					<ReactMarkdown remarkPlugins={ [ remarkGfm ] } components={ customRenderers } linkTarget='_blank'>{post.content}</ReactMarkdown>
				</article>
			</article>
		</>
	);
};