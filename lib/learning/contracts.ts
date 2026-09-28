export interface LearningOutcome {
  id: string;
  description: string;
  successCriterion: string;
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  availability: "preview" | "available" | "planned";
  moduleIds: string[];
  outcomes: LearningOutcome[];
}

export interface LearningModule {
  id: string;
  pathId: string;
  title: string;
  lessonIds: string[];
}

export interface Lesson {
  id: string;
  moduleId: string;
  day: number;
  title: string;
  estimatedMinutes: number;
  outcomes: LearningOutcome[];
  prerequisites: string[];
  content: { heading: string; body: string }[];
  example: string;
  exerciseId: string;
  reflectionPrompt: string;
}

export interface Enrollment {
  id: string;
  userId: string;
  pathId: string;
  enrolledAt: string;
  status: "active" | "completed" | "withdrawn";
}

export interface LessonProgress {
  enrollmentId: string;
  lessonId: string;
  status: "not_started" | "in_progress" | "completed";
  completedAt: string | null;
  lastActivityAt: string;
}

export type PracticeAction = "draft-with-review" | "verify-source" | "human-expert";

export interface Exercise {
  id: string;
  lessonId: string;
  targetSkill: string;
  instruction: string;
  scenarios: { id: string; task: string; expectedAction: PracticeAction; feedback: string }[];
}

export interface Feedback {
  exerciseId: string;
  criteria: { id: string; met: boolean; message: string }[];
  passed: boolean;
  proficiency: "not_assessed";
}

export interface ExerciseAttempt {
  id: string;
  enrollmentId: string;
  exerciseId: string;
  submittedAt: string;
  answers: Record<string, PracticeAction>;
  feedback: Feedback;
  visibility: "private";
}

export interface ReviewSchedule {
  id: string;
  enrollmentId: string;
  outcomeId: string;
  dueAt: string;
  reviewedAt: string | null;
}

export interface LearningSignals {
  completion: { completedLessons: number; totalLessons: number };
  consistency: { activeDates: string[] };
  proficiency: "not_assessed";
}

export interface LearningPersistence {
  available: boolean;
  mode: "session-preview" | "verified-database";
  reason: string;
}

export interface EnrollRequest {
  pathId: string;
}

export interface SubmitAttemptRequest {
  exerciseId: string;
  answers: Record<string, PracticeAction>;
  idempotencyKey: string;
}

export interface CompleteLessonRequest {
  lessonId: string;
  attemptId: string;
  reflection: string;
}

export type LearningApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; code: "UNAUTHENTICATED" | "FORBIDDEN" | "INVALID_INPUT" | "PERSISTENCE_UNAVAILABLE"; message: string };