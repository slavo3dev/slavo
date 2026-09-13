"use client";

import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, BookOpen, Code2, Route } from "lucide-react";
import styles from "styles/Homepage.module.css";

export const Hero: FC = () => {
  return (
    <section id="hero" aria-labelledby="hero-heading" className="bg-[#fffdf7]">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-10 sm:py-16 lg:grid-cols-2 lg:px-8 lg:py-24">
        <div className="max-w-2xl">
          <p className="mb-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#13745e]">
            <span className="h-2 w-2 rounded-full bg-[#f06a4f]" />
            A practical path into tech
          </p>
          <h1
            id="hero-heading"
            className={`${styles.heroTitle} max-w-xl text-4xl leading-[1.04] text-[#18342c] sm:text-6xl lg:text-7xl`}
          >
            Learn to build. <span className="text-[#13745e]">Build what’s next.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-[#4c5d56]">
            Slavo.io helps you learn web development through a clear roadmap,
            real projects, and steady practice, with a mentor when you need one.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/free-resources"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-[#18342c] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#265648] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#13745e] focus-visible:ring-offset-2"
            >
              Explore free lessons
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/programs"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-[#cbd6cf] px-5 py-3 text-sm font-semibold text-[#18342c] transition hover:border-[#13745e] hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#13745e] focus-visible:ring-offset-2"
            >
              Find a mentor
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className={`${styles.heroSupport} mt-9 flex-wrap gap-x-6 gap-y-3 border-t border-[#dce3db] pt-5 text-sm text-[#4c5d56]`}>
            <span className="inline-flex items-center gap-2">
              <Route className="h-4 w-4 text-[#13745e]" aria-hidden="true" />
              A clear learning path
            </span>
            <span className="inline-flex items-center gap-2">
              <Code2 className="h-4 w-4 text-[#13745e]" aria-hidden="true" />
              Projects, not just tutorials
            </span>
            <Link href="/porch" className="inline-flex items-center gap-2 hover:text-[#13745e]">
              <BookOpen className="h-4 w-4 text-[#13745e]" aria-hidden="true" />
              See learners’ daily progress
            </Link>
          </div>
        </div>

        <div className={`${styles.heroVisual} relative mx-auto w-full max-w-xl lg:max-w-none`}>
          <div className="relative overflow-hidden rounded-md bg-[#e2f0e9] px-5 pt-5 sm:px-8 sm:pt-8">
            <div className="flex items-center justify-between border-b border-[#c7ddd1] pb-4 text-xs font-semibold uppercase tracking-[0.14em] text-[#315d4d]">
              <span>Learn by making</span>
              <span>01 / 03</span>
            </div>
            <Image
              className={`${styles.heroImage} mx-auto h-auto w-full max-w-[540px]`}
              src="/images/components/team.svg"
              alt="Learner and mentor planning a web development project together"
              width={640}
              height={520}
              priority
            />
            <div className="absolute bottom-5 left-5 flex items-center gap-3 rounded-md bg-[#f5d66d] px-4 py-3 text-sm font-semibold text-[#293b31] shadow-sm sm:bottom-8 sm:left-8">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-[#fff7d9]">
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </span>
              Practice. Get feedback. Repeat.
            </div>
          </div>
          <p className="mt-3 text-right text-xs text-[#64756e]">
            Make progress visible on <Link href="/porch" className="font-semibold text-[#13745e]">Porch</Link>
          </p>
        </div>
      </div>
    </section>
  );
};
