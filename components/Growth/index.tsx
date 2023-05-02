import Link from "next/link";
import { FC } from "react";

export const Growth: FC = ()=>{
	return(
		<section className="py-20" id="how-we-work">
			<div className="container">
				<div className="flex flex-wrap -mx-8">
					<div className="w-full lg:w-1/2 px-8">
						<div className="mb-12 lg:mb-0 pb-12 lg:pb-0 border-b lg:border-b-0">
							<h2
								className="mb-4 text-3xl lg:text-4xl font-bold font-heading max-w-md wow animate__animated animate__fadeIn"
								data-wow-delay=".1s"
							>
                    Commit<span className="text-blue-600"> to</span>{" "}
                    Your Personal Growth.
							</h2>
							<p
								className="mb-8 leading-loose text-blueGray-400 wow animate__animated animate__fadeIn"
								data-wow-delay=".3s"
							>
                    Working with a team means there will be varying
                    opinions and ideas. Even if you think your idea is
                    best, you should listen to all ideas before
                    pushing yours. Search for compromises, and remain
                    respectful if your work is criticized.
							</p>
							<Link href="/services">
								<a
									className="inline-block text-xs py-4 px-8 text-white font-semibold leading-none bg-blue-400 hover:bg-blue-500 rounded hover-up-2 wow animate__animated animate__fadeIn"
									data-wow-delay=".5s"
								>
                      Learn More
								</a>
							</Link>
						</div>
					</div>
					<div className="w-full lg:w-1/2 px-8">
						<ul className="space-y-12">
							<li
								className="flex -mx-4 wow animate__animated animate__fadeIn"
								data-wow-delay=".3s"
							>
								<div className="px-4">
									<span className="flex w-16 h-16 mx-auto items-center justify-center text-2xl font-bold font-heading rounded-full bg-blue-50 text-blue-600">
                        1
									</span>
								</div>
								<div className="px-4">
									<h3 className="my-4 text-xl font-semibold">
                        Project Initialization
									</h3>
									<p className="text-blueGray-400 leading-loose">
                        Project initiation is the first step in
                        starting a new project. During the project
                        initiation phase, you establish why you are
                        doing the project and what business value it
                        will deliver.
									</p>
								</div>
							</li>
							<li
								className="flex -mx-4 wow animate__animated animate__fadeIn"
								data-wow-delay=".5s"
							>
								<div className="px-4">
									<span className="flex w-16 h-16 mx-auto items-center justify-center text-2xl font-bold font-heading rounded-full bg-blue-50 text-blue-600">
                        2
									</span>
								</div>
								<div className="px-4">
									<h3 className="my-4 text-xl font-semibold">
                        Looking for Creative
									</h3>
									<p className="text-blueGray-400 leading-loose">
                        Being creative means taking risks and ignoring
                        doubt and facing fears. It means breaking with
                        routine and doing something different for the
                        sake of doing something different.
									</p>
								</div>
							</li>
							<li
								className="flex -mx-4 wow animate__animated animate__fadeIn"
								data-wow-delay=".7s"
							>
								<div className="px-4">
									<span className="flex w-16 h-16 mx-auto items-center justify-center text-2xl font-bold font-heading rounded-full bg-blue-50 text-blue-600">
                        3
									</span>
								</div>
								<div className="px-4">
									<h3 className="my-4 text-xl font-semibold">
                        Market Development
									</h3>
									<p className="text-blueGray-400 leading-loose">
                        Market development is a strategic step taken
                        by a company to develop the existing market
                        rather than looking for a new market.
									</p>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</section>
	);
};