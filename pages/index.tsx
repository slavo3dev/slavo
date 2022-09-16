import type { NextPage } from 'next'
import { Hero, FeaturedPosts } from "../components";
import { getFeaturedPosts } from "@/lib/posts-lib";


const Home: NextPage = ( { posts }: any ) => {
    return (
      <>
        <Hero />
        <FeaturedPosts posts={posts} />
      </>
  )
}

export function getStaticProps() {
    const featuredPost = getFeaturedPosts() 

    return {
        props: {
            posts: featuredPost
        },
        revalidate: 60
    };
}

export default Home
