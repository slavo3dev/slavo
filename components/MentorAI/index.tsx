import { FC, useContext, useMemo } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import UserInfoContext from "@/context/UserInfoContext";
import { OpenAI } from "../OpenAI";

// SSR-safe import (important for Next)
const TypingEffect = dynamic(() => import("react-typing-effect"), {
  ssr: false,
});

const TYPING_LINES = [
  "Technical: React / TypeScript / Node / Nest / Django",
  "Habits: procrastination, discipline, motivation, impostor syndrome",
  "Career: roadmap to Senior/Staff, interviews, resumes, portfolios",
] as const;

export const MentorAI: FC = () => {
  const { userInfo } = useContext(UserInfoContext);

  // ✅ guarantee we pass only strings (no weird values)
  const lines = useMemo(() => TYPING_LINES.map(String), []);

  return (
    <section
      className="bg-white text-black p-6 items-center"
      id="aimentor"
    >
      {userInfo?.email ? (
        <OpenAI />
      ) : (
        <div className="flex flex-wrap items-center mx-auto container">
          <div className="w-full lg:w-1/2 px-3">
            <div className="py-12">
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

                <p className="mt-6">Try:</p>

                <span className="typewrite d-inline text-brand">
                  <TypingEffect
                    text={lines}
                    speed={60}
                    eraseSpeed={35}
                    eraseDelay={1800}
                    typingDelay={200}
                  />
                </span>

                <h4 className="text-blueGray-400 leading-relaxed mt-5 text-xl">
                  Learn & grow with the power of{" "}
                  <strong>AI + mentorship</strong>.
                </h4>
              </div>

              <div className="text-center lg:text-left">
                <Link href="/login">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded focus:outline-none focus:shadow-outline">
                    Login to use Ari Mentor
                  </button>
                </Link>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 px-3 mb-12 lg:mb-0 pb-10 md:p-2">
            <div className="flex items-center justify-center">
              <img
                className="lg:max-w-lg lg:scale-100"
                src="/images/components/team.svg"
                alt="Slavo - Mentorship Platform"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
