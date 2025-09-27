"use client";

import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
 import { Users, Hammer, Globe } from "lucide-react";

export const Hero: FC = () => {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-white"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 bg-gradient-to-l from-blue-50 to-white lg:block"
      />

      <div className="relative mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-8">
        <div className="grid items-center gap-y-12 lg:grid-cols-12 lg:gap-x-8">
          {/* Copy */}
          <div className="lg:col-span-7">
            <div className="mx-auto max-w-2xl lg:mx-0">
              <h1
                id="hero-heading"
                className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl"
              >
                Build your dream career{" "}
                <span className="text-blue-600">from anywhere</span>
              </h1>

               <p className="mt-5 text-lg leading-7 text-gray-600">
                <strong className="text-blue-600">slavo.io</strong> is a Creative
                Mentorship Platform for marketers, founders, creators, digital
                nomads, and anyone <span className="font-medium">stuck in their career who wants to build freedom</span>.
                Learn faster, execute smarter, and grow with guidance, accountability, and curated resources.
              </p>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Together, we’ll shape your roadmap and unlock personal + business
                growth—without the office.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/programs"
                  className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                >
                  Start Mentorship
                </Link>

                <Link
                  href="#how-we-work"
                  className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition hover:border-gray-300 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                >
                  How it works
                </Link>

                <Link
                  href="/free-resources"
                  className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold text-gray-600 underline-offset-4 hover:underline"
                >
                  Free resources
                </Link>
				<Link
                  href="/porch"
                  className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold text-gray-700 underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                >
                  Track your progress
                </Link>
              </div>

              {/* Slim social proof row (optional) */}
              <div className="mt-6 flex flex-wrap items-center gap-2 text-sm">
				<span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-white to-gray-50 px-3 py-1 text-gray-800 border border-gray-200 shadow-sm transition hover:shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
					<Users className="h-4 w-4" aria-hidden="true" />
					1:1 & group mentorship
				</span>

				<span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-white to-gray-50 px-3 py-1 text-gray-800 border border-gray-200 shadow-sm transition hover:shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
					<Hammer className="h-4 w-4" aria-hidden="true" />
					Project-based learning
				</span>

				<span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-white to-gray-50 px-3 py-1 text-gray-800 border border-gray-200 shadow-sm transition hover:shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
					<Globe className="h-4 w-4" aria-hidden="true" />
					Remote-first playbooks
				</span>
			  </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="mx-auto max-w-md sm:max-w-lg lg:max-w-none">
              <div className="relative">
                <Image
                  className="mx-auto motion-safe:animate-[float_6s_ease-in-out_infinite] "
                  src="/images/components/team.svg"
                  alt="Mentorship session: reviewing goals and plans together"
                  width={640}
                  height={520}
                  priority
                />
        
                <div
                  aria-hidden="true"
                  className="absolute -inset-x-6 -bottom-8 h-20 rounded-full bg-blue-100/50 blur-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="key-features" className="sr-only" />
    </section>
  );
};
