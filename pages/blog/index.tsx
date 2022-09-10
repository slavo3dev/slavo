import type { NextPage } from 'next'
import { BlogPosts } from "@/components/index";

const blog: NextPage = () =>
{
    return <BlogPosts posts={[1,2,3,4,5,6]} />
};

export default blog;