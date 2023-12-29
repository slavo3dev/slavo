import { FC } from "react";
import supabase from "@/lib/supabase";
import { useState } from "react";
import { useRouter } from "next/router";

interface ResetPasswordProps
{
  resetPassword: () => void; 
}

export const ResetPassword: FC<ResetPasswordProps> = ( { resetPassword } ) =>
{

	const router = useRouter();
	const [email, setEmail] = useState("");
	const [errorMsg, setErrorMsg ] = useState("");
	const handlePasswordReset = async () => {
		try {
			const { data, error } = await supabase.auth.resetPasswordForEmail( email, {
				redirectTo: "https://slavo.io/update-password"
			});
			if ( error ) throw error;
			router.push("/");
			alert(`Password reset email sent!\nPlease check your: ${email}`);
			handlePasswordReset();
		} catch (error: any) {
			alert( `Password reset email sent\nPlease check your: ${ email }` );
			resetPassword();
			router.push("/");

			console.log(`<ResetPassword Request>Error Msg: ${error.message}`);
			setErrorMsg(error.message);
		}
	};
    
	return (
		<section className="py-10 bg-gray-50 sm:py-16 lg:py-24">
			<div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
				<div className="max-w-2xl mx-auto text-center">
					<h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">Reset Your Password</h2>
					<p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600">Login to your account</p>
				</div>

				<div className="relative max-w-md mx-auto mt-8 md:mt-16">
					<div className="overflow-hidden bg-white rounded-md shadow-md">
						<div className="px-4 py-6 sm:px-8 sm:py-7">
							<form action="#" method="POST">
								<div className="space-y-5">
									<div>
										<label className="text-base font-medium text-gray-900"> email </label>
										<div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
											<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
												<svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
													<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
												</svg>
											</div>

											<input
												placeholder="Enter your email" 
												value={email} 
												onChange={(e) => setEmail(e.target.value)}
												className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
											/>
										</div>
									</div>

									<div>
										<div className="flex items-center justify-between">
											<label  className="text-base font-medium text-gray-900"> </label>
											<a onClick={() => resetPassword()} className="text-sm font-medium text-orange-500 transition-all duration-200 hover:text-orange-600 focus:text-orange-600 hover:underline"> Cancel </a>
										</div>
									</div>
									{ errorMsg }
									<div>
										<button type="submit" className="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700"
											onClick={ handlePasswordReset }>
                                            Reset Password
										</button>
									</div>

									{/* <div className="text-center">
										<p className="text-base text-gray-600">Don’t have an account? <a href="#" title="" className="font-medium text-orange-500 transition-all duration-200 hover:text-orange-600 hover:underline">Create a free account</a></p>
									</div> */}
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</section>

	);
};