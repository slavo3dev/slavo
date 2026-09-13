/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextPage } from "next";
import Head from "next/head";
import {
  FeaturedPosts,
  Solution,
  Hero,
  PorchShowcase,
  SeoTextBlock,
  WhoItsFor,
  ProgramsOverview,
  FreeResourcesTeaser,
  HeadBasePage,
} from "@components";
import { getFeaturedPosts } from "lib/posts-lib";
import styles from "styles/Homepage.module.css";

const Home: NextPage = ({ posts }: any) => {
  return (
    <>
      <HeadBasePage
        title="Learn Web Development by Building Real Projects | Slavo.io"
        description="A clearer way to learn web development: follow a practical path, build real projects, and get support from experienced mentors."
        canonicalPath="/"
      />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Slavo.io",
              url: "https://www.slavo.io",
              description:
                "A practical web-development learning community built around clear paths, real projects, and consistent practice.",
            }),
          }}
        />
      </Head>
      <main className={styles.homePage}>
        <Hero />
        <WhoItsFor />
        <Solution />
        <ProgramsOverview />
        <PorchShowcase limit={9} className="bg-[#f0f5ef]" />
        <FreeResourcesTeaser />
        <FeaturedPosts posts={posts} />
        <SeoTextBlock />
      </main>
    </>
  );
};

export function getStaticProps() {
  const featuredPost = getFeaturedPosts();

  return {
    props: {
      posts: featuredPost,
    },
    revalidate: 60,
  };
}

export default Home;
