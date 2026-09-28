import { describe, expect, it } from "vitest";
import { aiFromZero, dayOne, dayOneExercise } from "../../lib/learning/day-one";
import { checkedPreviewFeedback, completePreview, completionBlocker, createPreview, evaluateDayOne, learningPersistence, previewSignals, recordPreviewAttempt } from "../../lib/learning/engine";

const now = "2026-11-14T12:00:00.000Z";
const correct = { notes: "draft-with-review", citation: "verify-source", urgent: "human-expert" } as const;

describe("Day 1 learning engine", () => {
  it("publishes a preview with observable outcomes and consistent content references", () => {
    expect(aiFromZero.availability).toBe("preview");
    expect(dayOne.exerciseId).toBe(dayOneExercise.id);
    expect(dayOne.outcomes.every((outcome) => outcome.successCriterion.length > 0)).toBe(true);
  });
  it("does not pretend persistence is available", () => {
    expect(learningPersistence.available).toBe(false);
    expect(learningPersistence.mode).toBe("session-preview");
  });
  it("rejects empty and unknown answers", () => {
    expect(evaluateDayOne({}).passed).toBe(false);
    expect(evaluateDayOne({ ...correct, notes: "trust-ai" }).passed).toBe(false);
  });
  it("gives targeted criteria feedback", () => {
    const result = evaluateDayOne({ ...correct, citation: "draft-with-review" });
    expect(result.criteria.map((criterion) => criterion.met)).toEqual([true, false, true]);
    expect(result.criteria[1].message).toContain("original source");
  });
  it("never confuses a passing exercise with mastery", () => {
    expect(evaluateDayOne(correct)).toMatchObject({ passed: true, proficiency: "not_assessed" });
  });
  it("records immutable private preview attempts without completing a lesson", () => {
    const state = { ...createPreview(), answers: correct };
    const updated = recordPreviewAttempt(state, now);
    expect(state.attempts).toHaveLength(0);
    expect(updated.attempts[0].visibility).toBe("private");
    expect(updated.completedAt).toBeNull();
  });
  it("requires reading, checked practice, and reflection", () => {
    expect(completionBlocker(createPreview())).toContain("Read");
    expect(completionBlocker({ ...createPreview(), read: true })).toContain("practice");
    const checked = recordPreviewAttempt({ ...createPreview(), read: true, answers: correct }, now);
    expect(completionBlocker(checked)).toContain("reflection");
    expect(completePreview(checked, now).completedAt).toBeNull();
  });
  it("requires another check after changing an answer", () => {
    const checked = recordPreviewAttempt({ ...createPreview(), read: true, answers: { ...correct, notes: "verify-source" } }, now);
    expect(completionBlocker({ ...checked, answers: correct })).toContain("changed");
  });
  it("rejects oversized reflections", () => {
    const checked = recordPreviewAttempt({ ...createPreview(), read: true, answers: correct, reflection: "a".repeat(1001) }, now);
    expect(completionBlocker(checked)).toContain("1,000");
  });
  it("completes only the preview and separates consistency/proficiency", () => {
    const checked = recordPreviewAttempt({ ...createPreview(), read: true, answers: correct, reflection: "I will compare an AI summary with my original notes." }, now);
    const completed = completePreview(checked, now);
    expect(completed.completedAt).toBe(now);
    expect(previewSignals(completed)).toEqual({ completion: { completedLessons: 1, totalLessons: 1 }, consistency: { activeDates: ["2026-11-14"] }, proficiency: "not_assessed" });
  });
  it("deduplicates consistency dates without increasing proficiency", () => {
    const repeated = recordPreviewAttempt(recordPreviewAttempt(createPreview(), now), now);
    expect(previewSignals(repeated).consistency.activeDates).toHaveLength(1);
    expect(previewSignals(repeated).proficiency).toBe("not_assessed");
  });
  it("creates clean state for a new session", () => {
    expect(createPreview()).toEqual({ read: false, answers: {}, attempts: [], reflection: "", completedAt: null });
  });
  it("does not show stale feedback after choices change", () => {
    const checked = recordPreviewAttempt({ ...createPreview(), answers: correct }, now);
    expect(checkedPreviewFeedback(checked)?.passed).toBe(true);
    expect(checkedPreviewFeedback({ ...checked, answers: {} })).toBeNull();
    expect(checkedPreviewFeedback(createPreview())).toBeNull();
  });
});