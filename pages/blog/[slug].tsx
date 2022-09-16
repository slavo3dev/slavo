import type { NextPage } from 'next'
import { PostContent } from "@/components/index";
import { getPostData, getPostsFiles } from "@/lib/posts-lib";

const Post: NextPage = ( { post }: any ) =>
{
    return <PostContent post={post} />
};

export function getStaticProps ( context: { params :{ slug: string} } )
{
    const { slug } = context.params

    const postData = getPostData(slug) 

    return {
        props: {
            post: postData
        },
        revalidate: 600
    };
}

export function getStaticPaths ()
{
    const postName = getPostsFiles()

    const slugs = postName.map(fileName => fileName.replace(/\.md$/, ''))
    return {
        paths: slugs.map( slug => ( { params: {slug: slug} } )),
        fallback: true
   }    
}

export default Post;