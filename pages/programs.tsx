import React from "react";
import type { NextPage } from "next";
// import Layout from "../components/layout/Layout";
import { Subscribe, ContactForm, PricingSection,  HeadBasePage, Breadcrumb, ProgramsInfoSection, CounterSection } from "@components";
import Head from "next/head";
//import Stripe from "stripe";
import { GetStaticProps } from "next";

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
				<ProgramsInfoSection/>
				<CounterSection />
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
