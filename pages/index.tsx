/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextPage } from "next";
import Head from "next/head";
import {
  FeaturedPosts,
  Solution,
  Hero,
  PorchShowcase,
  HeadBasePage,
} from "@components";
import { getFeaturedPosts } from "lib/posts-lib";
import styles from "styles/Homepage.module.css";
import {
  LearningPaths,
  DeliberatePractice,
  DailySession,
  BuildAndShare,
  FounderIntroduction,
  FinalLearningCallToAction,
} from "components/Marketing/LearningExperience";

const Home: NextPage = ({ posts }: any) => {
  return (
    <>
      <HeadBasePage
        title="Never Stop Learning | Slavo.io"
        description="Learn something new, practice with purpose, and build something real. Slavo.io is a learning and builder community for AI and technology."
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
                "A learning and builder community for AI, technology, deliberate practice, and real-world projects.",
            }),
          }}
        />
      </Head>
      <main className={styles.homePage}>
        <Hero />
        <Solution />
        <LearningPaths />
        <DeliberatePractice />
        <DailySession />
        <BuildAndShare />
        <div id="community" className="bg-[#f5f9fe]">
          <PorchShowcase limit={6} />
        </div>
        <FeaturedPosts posts={posts} />
        <FounderIntroduction />
        <FinalLearningCallToAction />
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
