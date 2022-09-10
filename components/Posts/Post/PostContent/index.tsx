import { FC } from 'react'
import classes from "./postcontent.module.css"
import { PostType } from "Types/PostType";
import { PostHeader } from "../PostHeader";

export const PostContent: FC<PostType> = ({ post }) =>
{
  return (
      <article>
          <PostHeader title={ "Title" } imgSrc={"images/testimages/getting-started-nextjs.png"} />
          Content
      </article>
  )
}