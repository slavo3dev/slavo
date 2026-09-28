import { useContext } from "react";
import Link from "next/link";
import { Check, RotateCcw } from "lucide-react";
import { HeadBasePage } from "@components";
import UserInfoContext from "context/UserInfoContext";
import { useLearningPreview } from "context/LearningPreviewContext";
import type { PracticeAction } from "lib/learning/contracts";
import { dayOne, dayOneExercise } from "lib/learning/day-one";
import { checkedPreviewFeedback, completePreview, completionBlocker, createPreview, learningPersistence, recordPreviewAttempt } from "lib/learning/engine";
import styles from "styles/Learning.module.css";

const actions: { value: PracticeAction; label: string }[] = [
  { value: "draft-with-review", label: "Draft with AI and compare with the original" },
  { value: "verify-source", label: "Verify the claim in a reliable original source" },
  { value: "human-expert", label: "Seek qualified human or emergency help" },
];

export default function DayOnePage() {
  const { userInfo } = useContext(UserInfoContext);
  const { state, setState } = useLearningPreview();
  const currentFeedback = checkedPreviewFeedback(state);
  const blocker = completionBlocker(state);

  return (
    <>
      <HeadBasePage title="Day 1: What AI Can and Cannot Do | Slavo.io" description="Practice recognizing AI limitations, checking sources, and keeping a human checkpoint." canonicalPath="/learn/ai-from-zero/day-1" />
      <main className={styles.page}>
        <Link className="font-semibold text-[#1d4f91]" href="/learn">Learning paths</Link>
        <p className="mt-6 text-sm font-semibold text-[#1d4f91]">AI From Zero · Day 1 · {dayOne.estimatedMinutes} minutes</p>
        <h1>{dayOne.title}</h1>
        <p className={styles.notice}>{learningPersistence.reason}</p>
        <div className={styles.actions}>
          <button type="button" className={styles.action} disabled>Enrollment unavailable</button>
          {userInfo ? <p className="text-sm">Signed in. Durable enrollment is not enabled yet.</p> : <Link className="font-semibold text-[#1d4f91]" href="/login">Sign in to your Slavo account</Link>}
          <Link className="font-semibold text-[#1d4f91]" href="/dashboard">View dashboard</Link>
        </div>
        <section aria-labelledby="read-heading">
          <h2 id="read-heading">Learn one concept</h2>
          {dayOne.content.map((part) => <div className="mb-6" key={part.heading}><h3>{part.heading}</h3><p>{part.body}</p></div>)}
          <h3>Practical example</h3><p>{dayOne.example}</p>
          <label className={`${styles.option} mt-5`}>
            <input type="checkbox" checked={state.read} onChange={(event) => setState((previous) => ({ ...previous, read: event.target.checked, completedAt: null }))} />
            I have read the lesson and example.
          </label>
        </section>
        <section aria-labelledby="exercise-heading">
          <h2 id="exercise-heading">Practice: choose a safe next action</h2>
          <p>{dayOneExercise.instruction}</p>
          <p className="mt-2 text-sm">Success criterion: choose the appropriate action for all three tasks. Feedback is a deterministic answer-key check, not a mastery assessment.</p>
          <form onSubmit={(event) => { event.preventDefault(); setState((previous) => recordPreviewAttempt(previous, new Date().toISOString())); }}>
            {dayOneExercise.scenarios.map((scenario) => (
              <fieldset className={styles.field} key={scenario.id}>
                <legend>{scenario.task}</legend>
                {actions.map((action) => <label className={styles.option} key={action.value}>
                  <input type="radio" name={scenario.id} value={action.value} required checked={state.answers[scenario.id] === action.value} onChange={() => setState((previous) => ({ ...previous, answers: { ...previous.answers, [scenario.id]: action.value }, completedAt: null }))} />
                  {action.label}
                </label>)}
              </fieldset>
            ))}
            <button className={styles.action} type="submit"><Check size={16} aria-hidden="true" />Check practice</button>
          </form>
          {currentFeedback ? <div className={styles.feedback} role="status" aria-live="polite">
            <h3>{currentFeedback.passed ? "All three criteria met" : "Try again with feedback"}</h3>
            {currentFeedback.criteria.map((criterion) => <p key={criterion.id}><strong>{criterion.met ? "Met" : "Needs improvement"}:</strong> {criterion.message}</p>)}
            <p className="text-sm">{state.attempts.length} preview attempt(s) in memory. Nothing has been saved to your account.</p>
          </div> : null}
        </section>
        <section aria-labelledby="reflection-heading">
          <h2 id="reflection-heading">Recall and reflect</h2>
          <label htmlFor="reflection">{dayOne.reflectionPrompt}</label>
          <textarea className={styles.reflection} id="reflection" maxLength={1000} value={state.reflection} onChange={(event) => setState((previous) => ({ ...previous, reflection: event.target.value, completedAt: null }))} aria-describedby="reflection-help" />
          <p id="reflection-help" className="text-sm">20–1,000 characters. Do not include sensitive information. Your reflection is not transmitted or saved.</p>
          <div className={styles.actions}>
            <button className={styles.action} type="button" disabled={Boolean(blocker) || Boolean(state.completedAt)} onClick={() => setState((previous) => completePreview(previous, new Date().toISOString()))}>Complete session preview</button>
            <button className="inline-flex items-center gap-2 text-sm font-semibold text-[#1d4f91]" type="button" onClick={() => setState(createPreview())}><RotateCcw size={16} aria-hidden="true" />Reset preview</button>
          </div>
          <p className="mt-4" role="status">{state.completedAt ? "Day 1 preview complete. Proficiency is not assessed; progress is not saved." : blocker}</p>
          <Link className="mt-4 inline-block font-semibold text-[#1d4f91]" href="/dashboard">See session progress on your dashboard</Link>
        </section>
      </main>
    </>
  );
}