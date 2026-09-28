import type { NextApiRequest, NextApiResponse } from "next";
import { aiFromZero, aiFromZeroModule, dayOne, dayOneExercise } from "lib/learning/day-one";
import { learningPersistence } from "lib/learning/engine";

export default function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    return response.status(405).json({ error: "Read-only catalog. Enrollment and saving are unavailable." });
  }
  return response.status(200).json({ path: aiFromZero, module: aiFromZeroModule, lesson: dayOne, exercise: dayOneExercise, persistence: learningPersistence });
}