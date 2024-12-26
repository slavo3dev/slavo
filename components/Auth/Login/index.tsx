import { useState, useRef, FC } from "react";
import supabase from "lib/supabase";
import router from "next/router";
import { ErrorAlertMsg } from "@/components/Alerts";
import { REALTIME_POSTGRES_CHANGES_LISTEN_EVENT } from "@supabase/supabase-js";
import { NoUndefinedVariablesRule } from "graphql";

interface LoginProps {
    signIn: () => void
    resetPassword: () => void; 
}

export const LoginForm: FC<LoginProps>= ( { signIn, resetPassword} ) =>
{

	const userEmailRef = useRef<HTMLInputElement>(null); 
	const userPasswordRef = useRef<HTMLInputElement>(null);
	const [signInError, setSigninError] = useState<string>("");

	const signInWithEmail = async () => {
		try {
			const email = userEmailRef.current?.value || "";
			const password = userPasswordRef.current?.value || "";
			const { data, error } = await supabase.auth.signInWithPassword({
			  email,
			  password,
			});
			
			if (error) {
				setSigninError(error.message);
			} else {
				const redirectUrl = process.env.NEXT_PUBLIC_LOCAL_HOST_URL || '/'
                router.push(redirectUrl);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const signInWithGitHub = async () => {
        try {
            const redirectUrl = process.env.NEXT_PUBLIC_LOCAL_HOST_URL;
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'github', 
                options: {
                    redirectTo: redirectUrl, 
                },
            });
            if (error) {
                setSigninError(error.message);
            }
        } catch (error) {
            console.log(error);
        }
    };
	
	return (
		<>
			{ signInError && <ErrorAlertMsg title={signInError} /> }			
							<div className="px-4 py-6 sm:px-8">
								<div className="flex items-center justify-between">
									<h1 className="text-xl font-bold text-gray-900 font-pj">Sign in</h1>
									<p className="text-base font-normal text-gray-900 font-pj">Don’t have an account? <a onClick={() => signIn()} title="" className="font-bold rounded hover:underline focus:outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2">Join now</a></p>
								</div>
								<form action="#" method="POST" className="mt-12">
									<div className="space-y-4">
										<div>
											<label  className="text-base font-medium text-gray-900 font-pj"> Email </label>
											<div className="mt-2.5">
												<input
													ref={userEmailRef}
													type="email" name="" id="" placeholder="Email address" className="block w-full px-4 py-4 text-gray-900 placeholder-gray-600 bg-white border border-gray-400 rounded-xl focus:border-gray-900 focus:ring-gray-900 caret-gray-900" />
											</div>
										</div>

										<div>
											<div className="flex items-center justify-between">
												<label  className="text-base font-medium text-gray-900 font-pj"> Password </label>

												<a onClick={() => resetPassword()} className="text-base font-medium text-gray-500 rounded font-pj hover:text-gray-900 hover:underline focus:outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"> Forgot Password? </a>
											</div>
											<div className="mt-2.5">
												<input
													ref={userPasswordRef}
													type="password" name="" id="" placeholder="Password (min. 8 character)" className="block w-full px-4 py-4 text-gray-900 placeholder-gray-600 bg-white border border-gray-400 rounded-xl focus:border-gray-900 focus:ring-gray-900 caret-gray-900" />
											</div>
										</div>
  
										{/* <div className="relative flex items-center mt-4">
										<div className="flex items-center h-5">
											<input type="checkbox" name="terms" id="terms" className="w-5 h-5 text-gray-900 border-gray-300 rounded focus:ring-gray-900" />
										</div>

										<div className="ml-3 text-base">
											<label className="font-normal text-gray-900 font-pj"> Remember me </label>
										</div>
									</div> */}
									</div>

									<button
										onClick={(e) => {
											e.preventDefault();
											signInWithEmail();
										}}
										type="submit"
										className="flex items-center justify-center w-full px-8 py-4 mt-5 text-base font-bold text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 font-pj hover:bg-gray-600"
									>
                            Sign in
									</button>
								</form>

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
									role="button"onClick={signInWithGitHub}>
											Login in with Github
								</a>
							</div>
		</>
	);
};