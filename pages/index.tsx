import type { NextPage } from 'next'
import { Hero, FeaturedPosts } from "../components";
import Head from 'next/head'
import Image from 'next/image'


const Home: NextPage = () => {
    return (
      <>
        <Hero />
            <FeaturedPosts posts={[1,2,3,4,5,6,7,8]} />
      </>
  )
}

export default Home
