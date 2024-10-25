/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState, useEffect, useContext } from "react";
import axios from "axios";
import { Modal } from "../Modal";
import UserInfoContext from "@/context/UserInfoContext";
import { validateEmail } from "@/lib/helpers/validateEmail";

export const Subscribe: FC<{ setBlur: (isBlurred: boolean) => void }> = ({ setBlur }) => {
	const [email, setEmail] = useState<string>("");
	const [state, setState] = useState<any>("idle");
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const { userInfo } = useContext(UserInfoContext);
	const isAuth = userInfo?.email;
	const [errorMsg, setErrorMsg] = useState<string>("");

	useEffect (() => {
		
		localStorage.removeItem("subscribeOpen");
		const subscribeModal = localStorage.getItem("subscribeOpen"); 

		if(!subscribeModal && !isAuth) {
			setIsModalOpen(true); 
			setBlur(true); 
		}
	}, [isAuth]);

	const closeSubscribe = () => {
		localStorage.setItem("subscribeOpen", "false"); 
		setIsModalOpen(false); 
		setBlur(false);
	}

	const handleSubscribe = async (e: any) => {
		e.preventDefault();

		if (!validateEmail(email)){
			setErrorMsg("Please enter a valid email address.")
		} else {
			setErrorMsg(""); 
		}

		setState("Loading");
		try {
			await axios.post("/api/subscribe", { email });
			setState("Success");
			setEmail("");
			setTimeout(() => {
				setState("idle");
				closeSubscribe(); 
			}, 4000);
		} catch (e: any) {
			//setErrorMsg(e.response.data.detail);
			if (validateEmail(email)) {
			setState("Error");
			setTimeout(() => {
				setState("idle");
			}, 900);
		}}
	};

	const subscribeForm = (
		
		<div className="flex flex-wrap p-6 justify-center">
			<div className={`flex w-full sm:w-full md:w-2/3 px-3 mb-3 md:mb-0 md:mr-6 bg-blue-500 border ${errorMsg ? 'border-red-500' : 'border-blue-300'} rounded`}>				<svg
					className="h-6 w-6 my-auto text-blue-300"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
					<path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
				</svg>
				<input
					className="w-full pl-3 py-4 before:text-xs text-white placeholder-white font-semibold leading-none bg-blue-500 outline-none"
					type="email"
					placeholder="Type your e-mail"
					onChange={(e) => setEmail(e.target.value)}
					value={email}
				/>
			</div>
			<button
				className="w-full sm:w-full md:w-auto py-4 px-8 text-xs text-blue-800 hover:text-white font-semibold leading-none border border-blue-300 hover:border-blue-300 bg-white hover:bg-blue-500 rounded transition duration-300 ease-in-out"
				type="submit"
				onClick={handleSubscribe}
			>
				{" "}
        Sign Up{" "}
			</button>
			{errorMsg && <p className="text-red-500 pt-5 text-xl">{errorMsg}</p>}
		</div>
	);

	return (
		<> 
		<Modal isOpen={isModalOpen} className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-400 rounded-lg shadow-lg max-w-xl w-full z-50">
			<div className="flex justify-end pr-2">
				<button 
					className="text-white text-xl pt-2 pr-2"
					onClick={closeSubscribe}>
						X
				</button>
				</div>
				<div className="text-center max-w-xl mx-auto w-5/6 sm:w-full md:w-full">
					<h2 className="mb-4 mt-4 text-base lg:text-3xl sm:text-3xl text-white font-bold font-heading">
						<span>Subscribe now to </span>
						<span className="text-blue-200">Our Newsletter</span>{" "}
						<br />
						<span>and get the Coupon code.</span>
					</h2>
					<p className="mb-8 text-white">
                All your information is completely confidential
					</p>
					{state === "Success" ? (
						<p className="lg:text-4xl text-white">
                Awesome, you have been subscribed to Slavo
						</p>
					) : (
						subscribeForm
					)}
				</div>
			{state === "Error" &&
            alert("Oops Something went WRONG \nPlease Try Again or You are already a member !!!" )}
		</Modal>
		</>
	);
};