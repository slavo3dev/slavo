"use client";

import { FC } from "react";
import Link from "next/link";
import { ArrowUpRight, BookOpen, Code2, Route } from "lucide-react";
import styles from "styles/Homepage.module.css";

export const Hero: FC = () => {
  return (
    <section id="hero" aria-labelledby="hero-heading" className={styles.hero}>
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-10 sm:py-16 lg:grid-cols-2 lg:px-8 lg:py-12">
        <div className="max-w-2xl">
          <p className="mb-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#1d4f91]">
            <span className="h-2 w-2 rounded-full bg-[#3b78b8]" />
            Learn. Practice. Build. Grow.
          </p>
          <h1
            id="hero-heading"
            className={`${styles.heroTitle} max-w-xl text-5xl leading-[1.04] text-[#102a43] sm:text-6xl lg:text-7xl`}
          >
            Never Stop Learning.
          </h1>
          <h2 className="mt-5 max-w-2xl text-2xl leading-tight text-[#1d4f91] sm:text-3xl">
            Learn something new. Practice with purpose. Build something real.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-[#526a83] sm:text-lg">
            Slavo.io is a learning and builder community for people who want to
            master AI, technology, and practical skills, one focused step at a time.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/free-resources"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-[#1d4f91] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#102a43] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b78b8] focus-visible:ring-offset-2"
            >
              Start Learning Free
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="#learning-paths"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-[#d5e3f2] bg-white px-5 py-3 text-sm font-semibold text-[#102a43] transition hover:border-[#3b78b8] hover:bg-[#f5f9fe] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b78b8] focus-visible:ring-offset-2"
            >
              Explore Learning Paths
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className={`${styles.heroSupport} mt-9 flex-wrap gap-x-6 gap-y-3 border-t border-[#d5e3f2] pt-5 text-sm text-[#526a83]`}>
            <span className="inline-flex items-center gap-2">
              <Route className="h-4 w-4 text-[#1d4f91]" aria-hidden="true" />
              Small, focused lessons
            </span>
            <span className="inline-flex items-center gap-2">
              <Code2 className="h-4 w-4 text-[#1d4f91]" aria-hidden="true" />
              Practice that builds skill
            </span>
            <Link href="#community" className="inline-flex items-center gap-2 hover:text-[#1d4f91]">
              <BookOpen className="h-4 w-4 text-[#1d4f91]" aria-hidden="true" />
              Learn alongside others
            </Link>
          </div>
        </div>

        <div className={`${styles.heroVisual} relative mx-auto w-full`} aria-label="Example focused learning session">
          <div className={styles.sessionBoard}>
            <div className={styles.sessionHeader}>
              <span>One focused session</span>
              <span>30 min</span>
            </div>
            <div className={styles.sessionBody}>
              <p className="mb-5 text-sm font-semibold text-[#102a43]">Learn one idea. Put it to work.</p>
              <div className={styles.sessionStep}>
                <span className={styles.sessionStepIndex}>01</span><span>Learn a concept</span><span className={styles.sessionTime}>05 min</span>
              </div>
              <div className={styles.sessionStep}>
                <span className={styles.sessionStepIndex}>02</span><span>Practice with a clear goal</span><span className={styles.sessionTime}>10 min</span>
              </div>
              <div className={styles.sessionStep}>
                <span className={styles.sessionStepIndex}>03</span><span>Apply it in a small build</span><span className={styles.sessionTime}>10 min</span>
              </div>
              <div className={styles.sessionStep}>
                <span className={styles.sessionStepIndex}>04</span><span>Recall and reflect</span><span className={styles.sessionTime}>05 min</span>
              </div>
              <div className="mt-5" aria-label="Illustrative session progress">
                <div className={styles.practiceLine}><span /></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
