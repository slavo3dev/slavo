import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLearningPreview } from "context/LearningPreviewContext";
import { aiFromZero, dayOne } from "lib/learning/day-one";
import { checkedPreviewFeedback, learningPersistence } from "lib/learning/engine";
import styles from "styles/Learning.module.css";

export function LearnerOverview() {
  const { state } = useLearningPreview();
  const feedback = checkedPreviewFeedback(state);
  const completedSteps = state.completedAt ? 3 : Number(state.read) + Number(Boolean(feedback?.passed));
  const nextAction = state.completedAt ? "Review Day 1" : !state.read ? "Read today's lesson" : !feedback?.passed ? "Practice choosing a safe action" : "Write your reflection";

  return (
    <section className={styles.panel} aria-labelledby="learner-overview-heading">
      <p className="text-sm font-semibold text-[#1d4f91]">Learning preview · not enrolled</p>
      <h2 id="learner-overview-heading" className="mt-3">Your next learning step</h2>
      <div className={styles.grid}>
        <div><h3 className="font-semibold">{aiFromZero.title}</h3><p>Day {dayOne.day}: {dayOne.title}</p></div>
        <div><h3 className="font-semibold">Practice task</h3><p>Choose a safe next action for three AI-assisted tasks.</p></div>
        <div><h3 className="font-semibold">Next action</h3><p>{nextAction}</p></div>
      </div>
      <p className="mt-5">Session preview progress: {completedSteps} / 3 steps</p>
      <progress className={styles.progress} aria-label="Session preview progress" value={completedSteps} max={3} />
      <p className="text-sm">Proficiency: not assessed. Reviews: not scheduled.</p>
      <p className={styles.notice}>{learningPersistence.reason}</p>
      <div className={styles.actions}>
        <Link className={styles.action} href="/learn/ai-from-zero/day-1">{nextAction}<ArrowRight size={16} aria-hidden="true" /></Link>
        <Link className="text-sm font-semibold text-[#1d4f91]" href="/learn">Explore learning paths</Link>
      </div>
    </section>
  );
}