import supabase from "lib/supabase";
import { useState, FC } from "react";
import { useRouter } from "next/router";

interface CreateAccountProps {
  signIn: () => void; 
}

export const CreateAccount: FC<CreateAccountProps> = ( { signIn }  ) =>
{
	const router = useRouter();
	const [newUserEmail, setNewUserEmail] = useState<string>("");
	const [newUserPassword, setNewUserPassword] = useState<string>("");
	const [signUpError, setSignUpError] = useState<string>("");
	const [emailConfirmationSent, setEmailConfirmationSent] =
    useState<boolean>(false);
	const [matchingPassword, setMatchingPassword] =
    useState<string>("");

	const signUpWithEmail = async () => {
		try {
			const { data, error } = await supabase.auth.signUp({
				email: newUserEmail,
				password: newUserPassword,
			});
			console.log(newUserEmail);
			console.log(newUserPassword);
			if (error) {
				let customMessage;
				if (error.message === "User already registered") {
					customMessage = "There is already an account registered with this email."
				} else {
					console.log('This is the Error:', error.message)
					customMessage = "The email or password given is not valid. Please try again. "
				}

				setSignUpError(customMessage);
			} else {
				console.log(`"Sign up successful"`);
				const user = JSON.stringify(data);
				console.log(user)
				setEmailConfirmationSent(true);
				setTimeout(() => {
					router.push('/')
				}, 3000);
			}
		} catch (error) {
			console.log("Error during signUp: ", error);
		}
	};
    

	const CongratsMessage = (   
		<div className="flex min-h-screen flex-col">
			<div className="bg-[#365CCE] min-h-screen text-white flex py-20 justify-center gap-5">
				<div className="flex flex-col gap-3">
					<div className="text-center text-sm sm:text-xl tracking-widest font-normal">
						THANKS FOR SIGNING UP!
					</div>
					<div className="text-xl sm:text-3xl text-center tracking-wider font-bold capitalize">
						Check your email to verify account. 
					</div>
					<div className="text-sm sm:text-md text-center font-bold capitalize text-slate-300">
					You will be redirected to  the home page soon. 	
					</div>
				</div>
			</div>
		</div>
	);

	return (
		<>
			{emailConfirmationSent ? CongratsMessage : (
								<div className="px-4 py-6 sm:px-8 sm:py-7">
									<form action="#" method="POST">
										<div className="space-y-5">
											<div>
												<label className="text-base font-medium text-gray-900"> Email address </label>
												<div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
													<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
														<svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
															<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
														</svg>
													</div>

													<input
														onChange={(e) => {
															setNewUserEmail(e.target.value);
														}}
														type="email"
														name="email"
														id="email"
														placeholder="Enter email to get started"
														className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
													/>
												</div>
											</div>

											<div>
												<label className="text-base font-medium text-gray-900"> Password </label>
												<div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
													<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
														<svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
															<path
																stroke-linecap="round"
																stroke-linejoin="round"
																stroke-width="2"
																d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
															/>
														</svg>
													</div>

													<input
														onChange={(e) => {
															setNewUserPassword(e.target.value);
														}}
														type="password"
														name="password"
														id="password"
														placeholder="Enter your password"
														className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
													/>
												</div>
											</div>
											
											<div>
												<label className="text-base font-medium text-gray-900"> Confirm Password </label>
												<div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
													<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
														<svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
															<path
																stroke-linecap="round"
																stroke-linejoin="round"
																stroke-width="2"
																d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
															/>
														</svg>
													</div>

													<input
														onChange={(e) => {
															setMatchingPassword(e.target.value);
														}}
														type="password"
														name="match"
														id="match"
														placeholder="Confirm Password"
														className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
													/>
												</div>
											</div>

											<div className="flex items-center">
												<input type="checkbox" name="agree" id="agree" className="w-5 h-5 text-green-500 bg-white border-gray-200 rounded" checked />

												<label className="ml-3 text-sm font-medium text-gray-500">
											I agree to Postcraft’s <a href="#" title="" className="text-blue-600 hover:text-blue-700 hover:underline">Terms of Service</a> and <a href="#" title="" className="text-blue-600 hover:text-blue-700 hover:underline">Privacy Policy</a>
												</label>
											</div>
											<div className="text-red-500 italic flex justify-center text-md">
												{signUpError}						
											</div>
											<div>
												<button type="submit" className="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700"
													onClick={(e) => {
														e.preventDefault();
														if (matchingPassword == newUserPassword) {
															signUpWithEmail();
														} else {
															setSignUpError("Passwords do not match.");
														}
													}}>
											Create account
												</button>
												<svg className="w-auto h-4 mx-auto mt-8 text-gray-300" viewBox="0 0 172 16" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
													<line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 11 1)" />
													<line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 46 1)" />
													<line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 81 1)" />
													<line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 116 1)" />
													<line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 151 1)" />
													<line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 18 1)" />
													<line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 53 1)" />
													<line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 88 1)" />
													<line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 123 1)" />
													<line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 158 1)" />
													<line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 25 1)" />
													<line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 60 1)" />
													<line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 95 1)" />
													<line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 130 1)" />
													<line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 165 1)" />
													<line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 32 1)" />
													<line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 67 1)" />
													<line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 102 1)" />
													<line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 137 1)" />
													<line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 172 1)" />
													<line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 39 1)" />
													<line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 74 1)" />
													<line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 109 1)" />
													<line y1="-0.5" x2="18.0278" y2="-0.5" transform="matrix(-0.5547 0.83205 0.83205 0.5547 144 1)" />
												</svg>

												<a
													href="#"
													title=""
													className="
									flex
									items-center
									justify-center
									w-full
									px-8
									py-4
									mt-8
									text-base
									font-bold
									text-gray-900
									transition-all
									duration-200
									bg-gray-100
									border border-transparent
									rounded-xl
									hover:bg-gray-200
									focus:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200
									font-pj"
													role="button" onClick={() => router.push("/auth/login")}>
													Login in with Github
												</a>
											</div>
										
											<div className="text-center">
												<p className="text-base text-gray-600">Already have an account? <a onClick={() => signIn()} className="font-medium text-orange-500 transition-all duration-200 hover:text-orange-600 hover:underline">Login here</a></p>
											</div>
										</div>
									</form>
								</div>
			)}
		</>
	);
};