import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsPath = path.join(process.cwd(), 'posts')

const getPostData = ( fileName: string ) =>
{ 
    const filePath = path.join( postsPath, fileName );
    const fileContent = fs.readFileSync( filePath, 'utf-8' );
    const { data, content } = matter( fileContent )
    
    const postSlug = fileName.replace(/\.md$/, '')
    const postData = {
        slug: postSlug,
        ...data,
        content
    }

    return postData
}

export const getAllPosts = () =>
{
    const postsFiles = fs.readdirSync( postsPath );
    
    const allPosts = postsFiles.map( postFile => getPostData( postFile ) )
    
    return allPosts.sort( ( postA: any, postB: any) => postA.date > postB.date ? -1 : 1);
};


export const getFeaturedPosts = () =>
{
    const allPosts: any[] = getAllPosts()
    
    return allPosts.filter((post: {isFeatured: boolean}) => post.isFeatured)
}