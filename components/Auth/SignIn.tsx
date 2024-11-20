import { useRef, FC } from "react";
import supabase from "lib/supabase";
import router from "next/router";
import { routeModule } from "next/dist/build/templates/app-page";

export const SignIn: FC = () => {
	const userEmailRef = useRef<HTMLInputElement>(null);
	const userPasswordRef = useRef<HTMLInputElement>(null);
	const signInErrorRef = useRef<HTMLDivElement>(null);

	const signInWithEmail = async () => {
		try { 
			const email = userEmailRef.current?.value || ""; 
			const password = userPasswordRef.current?.value || ""; 

			const { error } = await supabase.auth.signInWithPassword({
				email,
				password
			});
			if (error) { 
				if (signInErrorRef.current) {
					signInErrorRef.current.textContent = error.message;
				} else  {
					router.push("/"); 
				}
			}
		} catch (error) {
			console.error(error); 
		}
	}
	return (
		<form className="space-y-4 md:space-y-6" action="#">
			<div>
				<label
					htmlFor="email"
					className="block mb-2 text-sm font-medium text-blue-400 "
				>
          Your email
				</label>
				<input
					ref={userEmailRef}
					type="email"
					name="email"
					id="email"
					className="text-blue-600 text-xs font-semibold sm:text-sm border-2 border-white border-b-blue-500 border-l-blue-500 rounded-bl-lg block w-full p-2.5"
					placeholder="name@company.com"
				/>
			</div>
			<div>
				<label
					htmlFor="password"
					className="block mb-2 text-sm font-medium text-blue-400 "
				>
          Password
				</label>
				<input
					ref={userPasswordRef}
					type="password"
					name="password"
					id="password"
					placeholder="••••••••"
					className="text-blue-800 sm:text-sm border-2 border-white border-b-blue-500 border-l-blue-500 rounded-bl-lg block w-full p-2.5"
				/>
				<div
					ref={signInErrorRef}
					className="text-red-600 text-sm mt-2"
				></div>
			</div>

			<button
				onClick={(e) => {
					e.preventDefault();
					signInWithEmail();
				}}
				type="submit"
				className="bg-white text-blue-700 hover:bg-blue-500 hover:text-white focus:ring-4 border-2 border-blue-700 focus:ring-blue-300 focus:outline-none rounded-md px-4 py-2 text-sm font-medium"
			>
        Sign in
			</button>
		</form>
	);
};
