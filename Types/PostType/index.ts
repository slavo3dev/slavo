
export interface PostType
{
    post: Post
}

export interface Post {
    title: string;
    date: string;
    excerpt: string;
    image: string;
    slug: string;
    category?:string
}


export interface PostHeaderType
{
    title: string; 
    imgSrc: string;
    category: string;
    data: string;
    excerpt: string;
}