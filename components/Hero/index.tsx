import { FC } from "react";
import Image from "next/image";
// import { TextEffect } from "../Elements";


export const Hero: FC = () =>
{
	return (
		<section className="flex flex-col bg-white justify-center items-center h-full p-8">
			<div
				className="hidden lg:block absolute inset-0 w-1/2 ml-auto bg-blueGray-100 z-0"
				style={{ "zIndex": "-1" }}
			></div>
			<div className="container">
				<div className="flex flex-wrap items-center -mx-3">
					<div className="w-full lg:w-1/2 px-3">
						<div className="py-12">
							<div className="max-w-lg lg:max-w-md mx-auto lg:mx-0 mb-8 text-center lg:text-left">
								<h2 className="text-3xl lg:text-5xl mb-4 font-bold font-heading wow animate__animated animate__fadeIn">
                      Committed to{" "}
									<span className="text-blue-500">People</span>{" "}
                      and the future
								</h2>
								<p className="text-blueGray-400 leading-relaxed wow animate__animated animate__fadeIn">
                      We are{" "}
									<strong className="text-blue-500">
                        slavo.io
									</strong>
                      , a Creative{" "}
									<span className="typewrite d-inline text-brand">
                                        Mentorship Platform
										{/* <TextEffect
											text1="Mentorship Program"
											text2="Consulting"
										/> */}
									</span>
								</p>
								<p className="text-blueGray-400 leading-relaxed wow animate__animated animate__fadeIn mt-3 text-sm">
                      Together, we'll shape your dream career & unlock unprecedented personal and business growth. Your future is brimming with potential !!
								</p>
							</div>
							<div className="text-center lg:text-left">
								<a
									className="tracking-wide hover-up-2 block sm:inline-block py-4 px-8 mb-4 sm:mb-0 sm:mr-3 text-xs text-white text-center font-semibold leading-none bg-blue-400 hover:bg-blue-500 rounded wow animate__animated animate__fadeIn"
									href="#key-features"
								>
                      Key Features
								</a>
								<a
									className="block hover-up-2 sm:inline-block py-4 px-8 text-xs text-blueGray-500 hover:text-blueGray-600 text-center font-semibold leading-none bg-white border border-blueGray-200 hover:border-blueGray-300 rounded wow animate__animated animate__fadeIn"
									data-wow-delay=".3s"
									href="#how-we-work"
								>
                      How We Work?
								</a>
							</div>
						</div>
					</div>
					<div className="w-full lg:w-1/2 px-3 lg:bg-blueGray-10 mb-12 lg:mb-0 pb-10">
						<div className="flex items-center justify-center">
							<Image
								className="lg:max-w-lg"
								src="/images/components/mantorship.svg"
								alt="Slavo - Consulting/Mentorship Platform"
								width={500} 
								height={300} 
								priority={true} 
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};