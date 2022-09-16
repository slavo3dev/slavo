import { FC } from 'react'
import classes from "./postsgrid.module.css"
import { PostCard } from "../PostCard"
import { PostsList } from "Types/PostsList"

export const PostsGrid: FC<PostsList> = ({ posts }) =>
{ 
  return (
      <ul className={classes.grid}>
          { posts.map( ( post ) => <PostCard key={post.slug} post={post} />)}
    </ul>
  )
}