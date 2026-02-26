import { FC, useContext, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import UserInfoContext from "@/context/UserInfoContext";

// ✅ avoid barrel import to prevent circular deps
import { OpenAI } from "../OpenAI";

const LINES = [
  "Technical: React / TypeScript / Node / Nest / Django",
  "Habits: procrastination, discipline, motivation, impostor syndrome",
  "Career: roadmap to Senior/Staff, interviews, resumes, portfolios",
];

function useRotatingText(lines: string[], intervalMs = 2500) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (!lines.length) return;
    const id = window.setInterval(() => {
      setIdx((prev) => (prev + 1) % lines.length);
    }, intervalMs);

    return () => window.clearInterval(id);
  }, [lines.length, intervalMs]);

  return lines[idx] ?? "";
}

export const MentorAI: FC = () => {
  const { userInfo } = useContext(UserInfoContext);

  const rotating = useRotatingText(LINES, 2500);

  // optional: keep stable array reference if you ever move lines into props
  const allLines = useMemo(() => LINES, []);

  return (
    <section
      className="bg-white text-black p-6 items-center"
      id="aimentor"
    >
      {userInfo?.email ? (
        <OpenAI />
      ) : (
        <div className="mx-auto container">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-10">
            {/* Left */}
            <div className="w-full lg:w-1/2 px-3">
              <div className="py-8 lg:py-12">
                <div className="max-w-lg lg:max-w-md mx-auto lg:mx-0 mb-8 text-center lg:text-left">
                  <h2 className="text-3xl lg:text-5xl mb-4 font-bold font-heading">
                    Ari <span className="text-blue-500">Mentor</span>{" "}
                    for Your Future & Growth
                  </h2>

                  <p className="text-blueGray-400 leading-relaxed">
                    <strong className="text-blue-500">
                      Ari Mentor is available 24/7!
                    </strong>
                    <br />
                    Get help with engineering questions, career
                    direction, and habit-building.
                  </p>

                  <p className="mt-6 font-semibold text-gray-800">
                    Try:
                  </p>

                  {/* Rotating highlight */}
                  <div className="mt-3">
                    <span className="inline-flex items-center gap-2 rounded bg-blue-50 px-3 py-2 text-blue-700 font-medium">
                      <span className="inline-block h-2 w-2 rounded-full bg-blue-600" />
                      {rotating}
                    </span>

                    {/* Optional: show all topics as small chips underneath */}
                    <div className="mt-3 flex flex-wrap gap-2 justify-center lg:justify-start">
                      {allLines.map((line) => (
                        <span
                          key={line}
                          className="text-xs px-2 py-1 rounded-full border border-blue-200 text-blue-700 bg-white"
                        >
                          {line}
                        </span>
                      ))}
                    </div>
                  </div>

                  <h4 className="text-blueGray-400 leading-relaxed mt-6 text-xl">
                    Learn & grow with the power of{" "}
                    <strong>AI + mentorship</strong>.
                  </h4>

                  <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                    <Link href="/login">
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded focus:outline-none focus:shadow-outline">
                        Login to use Ari Mentor
                      </button>
                    </Link>

                    <Link href="/signup">
                      <button className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50 font-bold py-2 px-5 rounded focus:outline-none focus:shadow-outline">
                        Create account
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="w-full lg:w-1/2 px-3 mb-4 lg:mb-0">
              <div className="flex items-center justify-center rounded-xl bg-blue-50 p-6">
                <img
                  className="w-full max-w-md lg:max-w-lg"
                  src="/images/components/team.svg"
                  alt="Slavo - Mentorship Platform"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
