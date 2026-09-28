import type { ExerciseAttempt, Feedback, LearningPersistence, LearningSignals, PracticeAction } from "./contracts";
import { dayOneExercise } from "./day-one";

export const learningPersistence: LearningPersistence = {
  available: false,
  mode: "session-preview",
  reason: "Enrollment and private saving are unavailable until database security is verified. Preview work stays in memory and clears on reload or account change.",
};

export interface PreviewState {
  read: boolean;
  answers: Record<string, PracticeAction>;
  attempts: ExerciseAttempt[];
  reflection: string;
  completedAt: string | null;
}

export function createPreview(): PreviewState {
  return { read: false, answers: {}, attempts: [], reflection: "", completedAt: null };
}

export function evaluateDayOne(answers: Record<string, unknown>): Feedback {
  const criteria = dayOneExercise.scenarios.map((scenario) => ({
    id: scenario.id,
    met: answers[scenario.id] === scenario.expectedAction,
    message: scenario.feedback,
  }));
  return { exerciseId: dayOneExercise.id, criteria, passed: criteria.every((criterion) => criterion.met), proficiency: "not_assessed" };
}

export function recordPreviewAttempt(state: PreviewState, now: string): PreviewState {
  const attempt: ExerciseAttempt = {
    id: `preview-attempt-${state.attempts.length + 1}`,
    enrollmentId: "preview-not-enrolled",
    exerciseId: dayOneExercise.id,
    submittedAt: now,
    answers: { ...state.answers },
    feedback: evaluateDayOne(state.answers),
    visibility: "private",
  };
  return { ...state, attempts: [...state.attempts, attempt], completedAt: null };
}

export function completionBlocker(state: PreviewState): string | null {
  if (!state.read) return "Read the lesson and confirm the reading step first.";
  const latestAttempt = state.attempts[state.attempts.length - 1];
  if (!latestAttempt || !evaluateDayOne(state.answers).passed) return "Check your practice and meet all three criteria first.";
  if (dayOneExercise.scenarios.some((scenario) => latestAttempt.answers[scenario.id] !== state.answers[scenario.id])) return "Your choices changed. Check your practice again.";
  const length = state.reflection.trim().length;
  if (length < 20 || length > 1000) return "Write a reflection between 20 and 1,000 characters.";
  return null;
}

export function checkedPreviewFeedback(state: PreviewState): Feedback | null {
  const latestAttempt = state.attempts[state.attempts.length - 1];
  if (!latestAttempt || dayOneExercise.scenarios.some((scenario) => latestAttempt.answers[scenario.id] !== state.answers[scenario.id])) return null;
  return evaluateDayOne(state.answers);
}

export function completePreview(state: PreviewState, now: string): PreviewState {
  if (completionBlocker(state)) return state;
  return { ...state, completedAt: now };
}

export function previewSignals(state: PreviewState): LearningSignals {
  return {
    completion: { completedLessons: state.completedAt ? 1 : 0, totalLessons: 1 },
    consistency: { activeDates: [...new Set(state.attempts.map((attempt) => attempt.submittedAt.slice(0, 10)))] },
    proficiency: "not_assessed",
  };
}