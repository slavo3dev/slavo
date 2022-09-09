import type { NextPage } from 'next'
import { Hero, FeaturedPosts } from "../components";
import Head from 'next/head'
import Image from 'next/image'


const Home: NextPage = () => {
    return (
      <>
        <Hero />
        <FeaturedPosts />
      </>
  )
}

export default Home
