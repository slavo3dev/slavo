import { FC } from 'react'
import classes from "./postcontent.module.css"
// import { PostType } from "Types/PostType";
import { PostHeader } from "../PostHeader";
import ReactMarkdown from 'react-markdown'

interface PostContentDataType
{
    postContentData: any
}

export const PostContent: FC<PostContentDataType> = ({ postContentData }) =>
{

    const DUMMY_DATA =  {
        title: "Slavo Blog",
        image: "nextjs-file.png",
        date: "09-09-2022",
        content: "# This is a blog content",
        slug: "/test-blog"
    }
    
    const imgPath = `/images/post/${DUMMY_DATA.image}`
  return (
      <article className={classes.content}>
          <PostHeader title={DUMMY_DATA.title} imgSrc={imgPath} />
          <ReactMarkdown>{DUMMY_DATA.content}</ReactMarkdown>
      </article>
  )
}