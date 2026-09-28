import type { Exercise, LearningModule, LearningPath, Lesson } from "./contracts";

export const dayOne: Lesson = {
  id: "ai-zero-day-1",
  moduleId: "ai-zero-foundations",
  day: 1,
  title: "What AI Can and Cannot Do",
  estimatedMinutes: 25,
  prerequisites: [],
  outcomes: [
    { id: "ai-limits", description: "Distinguish drafting help from trustworthy evidence.", successCriterion: "Choose a suitable review action for three realistic AI tasks." },
    { id: "safe-use", description: "Recognize when to verify a source or consult a qualified person.", successCriterion: "Do not treat an AI response as a verified citation or emergency advice." },
  ],
  content: [
    { heading: "Useful assistance, not a guarantee", body: "Generative AI learns patterns and produces plausible text, images, or code. It can help draft a summary, explain an idea, or suggest alternatives. A fluent answer is not evidence that the answer is true." },
    { heading: "Know the limits", body: "AI can invent citations, miss context, reproduce bias, and make confident mistakes. Some tools can search or calculate, but you still need to inspect their sources and results. Do not upload passwords, private work data, or other people's personal information." },
    { heading: "Keep a human checkpoint", body: "Use your own non-sensitive notes for a draft, then compare the result with the original. For claims, check reliable original sources. For urgent medical, legal, or safety decisions, seek qualified help rather than relying on a chatbot." },
  ],
  example: "Task: turn your own meeting notes into three bullets. Prompt: 'Summarize only these notes. Do not add facts. Mark anything unclear as a question.' Compare every bullet against your notes before using it. If a bullet adds a claim, remove it or verify it independently.",
  exerciseId: "ai-zero-safe-actions",
  reflectionPrompt: "Name one task where AI could help you, and the human check you would apply before using its output.",
};

export const dayOneExercise: Exercise = {
  id: dayOne.exerciseId,
  lessonId: dayOne.id,
  targetSkill: "Choose a safe action for an AI-assisted task",
  instruction: "For each task, choose the next action that keeps you responsible for the result. Then check your choices and improve any that missed a criterion.",
  scenarios: [
    { id: "notes", task: "Summarize your own non-sensitive notes into three bullets.", expectedAction: "draft-with-review", feedback: "Draft with AI, then compare each bullet with your original notes. Do not let the draft introduce new facts." },
    { id: "citation", task: "An AI response gives a surprising statistic with a citation.", expectedAction: "verify-source", feedback: "Open the original source and check the claim, date, and context. A citation in generated text may be fabricated." },
    { id: "urgent", task: "Someone asks a chatbot what to do about an urgent medical symptom.", expectedAction: "human-expert", feedback: "Seek qualified medical or emergency help. A chatbot is not a substitute for urgent care." },
  ],
};

export const aiFromZeroModule: LearningModule = {
  id: dayOne.moduleId,
  pathId: "ai-from-zero",
  title: "AI foundations",
  lessonIds: [dayOne.id],
};

export const aiFromZero: LearningPath = {
  id: "ai-from-zero",
  title: "AI From Zero",
  description: "Practical AI literacy for beginners. Day 1 is available as a session-only preview; the remaining eight days are planned.",
  availability: "preview",
  moduleIds: [aiFromZeroModule.id],
  outcomes: dayOne.outcomes,
};