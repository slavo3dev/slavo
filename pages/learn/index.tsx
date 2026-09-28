import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HeadBasePage } from "@components";
import { aiFromZero } from "lib/learning/day-one";
import { learningPersistence } from "lib/learning/engine";
import styles from "styles/Learning.module.css";

export default function LearningPathsPage() {
  return (
    <>
      <HeadBasePage title="Learning Paths | Slavo.io" description="Explore AI From Zero, a practical beginner learning preview on Slavo.io." canonicalPath="/learn" />
      <main className={styles.page}>
        <p className="text-sm font-semibold text-[#1d4f91]">Learn. Practice. Build. Grow.</p>
        <h1>Learning paths</h1>
        <p>Small lessons, focused practice, and a clear next step.</p>
        <p className={styles.notice}>{learningPersistence.reason}</p>
        <section aria-labelledby="ai-zero-heading">
          <p className="text-sm font-semibold text-[#1d4f91]">Day 1 preview available</p>
          <h2 id="ai-zero-heading" className="mt-3">{aiFromZero.title}</h2>
          <p>{aiFromZero.description}</p>
          <h3 className="mt-6">What you will practice</h3>
          {aiFromZero.outcomes.map((outcome) => <p className="mt-2" key={outcome.id}>{outcome.description} {outcome.successCriterion}</p>)}
          <div className={styles.actions}>
            <Link className={styles.action} href="/learn/ai-from-zero/day-1">Preview Day 1<ArrowRight size={16} aria-hidden="true" /></Link>
          </div>
        </section>
        <section aria-labelledby="planned-paths-heading">
          <h2 id="planned-paths-heading">Upcoming paths</h2>
          <div className={styles.grid}>
            {["Coding & Technology", "AI Automation & Agents", "Build & Launch"].map((title) => <div key={title}><h3>{title}</h3><p>Planned. Curriculum is not yet available.</p></div>)}
          </div>
        </section>
      </main>
    </>
  );
}