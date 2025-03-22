import React from "react";
import type { NextPage } from "next";
// import Layout from "../components/layout/Layout";
import { Subscribe, ContactForm, CounterUp, PricingSection } from "@components";
import Head from "next/head";
//import Stripe from "stripe";
import { GetStaticProps } from "next";
import { HeadBasePage } from "@components";
import { Breadcrumb } from "@components";


const Programs: NextPage = ({ plans }: any ) => {

	console.log( "Plans: ", plans );
    
	return (
		<>
			<>
			<HeadBasePage 
        title="Software Web/Mobile Development - Consulting - Slavo_3"
        description="Become Software Developer / Consulting for Business and Startups"
        canonicalPath="/programs"
      />
				{/* <section className="flex flex-col bg-white justify-center items-center h-full p-8"> */}
			<section className="flex flex-col pt-16 pb-12 bg-white px-6 lg:px-10 justify-center items-center border-t-2 border-t-orange-950">
        <div className="container">
          <h1 className="text-2xl lg:text-5xl font-bold mb-5 wow animate__animated animate__fadeIn animated">
            Programs
          </h1>
          
          <Breadcrumb 
            items={[
              { label: "Home", href: "/" },
              { label: "Programs", href: "/programs" },
              { label: "Career Change / Become a Freelancer / Business Growth / Digital Nomad..." }
            ]}
          />
					
        </div>
      </section>
				<section className="pt-12">
					<div className="container py-12 mx-auto">
						<div className="flex flex-wrap">
							<div
								className="w-full md:w-1/2 pr-12 px-3 order-0 md:order-0 mb-12 md:mb-0 wow animate__animated animate__fadeIn"
								data-wow-delay=".5s"
							>
								<img
									className="sm:max-w-sm lg:max-w-full mx-auto"
									src="/images/components/service_min.png"
									alt="Learn new Skills"
								/>
							</div>
							<div className="w-full md:w-1/2 px-3 order-1 md:order-1">
								<div className="max-w-md-2">
									<div className="mb-4">
										<span
											className="text-xs py-1 px-3 text-blue-500 font-semibold bg-blue-50 rounded-xl wow animate__animated animate__fadeInDown"
											data-wow-delay=".9s"
										>
                      Why choose us
										</span>
										<h2
											className="text-4xl mt-3 font-bold font-heading wow animate__animated animate__fadeIn"
											data-wow-delay=".3s"
										>
                      We Provide the best <br />
											<span className="text-blue-500">
                        environment
											</span>{" "}
                      for personal growth.
										</h2>
									</div>

									<p
										className="mb-6 leading-loose text-blueGray-400 wow animate__animated animate__fadeIn"
										data-wow-delay=".1s"
									>
                    You spend 86,400 hours of your life at work.
										<br />
                    You deserve a job that you love!
									</p>

									<div className="flex flex-wrap">
										<div
											className="w-full md:w-1/2 items-start pt-4 pb-8 wow animate__animated animate__fadeIn"
											data-wow-delay=".2s"
										>
											<div className="w-8 mb-5 text-blue-500">
												<span className="inline-block py-2 px-4 mr-4 text-xs font-semibold bg-blue-500 text-white rounded">
                          1
												</span>
											</div>
											<div>
												<h3 className="mb-2 text-xl font-semibold font-heading">
                          Grow with the Team
												</h3>
												<p className="text-blueGray-400 leading-loose text-sm">
                          After 7-days of learning, you will be
                          included in the team project & start
                          practicing your skills.
													<br />
                          Working in a team encourages
													<br />
                          personal growth and reduces stress.
												</p>
											</div>
										</div>
										<div
											className="w-full md:w-1/2 items-start py-4 wow animate__animated animate__fadeIn"
											data-wow-delay=".3s"
										>
											<div className="w-8 mb-5 text-blue-500">
												<span className="inline-block py-2 px-4 mr-4 text-xs font-semibold bg-blue-500 text-white rounded">
                          2
												</span>
											</div>
											<div>
												<h3 className="mb-2 text-xl font-semibold font-heading">
                          Learning By Doing
												</h3>
												<p className="text-blueGray-400 leading-loose text-sm">
                          Deliberate practice means practicing with a
                          clear awareness of the specific components
                          of a skill we are aiming to improve and
                          exactly how to improve them.
												</p>
											</div>
										</div>
										<div
											className="w-full md:w-1/2 items-start py-4 wow animate__animated animate__fadeIn"
											data-wow-delay=".4s"
										>
											<div className="w-8 mb-5 text-blue-500">
												<span className="inline-block py-2 px-4 mr-4 text-xs font-semibold bg-blue-500 text-white rounded">
                          3
												</span>
											</div>
											<div>
												<h3 className="mb-2 text-xl font-semibold font-heading">
                          Tools & Resources
												</h3>
												<p className="text-blueGray-400 leading-loose text-sm">
                          We will provide you best tools and resources
                          to help you
													<br /> learn new skill, such as free
                          courses, chatbot, mentors, podcasts, books,
													<br /> and connect with professionals{" "}
												</p>
											</div>
										</div>
										<div
											className="w-full md:w-1/2 items-start py-4 wow animate__animated animate__fadeIn"
											data-wow-delay=".5s"
										>
											<div className="w-8 mb-5 text-blue-500">
												<span className="inline-block py-2 px-4 mr-4 text-xs font-semibold bg-blue-500 text-white rounded">
                          4
												</span>
											</div>
											<div>
												<h3 className="mb-2 text-xl font-semibold font-heading">
                          Evaluate your new skills
												</h3>
												<p className="text-blueGray-400 leading-loose text-sm">
                          One of the most effective ways to develop
                          your new skillset is to constantly practice
                          & evaluate what you have learned. We will
                          constatly track your progress.
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
				<section className="flex flex-col bg-white justify-center items-center h-full">
					<div className="container">
						<div className="flex flex-wrap justify-between pt-16 pb-16 px-3">
							<div
								className="hover-up-5 flex w-1/2 lg:w-auto py-4 wow animate__animated animate__fadeIn"
								data-wow-delay=".2s"
							>
								<div className="flex justify-center items-center bg-blueGray-50 text-blue-500 rounded-xl h-12 w-12 sm:h-20 sm:w-20">
									<svg
										className="w-8 h-8"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
										></path>
									</svg>
								</div>
								<div className="sm:py-2 ml-2 sm:ml-6">
									<span className="sm:text-2xl font-bold font-heading">
                    +{" "}
									</span>
									<span className="sm:text-2xl font-bold font-heading count">
										<CounterUp count={150} time={3} />
									</span>
									<p className="text-xs sm:text-base text-blueGray-400">
                    Annual Partner
									</p>
								</div>
							</div>
							<div
								className="hover-up-5 flex w-1/2 lg:w-auto py-4 wow animate__animated animate__fadeIn"
								data-wow-delay=".4s"
							>
								<div className="flex justify-center items-center bg-blueGray-50 text-blue-500 rounded-xl h-12 w-12 sm:h-20 sm:w-20">
									<svg
										className="w-8 h-8"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
										></path>
									</svg>
								</div>
								<div className="sm:py-2 ml-2 sm:ml-6">
									<span className="sm:text-2xl font-bold font-heading">
                    +{" "}
									</span>
									<span className="sm:text-2xl font-bold font-heading count">
										<CounterUp count={15} time={3} />
									</span>
									<span className="sm:text-2xl font-bold font-heading">
										{" "}
                    k{" "}
									</span>
									<p className="text-xs sm:text-base text-blueGray-400">
                    Completed Projects
									</p>
								</div>
							</div>
							<div
								className="hover-up-5 flex w-1/2 lg:w-auto py-4 wow animate__animated animate__fadeIn"
								data-wow-delay=".6s"
							>
								<div className="flex justify-center items-center bg-blueGray-50 text-blue-500 rounded-xl h-12 w-12 sm:h-20 sm:w-20">
									<svg
										className="w-8 h-8"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
										></path>
									</svg>
								</div>
								<div className="sm:py-2 ml-2 sm:ml-6">
									<span className="sm:text-2xl font-bold font-heading">
                    +{" "}
									</span>
									<span className="sm:text-2xl font-bold font-heading count">
										<CounterUp count={500} time={3} />
									</span>
									<p className="text-xs sm:text-base text-blueGray-400">
                    Happy Customers
									</p>
								</div>
							</div>
							<div
								className="hover-up-5 flex w-1/2 lg:w-auto py-4 wow animate__animated animate__fadeIn"
								data-wow-delay=".8s"
							>
								<div className="flex justify-center items-center bg-blueGray-50 text-blue-500 rounded-xl h-12 w-12 sm:h-20 sm:w-20">
									<svg
										className="w-8 h-8"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
										></path>
									</svg>
								</div>
								<div className="sm:py-2 ml-2 sm:ml-6">
									<span className="sm:text-2xl font-bold font-heading">
                    +{" "}
									</span>
									<span className="sm:text-2xl font-bold font-heading count">
										<CounterUp count={320} time={3} />
									</span>
									<p className="text-xs sm:text-base text-blueGray-400">
                    Research Work
									</p>
								</div>
							</div>
						</div>
					</div>
				</section>
				<section
					className="pt-20 pb-24 bg-blueGray-50 flex flex-col justify-center items-center h-full "
					id="how-we-work"
				>
					<div className="container">
						<div className="flex flex-wrap items-center justify-between max-w-2xl lg:max-w-full mb-12">
							<div className="w-full lg:w-1/2 mb-4 lg:mb-0">
								<h2 className="text-3xl md:text-4xl font-bold font-heading wow animate__animated animate__fadeInDown">
									<span>We are </span>
									<span className="text-blue-500">awesome team </span>
									<br />
									<span>for your business dream</span>
								</h2>
							</div>
							<div className="w-full lg:w-1/2">
								<p className="text-blueGray-400 leading-loose wow animate__animated animate__fadeIn">
                  For us, every relationship is built on trust and
                  honesty.
									<br />
                  Our web development process keeps those people
                  involved, engaged and informed throughout design,
                  build and the life of your project.
								</p>
							</div>
						</div>
						<div className="flex flex-wrap -mx-3 -mb-6 text-center">
							<div
								className="hover-up-5 w-full md:w-1/2 lg:w-1/3 px-3 mb-6 wow animate__animated animate__fadeIn"
								data-wow-delay=".3s"
							>
								<div className="p-12 bg-white shadow rounded">
									<div className="flex w-12 h-12 mx-auto items-center justify-center text-blue-800 font-bold font-heading bg-blue-200 rounded-full">
                    1
									</div>
									<img
										className="h-36 mx-auto my-4"
										src="images/components/eating.svg"
										alt="Slavo_3 Consulting & Mentorship"
									/>
									<h3 className="mb-2 font-bold font-heading text-xl">
                    Project Initialization
									</h3>
									<p className="text-sm text-blueGray-400 leading-relaxed">
                    Project initiation ensures that you lay a strong
                    foundation for a new project in your company our
                    team.
									</p>
								</div>
							</div>
							<div
								className="hover-up-5 w-full md:w-1/2 lg:w-1/3 px-3 mb-6 wow animate__animated animate__fadeIn"
								data-wow-delay=".5s"
							>
								<div className="p-12 bg-white shadow rounded">
									<div className="flex w-12 h-12 mx-auto items-center justify-center text-blue-800 font-bold font-heading bg-blue-200 rounded-full">
                    2
									</div>
									<img
										className="h-36 mx-auto my-4"
										src="images/components/mantorship.svg"
										alt="Slavo_3 Consulting & Mentoship"
									/>
									<h3 className="mb-2 font-bold font-heading text-xl">
                    Project planning
									</h3>
									<p className="text-sm text-blueGray-400 leading-relaxed">
                    A project plan is essential to keep everything
                    related to the project organized, methodical, and
                    on track.
									</p>
								</div>
							</div>
							<div className="hover-up-5 w-full lg:w-1/3 px-3 mb-6">
								<div
									className="p-12 bg-white shadow rounded wow animate__animated animate__fadeIn"
									data-wow-delay=".7s"
								>
									<div className="flex w-12 h-12 mx-auto items-center justify-center text-blue-800 font-bold font-heading bg-blue-200 rounded-full">
                    3
									</div>
									<img
										className="h-36 mx-auto my-4"
										src="images/components/task.svg"
										alt="Slavo_3 Consulting & Mentoship"
									/>
									<h3 className="mb-2 font-bold font-heading text-xl">
                    Project organization
									</h3>
									<p className="text-sm text-blueGray-400 leading-relaxed">
                    Moving forward you will be able to keep yourself
                    and your team on track, and address challenges
                    early.
									</p>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section className="flex flex-col bg-white justify-center items-center h-full pt-20 pb-16 xl:bg-contain bg-top bg-no-repeat">
					<div className="container">
						<div className="text-center mb-16">
							<h2
								className="max-w-lg mx-auto mb-4 text-4xl font-bold font-heading wow animate__animated animate__fadeIn"
								data-wow-delay=".2s"
							>
								<span>Start saving time today and</span>
								<span className="text-blue-500"> choose </span>
								<span>your best plan</span>
							</h2>
							<p
								className="max-w-sm mx-auto text-lg text-blueGray-400 wow animate__animated animate__fadeInDown"
								data-wow-delay=".5s"
							>
                Start Your Growth Today! Learn, Build and Growth as
                fast as possible!
							</p>
						</div>
						<div className="flex flex-wrap -mx-3">
							<div className="w-full md:w-1/2 lg:w-1/3 px-3 mb-6">
								<div
									className="hover-up-5 border border-gray-200 pt-16 pb-8 px-4 text-center bg-white rounded shadow wow animate__animated animate__fadeIn"
									data-wow-delay=".2s"
								>
									<img
										className="h-20 mb-6 mx-auto"
										src="images/components/team.svg"
										alt="Slavo_3 Web & Mobile Consulting / Mentorship"
									/>
									<h3 className="mb-2 text-4xl font-bold font-heading">
                                      Habit Horizons
									</h3>
									<span className="text-4xl text-blue-500 font-bold font-heading">
                                     $9.99
									</span>
									<p className="mt-2 mb-8 text-blueGray-400">
                    per month
									</p>
									<div className="flex flex-col items-center mb-8">
										<ul className="text-blueGray-400">
											<li className="flex mb-3">
												<svg
													className="w-6 h-6 mr-2 text-green-500"
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth="2"
														d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
													></path>
												</svg>
												<span>
                                                    Cue creation
												</span>
											</li>
											<li className="flex mb-3">
												<svg
													className="w-6 h-6 mr-2 text-green-500"
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth="2"
														d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
													></path>
												</svg>
												<span>Mentor: Regular Check-Ins</span>
											</li>
											<li className="flex mb-3">
												<svg
													className="w-6 h-6 mr-2 text-green-500"
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth="2"
														d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
													></path>
												</svg>
												<span>Daily Notifications: Reminder Mechanism</span>
											</li>
											<li className="flex">
												<svg
													className="w-6 h-6 mr-2 text-green-500"
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth="2"
														d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
													></path>
												</svg>
												<span>Monitor Progress</span>
											</li>
										</ul>
									</div>
									<div>
										<a
											className="block sm:inline-block py-4 px-6 mb-4 sm:mb-0 sm:mr-3 text-xs text-white text-center font-semibold leading-none bg-blue-400 hover:bg-blue-500 rounded"
											href="#"
										>
                      Learn More...
										</a>
										<a
											className="block sm:inline-block py-4 px-6 text-xs text-blueGray-500 hover:text-blueGray-600 text-center font-semibold leading-none bg-white border border-blueGray-200 hover:border-blueGray-300 rounded"
											href="#"
										>
                      Purchase
										</a>
									</div>
								</div>
							</div>
							<div className="w-full md:w-1/2 lg:w-1/3 px-3 mb-6">
								<div
									className="hover-up-5 pt-16 pb-8 px-4 text-center text-white bg-blue-500 rounded shadow wow animate__animated animate__fadeIn"
									data-wow-delay=".4s"
								>
									<img
										className="h-20 mb-6 mx-auto"
										src="images/components/web.svg"
										alt="Slavo_3 Web & Mobile Consulting & Mentorship"
									/>
									<h3 className="mb-2 text-4xl font-bold font-heading">
                                      Digital Horizons
									</h3>
									<span className="text-4xl font-bold font-heading">
                                        $99.99
									</span>
									<p className="mt-2 mb-8">per month</p>
									<div className="flex flex-col items-center mb-8">
										<ul>
											<li className="flex items-center mb-3">
												<svg
													className="w-6 h-6 mr-2 text-green-500"
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth="2"
														d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
													></path>
												</svg>
												<span>
                                                   CodeCraft: Your Digital Nomad Journey
												</span>
											</li>
											<li className="flex items-center mb-3">
												<svg
													className="w-6 h-6 mr-2 text-green-500"
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth="2"
														d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
													></path>
												</svg>
												<span>Career Coaching</span>
											</li>
											<li className="flex items-center mb-3">
												<svg
													className="w-6 h-6 mr-2 text-green-500"
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth="2"
														d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
													></path>
												</svg>
												<span>Tracking Progress</span>
											</li>
											<li className="flex items-center">
												<svg
													className="w-6 h-6 mr-2 text-green-500"
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth="2"
														d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
													></path>
												</svg>
												<span>Elevate Every Opportunity</span>
											</li>
										</ul>
									</div>
									<div>
										<a
											className="block sm:inline-block py-4 px-6 mb-4 sm:mb-0 sm:mr-3 text-xs text-blue-500 font-semibold leading-none bg-white hover:bg-blueGray-50 rounded"
											href="#"
										>
                      Learn More...
										</a>
										<a
											className="block sm:inline-block py-4 px-6 text-xs font-semibold leading-none border border-blue-400 hover:border-blue-400 rounded"
											href="#"
										>
                      Purchase
										</a>
									</div>
								</div>
							</div>
							<div className="w-full lg:w-1/3 px-3 mb-6">
								<div
									className="hover-up-5 border border-gray-200 pt-16 pb-8 px-4 text-center bg-white rounded shadow wow animate__animated animate__fadeIn"
									data-wow-delay=".6s"
								>
									<img
										className="h-20 mb-6 mx-auto"
										src="images/components/space.svg"
										alt="Slavo_3 Web & Mobile Development Consulting & Mentorship"
									/>
									<h3 className="mb-2 text-4xl font-bold font-heading">
                                        Dedicate to Dominate
									</h3>
									<span className="text-4xl text-blue-500 font-bold font-heading">
                                        $240.00
									</span>
									<p className="mt-2 mb-8 text-blueGray-400">
                                        per month
									</p>
									<div className="flex flex-col items-center mb-8">
										<ul className="text-blueGray-400">
											<li className="flex mb-3">
												<svg
													className="w-6 h-6 mr-2 text-green-500"
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth="2"
														d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
													></path>
												</svg>
												<span>
                                                    Recruit & Rise
												</span>
											</li>
											<li className="flex mb-3">
												<svg
													className="w-6 h-6 mr-2 text-green-500"
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth="2"
														d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
													></path>
												</svg>
												<span>CodeCraft: Your FrontEnd Journey</span>
											</li>
											<li className="flex mb-3">
												<svg
													className="w-6 h-6 mr-2 text-green-500"
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth="2"
														d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
													></path>
												</svg>
												<span>Career Coaching</span>
											</li>
											<li className="flex">
												<svg
													className="w-6 h-6 mr-2 text-green-500"
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth="2"
														d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
													></path>
												</svg>
												<span>365: Your Guided Year</span>
											</li>
										</ul>
									</div>
									<div>
										<a
											className="block sm:inline-block py-4 px-6 mb-4 sm:mb-0 sm:mr-3 text-xs text-white text-center font-semibold leading-none bg-blue-400 hover:bg-blue-500 rounded"
											href="#"
										>
                      Learn More...
										</a>
										<a
											className="block sm:inline-block py-4 px-6 text-xs text-blueGray-500 hover:text-blueGray-600 text-center font-semibold leading-none bg-white border border-blueGray-200 hover:border-blueGray-300 rounded"
											href="#"
										>
                      Purchase
										</a>
									</div>
								</div>
							</div>
						</div>
						<PricingSection />
					</div>
					
				</section>

				<section className="flex flex-col bg-blueGray-50 justify-center items-center h-full  pb-20 mt-3">
					<div className="container">
						<div className="max-w-2xl mx-auto text-center">
							<div className="max-w-md mb-8 mx-auto">
								<span
									className="text-xs py-1 px-3 text-blue-500 font-semibold bg-blue-100 rounded-xl wow animate__animated animate__fadeInDown"
									data-wow-delay=".9s"
								>
                  Contact Us
								</span>
								<h2
									className="mt-2 text-4xl font-bold font-heading wow animate__animated animate__fadeIn"
									data-wow-delay=".3s"
								>
                  We will{" "}
									<span className="text-blue-500">be glad</span> to
                  hear from you!
								</h2>
							</div>
							<ContactForm />
						</div>
					</div>
				</section>
				<Subscribe />
			</>
		</>
	);
};

export default Programs;
