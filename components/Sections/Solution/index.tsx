import { FC } from "react";
import Link from "next/link";

export const Solution : FC = () =>{
	return(
		<section id="how-we-work" aria-labelledby="how-we-work-heading" className="bg-[#18342c] px-6 py-16 text-white sm:py-20 lg:px-8">
			<div className="mx-auto max-w-7xl">
				<div className="max-w-2xl">
					<p className="text-xs font-bold uppercase tracking-[0.16em] text-[#f5d66d]">How learning works</p>
					<h2 id="how-we-work-heading" className="mt-3 text-3xl sm:text-4xl">Small steps. Real momentum.</h2>
					<p className="mt-4 leading-7 text-[#d3e1d9]">A sustainable learning rhythm turns a big career goal into practical work you can finish, review, and build on.</p>
				</div>
				<ol className="mt-10 grid gap-8 border-t border-[#476257] pt-7 sm:grid-cols-3">
					<li>
						<span className="text-sm font-semibold text-[#f5d66d]">01</span>
						<h3 className="mt-3 text-xl font-semibold text-white">Choose your next step</h3>
						<p className="mt-2 leading-6 text-[#d3e1d9]">Set a clear goal and focus on the skills that move you toward it.</p>
					</li>
					<li>
						<span className="text-sm font-semibold text-[#f5d66d]">02</span>
						<h3 className="mt-3 text-xl font-semibold text-white">Practice with a plan</h3>
						<p className="mt-2 leading-6 text-[#d3e1d9]">Learn the fundamentals, make time to practice, and ask for feedback.</p>
					</li>
					<li>
						<span className="text-sm font-semibold text-[#f5d66d]">03</span>
						<h3 className="mt-3 text-xl font-semibold text-white">Build and share</h3>
						<p className="mt-2 leading-6 text-[#d3e1d9]">Turn new skills into projects and make progress visible on Porch.</p>
					</li>
				</ol>
				<div className="mt-8">
					<Link href="/porch" className="inline-flex items-center gap-2 text-sm font-semibold text-[#f5d66d] hover:text-white">See learning in action <span aria-hidden="true">→</span></Link>
				</div>
			</div>
		</section>
	);
};

