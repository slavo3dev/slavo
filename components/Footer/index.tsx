import { FC } from "react";
import React from "react";
import Image from "next/image";

export const Footer:FC = () => {
	return (
		<>
			<section className="py-2 bg-gray-300">
				<div
					className="container px-4 mx-auto wow animate__animated animate__fadeIn"
					data-wow-delay=".3s"
				>
					{/* <div className="flex flex-wrap mb-12 lg:mb-20 -mx-3 text-center lg:text-left">
						<div className="w-full lg:w-1/5 px-3 mb-6 lg:mb-0">
							<Link href="/">
								<a className="inline-block mx-auto lg:mx-0 text-3xl font-semibold leading-none">
									<img
										className="h-20"
										src={"/images/logo/slavotrasnperent.svg"}
										alt="slavo.io software development Logo"
									/>
								</a>
							</Link>
						</div>
						<div className="w-full lg:w-2/5 px-3 mb-8 lg:mb-0">
							<p className="max-w-md mx-auto lg:max-w-full lg:mx-0 lg:pr-32 lg:text-lg text-blueGray-400 leading-relaxed">
                Helping you <strong>maximize</strong> your personal
                growth!
							</p>
						</div> */}
					{/* <div className="w-full lg:w-1/5 px-3 mb-8 lg:mb-0">
							<p className="mb-2 lg:mb-4 lg:text-lg font-bold font-heading text-blueGray-800">
                Office
							</p>
							<p className="lg:text-lg text-blueGray-400">
                151 SE 1st Street
								<br /> Miami FL
							</p>
						</div> */}
					{/* <div className="w-full lg:w-1/5 px-3">
							<p className="mb-2 lg:mb-4 lg:text-lg font-bold font-heading text-blueGray-800">
                Contacts
							</p>
							<p className="lg:text-lg text-blueGray-400">
								<a href="tel:786-702-4261">+1-305-560-0950</a>
							</p>
							<p className="lg:text-lg text-blueGray-400">
                slavo@slavo3.com
							</p>
						</div> */}
					{/* </div> */}
					<div className="flex flex-col lg:flex-row items-center lg:justify-between">
						<p className="text-sm text-blue-800">
                            &copy;{new Date().getFullYear()}. All rights reserved. Designed by{" "}
							<a
								className="text-blue-800"
								href="https://www.prototypenext.com"
								target="_blank"
								rel="noreferrer"
							>
                Prototype.NEXT
							</a>
						</p>
						<div className="order-first lg:order-last -mx-2 mb-4 lg:mb-0">
							{/* <a
								className="inline-block px-2"
								href="https://www.facebook.com/slavo.io software development"
							>
								<img
									src={"/assets/imgs/icons/facebook-blue.svg"}
									alt="slavo.io software development - Consulting "
								/>
							</a> */}
							<a  className="inline-block px-2"
								href="https://twitter.com/slavo3dev"
								target="_blank"
							>
								<img
									src={"/images/icons/twitter-blue.svg"}
									alt="slavo.io software development - Consulting"
								/>
							</a>
							<a  className="inline-block px-2"
								href="https://www.instagram.com/slavo_3/"
								target="_blank"
							>
								<img
									src={"/images/icons/instagram-blue.svg"}
									alt="slavo.io software development - Consulting "
								/>
							</a>
							<a  className="inline-block px-2"
								href="https://www.linkedin.com/in/slavopopovic/"
							>
								<Image src={"/images/icons/linkedin-circled-48.png"}
									alt="slavo.io software development - Consulting "
									width={ 22 }
									height={ 22 }
								/>
							</a>
							{/* <a
								className="inline-block px-2"
								href="https://www.instagram.com/slavo.io software development/"
							>
								<img
									src={"/assets/imgs/icons/instagram-blue.svg"}
									alt="slavo.io software development - Consulting "
								/>
							</a> */}
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

