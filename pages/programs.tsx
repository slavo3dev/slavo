import React from "react";
import type { NextPage } from "next";
// import Layout from "../components/layout/Layout";
import { Subscribe, ContactForm, CounterUp, PricingSection, FeaturesSection, StatisticsSection } from "@components";
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
            
			<Breadcrumb 
			items={[
				{ label: "Home", href: "/" },
				{ label: "Programs", href: "/programs" },
				{ label: "Career Change / Become a Freelancer / Business Growth / Digital Nomad..." }
			]}
			/>
	
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
				
				<StatisticsSection />
	  	                    
				<FeaturesSection />

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
