import { FC } from "react";
import Link from "next/link";

export const ProgramsOverview:FC = () => {
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