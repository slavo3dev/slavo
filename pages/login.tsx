/* eslint-disable no-mixed-spaces-and-tabs */
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0/client";
import { getUserData } from "@/lib/auth";

const Login: NextPage = () => {
	const router = useRouter();
	const { user } = useUser();
    
	const [ userInfo, setUserInfo ] = useState<any>(null);
    
	
	useEffect( () => {
		 const fetchData = async () => {
			const userData = await getUserData();
			setUserInfo (userData);
		};

		fetchData();
	}, []);

	return (
		<section className="h-screen">
			<div className="container h-full px-6 py-24">
				<div
					className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
					<div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
						<img
							src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
							className="w-full"
							alt="Phone image" />
					</div>
					<div className="md:w-8/12 lg:ml-6 lg:w-5/12">
						<button
							className="inline-block w-full rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
							style={ { backgroundColor: "#3b5998" } }
							onClick={ () => { 
								userInfo || user?.email ? router.push("/auth/logout") : router.push("/api/auth/login");
							}}
						>
							{userInfo || user?.email ? "logout" : "Username & Password" }
						</button>
						{ ( userInfo || user?.email) ? null :
							<>
                        	<div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-blue-800 after:mt-0.5 after:flex-1 after:border-t after:border-blue-800">
                        		<p className="mx-4 mb-0 text-center font-semibold dark:text-blue-800">OR</p>
                        	</div>
                           
                        	<a onClick={ () => router.push("/auth/login")} className="mb-3 flex w-full items-center justify-center rounded bg-primary px-7 pb-2.5 pt-3 text-center text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
							 	style={{backgroundColor: "#171515"}}
							 	href="#!"
							 	role="button"
							 	data-te-ripple-init
							 	data-te-ripple-color="light">
                        		<svg xmlns="http://www.w3.org/2000/svg"
                        			aria-label="GitHub" role="img"
                        			className="mr-2 h-4 w-4"
                        			fill="currentColor"
                        			viewBox="0 0 512 512"><rect
                        				width="512" height="512"
                        				fill="#181717"/><path fill="#fff" d="M335 499c14 0 12 17 12 17H165s-2-17 12-17c13 0 16-6 16-12l-1-44c-71 16-86-34-86-34-12-30-28-37-28-37-24-16 1-16 1-16 26 2 40 26 40 26 22 39 59 28 74 22 2-17 9-28 16-35-57-6-116-28-116-126 0-28 10-51 26-69-3-6-11-32 3-67 0 0 21-7 70 26 42-12 86-12 128 0 49-33 70-26 70-26 14 35 6 61 3 67 16 18 26 41 26 69 0 98-60 120-117 126 10 8 18 24 18 48l-1 70c0 6 3 12 16 12z"/></svg>
                                    Continue with GitHub
                        	</a> 
							</>}
					</div>
				</div>
			</div>
		</section>   
	);
};

export default Login;