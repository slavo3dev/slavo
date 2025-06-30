import dynamic from "next/dynamic";
import { HeadBasePage } from "@/components/HeadBasePage";

const PorchDashboard = dynamic(() => import("@/components/PorchElements/PorchDashboard"), { ssr: false });

export default function PorchPage() {
  return (
    <>
      <HeadBasePage
        title="Track Your Learning Goals and Streaks – Porch"
        description="Stay on top of your learning goals, track your current streaks, and visualize your progress with charts. Perfect for developers in transition!"
      />
      <section className="flex flex-col items-center justify-start w-full min-h-screen px-4 pt-16 pb-24 bg-gradient-to-br from-slate-100 to-blue-100">
        <div className="max-w-4xl w-full">
          <PorchDashboard />
        </div>
      </section>
    </>
  );
}
