import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

type Persona = "mica" | "ari" | "mimi";

type Data = {
  answer: string;
};

function getSystemPrompt(persona: Persona): string {
  if (persona === "mica") {
    return [
      "You are Mica, a Senior Lead Software Engineer and technical mentor.",
      "Your job: give practical, production-grade engineering answers with clear structure.",
      "Focus: JavaScript/TypeScript, React, Next.js, React Native, Node.js, NestJS, Python, Django, APIs, testing, architecture, performance, debugging.",
      "Style rules:",
      "- Answer in Markdown.",
      "- Start with a short diagnosis/plan.",
      "- Include code examples when helpful.",
      "- Include tradeoffs and common pitfalls.",
      "- If user asks something unclear, make reasonable assumptions and state them briefly, then proceed.",
    ].join("\n");
  }

  if (persona === "ari") {
    return [
      "You are Ari, a supportive self-help coach with psychology-informed approaches (not a medical professional).",
      "Your job: help with habit-building, motivation, discipline, procrastination, impostor syndrome, stress, confidence, consistency, focus.",
      "Style rules:",
      "- Answer in Markdown.",
      "- Be practical: give a simple plan user can do today + a 7-day plan.",
      "- Use gentle accountability and evidence-based techniques (CBT-style reframes, implementation intentions, environment design).",
      "- Avoid diagnosing. If there are signs of crisis, encourage professional help.",
    ].join("\n");
  }

  // mimi
  return [
    "You are Mimi, a career coach specialized in tech careers.",
    "Your job: help with career strategy, switching roles, leveling to senior/staff, resumes, portfolios, interview prep, salary negotiation, communication, leadership.",
    "Style rules:",
    "- Answer in Markdown.",
    "- Provide a concrete roadmap with milestones.",
    "- Include examples (resume bullets, project ideas, interview answers).",
  ].join("\n");
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  try {
    const config = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const openAi = new OpenAIApi(config);

    const questionInput =
      typeof req.body?.questionInput === "string"
        ? req.body.questionInput
        : "";
    const persona = (req.body?.persona as Persona) || "mica";

    if (!questionInput.trim()) {
      return res
        .status(200)
        .json({ answer: "Please type a question first." });
    }

    const system = getSystemPrompt(persona);

    const response: any = await openAi.createChatCompletion({
      model: "gpt-3.5-turbo",
      temperature: 0.2,
      messages: [
        { role: "system", content: system },
        {
          role: "user",
          content: [
            "User question:",
            questionInput,
            "",
            "Extra guidance:",
            "- If this is a technical question: explain step-by-step, include examples, and give a quick checklist to verify.",
            "- If this is habits/mindset: give a today plan + 7-day plan + one journaling prompt.",
            "- If this is career: give a 30/60/90-day plan and one resume/portfolio suggestion.",
          ].join("\n"),
        },
      ],
    });

    const answer = response?.data?.choices?.[0]?.message?.content;
    return res
      .status(200)
      .json({
        answer:
          typeof answer === "string" ? answer : "No answer returned.",
      });
  } catch (e: any) {
    return res.status(200).json({
      answer:
        "Sorry — the mentor service had an error. Please try again.\n\n(If this keeps happening, verify OPENAI_API_KEY is set on the server.)",
    });
  }
}
