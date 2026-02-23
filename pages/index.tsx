/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextPage } from "next";
import Head from "next/head";
import {
  FeaturedPosts,
  Growth,
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

const Home: NextPage = ({ posts }: any) => {
  return (
    <>
      <HeadBasePage
        title="Web Development Mentorship &  Habit System | Slavo"
        description="Learn web development with a structured roadmap, daily accountability, and mentorship. Build coding habits, ship projects, and transition into tech."
        canonicalPath="/"
      />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Slavo",
              url: "https://www.slavo.io",
              description:
                "Web development mentorship and coding habit system with accountability and curated resources.",
            }),
          }}
        />
      </Head>
      <Hero />
      <SeoTextBlock />
      <WhoItsFor />
      <ProgramsOverview />
      <PorchShowcase limit={9} className="bg-white" />
      <FreeResourcesTeaser />
      <FeaturedPosts posts={posts} />
      {/* <LearningSources /> */}
      <Solution />
      <Growth />
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
