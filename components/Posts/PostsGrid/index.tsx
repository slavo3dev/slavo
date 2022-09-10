import { FC } from 'react'
import classes from "./postsgrid.module.css"
import { PostCard } from "../PostCard"
import { PostsList } from "Types/PostsList"

export const PostsGrid: FC<PostsList> = ({ posts }) =>
{
    const postProp = {
        title: "Slavo Blog",
        image: "/images/testimages/getting-started-nextjs.png",
        date: "09-09-2022",
        excerpt: "This is a blog",
        slug: "/test-blog"
  }
 
  return (
      <ul className={classes.grid}>
          { posts.map( ( post ) => <PostCard key={postProp.slug} post={postProp} />)}
    </ul>
  )
}