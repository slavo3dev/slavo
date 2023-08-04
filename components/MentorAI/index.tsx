import { FC } from "react";
import ReactTypingEffect from "react-typing-effect";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import { OpenAI } from "../OpenAI";


export const MentorAI: FC = () =>
{
	const { user } = useUser();


	return (
		<>
			<section className="bg-white text-black p-6 items-center" id='aimentor'>
				{ user?.email && user?.email_verified ?
					<OpenAI /> :
					(
						<div className="flex flex-wrap items-center mx-auto container">
							<div className="w-full lg:w-1/2 px-3">
								<div className="py-12">
									<div className="max-w-lg lg:max-w-md mx-auto lg:mx-0 mb-8 text-center lg:text-left">
										<h2 className="text-3xl lg:text-5xl mb-4 font-bold font-heading wow animate__animated animate__fadeIn">
                      Mentor for{" "}
											<span className="text-blue-500">Your</span>{" "}
                      Future & Growth
										</h2>
										<p className="text-blueGray-400 leading-relaxed wow animate__animated animate__fadeIn">
											<strong className="text-blue-500">
                                    Mentor is available 24/7! <br />
											</strong><br />
                                      If you feel stack ask about advice, suggestions... etc.</p><br />
										<p>Practice Every Day with your {" "}</p>
										<span className="typewrite d-inline text-brand">
											<ReactTypingEffect text={["FrontEnd Mentor", "Front End Mentor and learn about: HTML, CSS , JavaScript, TypeScript, React"]} />
										</span>
										<h4 className="text-blueGray-400 leading-relaxed wow animate__animated animate__fadeIn mt-3 text-xl">
                                Learn HTML, CSS, JavaScript, React, TypeScript<br/><strong>with power of ChatGPT</strong> 
										</h4>
									</div>
									<div className="text-center lg:text-left">
										<Link href={`/api/auth/${user?.email !== undefined ? "logout" : "login"}`}>
											<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline">
												{ user?.email !== undefined && user?.email_verified ? "Logout" : "Login" }
											</button>
										</Link>
										{/* <Link
									className="block hover-up-2 sm:inline-block py-4 px-8 text-xs text-blueGray-500 hover:text-blueGray-600 text-center font-semibold leading-none bg-white border border-blueGray-200 hover:border-blueGray-300 rounded wow animate__animated animate__fadeIn"
									data-wow-delay=".3s"
									href="#openai" 
								>
                                    AI Mentor
								</Link> */}
									</div>
								</div>
							</div>
							<div className="w-full lg:w-1/2 px-3 lg:bg-blueGray-10 mb-12 lg:mb-0 pb-10 md:p-2">
								<div className="flex items-center justify-center">
									<img
										className="lg:max-w-lg lg:scale-100"
										src="/images/components/team.svg"
										alt="Slavo - Consulting/Metorship Platform"
									/> 
								</div>
							</div>
						</div>
					) }
			</section>
		
		</>
       
        
	);
};