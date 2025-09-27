/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextPage } from "next";
import Link from "next/link";
import { FeaturedPosts, Subscribe, Growth, Solution, Hero, PorchShowcase } from "@components";
import { getFeaturedPosts } from "lib/posts-lib";


// ——— NEW lightweight sections ———
function WhoItsFor() {
  return (
    <section aria-labelledby="who-heading" className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <h2 id="who-heading" className="text-2xl sm:text-3xl font-bold text-gray-900">
          Who it’s for
        </h2>
        <p className="mt-3 max-w-2xl text-gray-600">
          Marketers, founders, creators, digital nomads—and anyone feeling stuck who wants more freedom.
        </p>
        <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 text-sm text-gray-800">
          <li className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">Launch and grow offers</li>
          <li className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">Ship MVPs and go-to-market</li>
          <li className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">Build audience & products</li>
          <li className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">Design office-free careers</li>
          <li className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">Break career plateaus</li>
          <li className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">Stay consistent with Porch</li>
        </ul>
        <div className="mt-6">
          <Link href="#programs" className="text-blue-700 font-semibold hover:underline">See programs →</Link>
        </div>
      </div>
    </section>
  );
}

function ProgramsOverview() {
  return (
    <section id="programs" aria-labelledby="programs-heading" className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <h2 id="programs-heading" className="text-2xl sm:text-3xl font-bold text-gray-900">
          Programs
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "1:1 Mentorship", desc: "Weekly calls, async support, and a custom roadmap." },
            { title: "Small Group (5-person)", desc: "Cohort energy + personal guidance + shared milestones." },
            { title: "Sprint / Project (4–6 weeks)", desc: "Ship a specific outcome: MVP, landing page, portfolio, client funnel." },
          ].map((card) => (
            <article key={card.title} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900">{card.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{card.desc}</p>
              <div className="mt-4">
                <Link href="/programs" className="text-blue-700 font-medium hover:underline">View details →</Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FreeResourcesTeaser() {
  return (
    <section aria-labelledby="free-heading" className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <h2 id="free-heading" className="text-2xl sm:text-3xl font-bold text-gray-900">
          Get started for free
        </h2>
        <p className="mt-2 max-w-2xl text-gray-600">
          Browse playbooks, templates, and guides. Visitors can explore; members can save items to Porch.
        </p>
        <div className="mt-6">
          <Link href="/free-resources" className="inline-flex items-center rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">
            Explore free resources
          </Link>
        </div>
      </div>
    </section>
  );
}


const Home: NextPage = ({ posts }: any) => {

	

	return (
		<>
			<Hero />
			<WhoItsFor />
      		<ProgramsOverview />
			<PorchShowcase limit={9} className="bg-white" />
			<FreeResourcesTeaser />
			<FeaturedPosts posts={ posts } />
			{/* <LearningSources /> */}
			<Solution />
			<Growth />		
		</>
)};

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