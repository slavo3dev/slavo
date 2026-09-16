import { FC } from "react";

const learningStages = [
  { title: "Discover", description: "Choose what you want to learn and why." },
  { title: "Plan", description: "Find a useful next step and a realistic pace." },
  { title: "Learn", description: "Focus on one concept at a time." },
  { title: "Practice", description: "Work toward a clear skill and success criterion." },
  { title: "Build", description: "Apply what you know to a tangible project." },
  { title: "Share", description: "Ask for feedback and learn with others." },
  { title: "Review", description: "Recall key ideas and revisit them over time." },
];

export const Solution: FC = () => (
    <section id="learning-system" aria-labelledby="learning-system-heading" className="bg-[#102a43] px-6 py-10 text-white sm:py-12 lg:px-8">
    <div className="mx-auto max-w-7xl">
      <div className="max-w-2xl">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#b8d7f5]">The Slavo Learning System</p>
        <h2 id="learning-system-heading" className="mt-3 text-3xl text-white sm:text-4xl">Learning that moves into the real world.</h2>
        <p className="mt-4 leading-7 text-[#d9e8f7]">A repeatable cycle helps turn curiosity into useful skill, and useful skill into work you can share.</p>
      </div>
      <ol className="mt-10 grid gap-x-7 gap-y-8 border-t border-[#47617b] pt-7 sm:grid-cols-2 lg:grid-cols-4">
        {learningStages.map((stage, index) => (
          <li key={stage.title}>
            <span className="text-sm font-semibold text-[#b8d7f5]">0{index + 1}</span>
            <h3 className="mt-2 text-xl font-semibold text-white">{stage.title}</h3>
            <p className="mt-2 text-sm leading-6 text-[#d9e8f7]">{stage.description}</p>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

