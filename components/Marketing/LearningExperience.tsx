import { useContext } from "react";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import UserInfoContext from "context/UserInfoContext";

const plannedPaths = [
  {
    name: "AI From Zero",
    status: "First path in development",
    description:
      "Build practical AI literacy, learn to work with current tools, and check what they produce.",
    featured: true,
  },
  {
    name: "Coding & Technology",
    status: "Planned",
    description:
      "Programming foundations, web development, APIs, Git, and modern engineering.",
  },
  {
    name: "AI Automation & Agents",
    status: "Planned",
    description:
      "Explore integrations, workflow automation, and useful agent patterns.",
  },
  {
    name: "Build & Launch",
    status: "Planned",
    description:
      "Move from a useful idea through a prototype, MVP, deployment, and validation.",
  },
];

export function LearningPaths() {
  return (
    <section id="learning-paths" aria-labelledby="learning-paths-heading" className="bg-white px-6 py-16 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#1d4f91]">Choose a direction</p>
          <h2 id="learning-paths-heading" className="mt-3 text-3xl text-[#102a43] sm:text-4xl">Explore learning paths</h2>
          <p className="mt-4 leading-7 text-[#526a83]">Focused paths will connect small lessons to practice and real projects. We’ll open each path when its curriculum is ready.</p>
        </div>
        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {plannedPaths.map((path) => (
            <article key={path.name} className={`rounded-md border p-5 ${path.featured ? "border-[#3b78b8] bg-[#f5f9fe]" : "border-[#d5e3f2] bg-white"}`}>
              <p className="text-xs font-bold uppercase tracking-wide text-[#1d4f91]">{path.status}</p>
              <h3 className="mt-4 text-xl font-semibold text-[#102a43]">{path.name}</h3>
              <p className="mt-3 text-sm leading-6 text-[#526a83]">{path.description}</p>
              {path.featured ? (
                <p className="mt-5 inline-flex items-center gap-2 text-xs font-medium text-[#1d4f91]">
                  <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                  The first planned learning challenge
                </p>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function DeliberatePractice() {
  return (
    <section aria-labelledby="practice-heading" className="bg-[#f5f9fe] px-6 py-16 sm:py-20 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#1d4f91]">Why deliberate practice</p>
          <h2 id="practice-heading" className="mt-3 text-3xl text-[#102a43] sm:text-4xl">Progress comes from trying, noticing, and improving.</h2>
          <p className="mt-4 max-w-xl leading-7 text-[#526a83]">Each practice task should target a skill, give you a clear way to check your work, and leave room for feedback and another attempt.</p>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2">
          {[
            "One skill to work on",
            "A specific task to complete",
            "A clear success criterion",
            "Feedback you can act on",
            "Another opportunity to improve",
            "A result you can reflect on",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3 border-t border-[#d5e3f2] py-4 text-sm font-medium text-[#102a43]">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#1d4f91]" aria-hidden="true" />
              {item}
            </li>
          ))}
          <li className="border-t border-[#d5e3f2] py-4 text-sm leading-6 text-[#526a83] sm:col-span-2">
            Completing a lesson records progress; it does not, by itself, mean a skill is mastered.
          </li>
        </ul>
      </div>
    </section>
  );
}

export function DailySession() {
  const steps = [
    ["Learn one concept", "5 min"],
    ["Practice with intention", "10 min"],
    ["Apply it in a small build", "10 min"],
    ["Recall and reflect", "5 min"],
  ];

  return (
    <section aria-labelledby="daily-session-heading" className="bg-white px-6 py-16 sm:py-20 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
        <div className="max-w-xl">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#1d4f91]">A daily learning rhythm</p>
          <h2 id="daily-session-heading" className="mt-3 text-3xl text-[#102a43] sm:text-4xl">A useful session can fit into your day.</h2>
          <p className="mt-4 leading-7 text-[#526a83]">Use this 30-minute outline as a starting point. The time blocks should flex to your schedule and the skill you’re practicing.</p>
        </div>
        <ol className="divide-y divide-[#d5e3f2] border-y border-[#d5e3f2]">
          {steps.map(([task, duration], index) => (
            <li key={task} className="grid grid-cols-[2.5rem_1fr_auto] items-center gap-3 py-4">
              <span className="text-xs font-bold text-[#3b78b8]">0{index + 1}</span>
              <span className="text-sm font-semibold text-[#102a43]">{task}</span>
              <span className="text-xs font-medium text-[#526a83]">{duration}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function BuildAndShare() {
  return (
    <section aria-labelledby="build-heading" className="bg-[#eaf3fc] px-6 py-16 sm:py-20 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1fr_auto] md:items-end">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#1d4f91]">Make learning visible</p>
          <h2 id="build-heading" className="mt-3 text-3xl text-[#102a43] sm:text-4xl">Build something real. Share what you learn.</h2>
          <p className="mt-4 leading-7 text-[#526a83]">Projects turn ideas into practice. Porch gives learners a place to share progress, ask questions, and learn from one another.</p>
        </div>
        <Link href="/porch" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-[#b8cfe8] bg-white px-4 py-3 text-sm font-semibold text-[#1d4f91] hover:bg-[#f5f9fe] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b78b8] focus-visible:ring-offset-2">
          Visit Porch <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}

export function FounderIntroduction() {
  return (
    <section aria-labelledby="founder-heading" className="bg-white px-6 py-16 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl border-t border-[#d5e3f2] pt-10 md:grid md:grid-cols-[0.7fr_1.3fr] md:gap-12">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#1d4f91]">A founder-led learning brand</p>
        <div className="mt-4 max-w-2xl md:mt-0">
          <h2 id="founder-heading" className="text-3xl text-[#102a43] sm:text-4xl">For a world that keeps changing.</h2>
          <p className="mt-4 leading-7 text-[#526a83]">Slavo.io is built around a simple belief: people grow by learning together, practicing with purpose, and making useful things. We’re shaping the platform one thoughtful learning experience at a time.</p>
          <p className="mt-3 text-sm text-[#526a83]">Slavo.io is part of Prototype.NEXT. LearningWar and AriClear remain separate products.</p>
        </div>
      </div>
    </section>
  );
}

export function FinalLearningCallToAction() {
  const { userInfo } = useContext(UserInfoContext);

  return (
    <section aria-labelledby="final-learning-heading" className="bg-[#102a43] px-6 py-16 text-white sm:py-20 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-7 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#b8d7f5]">Your next step starts small</p>
          <h2 id="final-learning-heading" className="mt-3 text-3xl text-white sm:text-4xl">Never stop learning.</h2>
          <p className="mt-4 leading-7 text-[#d9e8f7]">Explore the free learning resources already available on Slavo.io.</p>
        </div>
        <Link href={userInfo ? "/dashboard" : "/login"} className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 self-start rounded-md bg-white px-5 py-3 text-sm font-semibold text-[#102a43] hover:bg-[#eaf3fc] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#102a43] md:self-auto">
          Start Learning Free <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}