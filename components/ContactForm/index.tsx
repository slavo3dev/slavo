/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, FC } from "react";
import { saveContactData } from "@/lib/savecontactdata";
import { notificationStatus } from "@/lib/notificationStatus";
import { Notification } from "../Notification";

export const ContactForm: FC= () => {
	const [payload, setPayload] = useState({
		email: "",
		subject: "No Subject",
		message: "No Message",
		department: "",
		name: "No Name",
		terms: "none"
	});
	const [reqStatus, setReqStatus] = useState<any>();
	// const [reqError, setReqError] = useState<any>();

	useEffect(() => {
		if (reqStatus === "success" || reqStatus === "error") {
			const timer = setTimeout(() => {
				setReqStatus(null);
				// setReqError(null);
			}, 2000);

			return () => clearTimeout(timer);
		}
	}, [reqStatus]);

	const sendPayload = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, data: any) => {
		e.preventDefault();

		setReqStatus("pending");

		const res: any = await saveContactData(data);

		if (res.data.message === "Succesfuly Stored") {
			setReqStatus("success");
		} else {
			setReqStatus("error");
			// setReqError(null);
		}
	};

	const notification: any | {
        status: string, 
        title: string, 
        message: string 
    } = notificationStatus( reqStatus );

	const isValidEmail = (email: string) => {
		// eslint-disable-next-line no-useless-escape
		const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
		return emailReg.test(email);
	};
    
	console.log("Terms: ", payload.terms);

	return (
		<>
			<div
				className="mb-4 text-sm wow animate__animated animate__fadeIn animated"
				data-wow-delay=".1s"
			>
				<span className="mr-4 font-semibold">Departament:</span>
				<label className="mr-4">
					<input
						className="mr-1"
						type="radio"
						name="department"
						value="Consulting"
						onChange={(e) =>
							setPayload((prevState: any) => ({
								...prevState,
								department: e.target.value,
							}))
						}
					/>
					<span>Consulting</span>
				</label>
				<label>
					<input
						className="mr-1"
						type="radio"
						name="department"
						value="Support"
						onChange={(e) =>
							setPayload((prevState: any) => ({
								...prevState,
								department: e.target.value,
							}))
						}
					/>
					<span>Support</span>
				</label>
			</div>
			<div
				className="flex flex-wrap mb-4 -mx-3 wow animate__animated animate__fadeIn animated"
				data-wow-delay=".3s"
			>
				<div className="w-full lg:w-1/2 px-3 mb-4 lg:mb-0">
					<div className="mb-4">
						<input
							className="w-full p-4 text-xs font-semibold leading-none bg-blueGray-50 rounded outline-none"
							type="text"
							placeholder="Subject"
							onChange={(e) =>
								setPayload((prevState: any) => ({
									...prevState,
									subject: e.target.value,
								}))
							}
						/>
					</div>
					<div className="mb-4">
						<input
							className="w-full p-4 text-xs font-semibold leading-none bg-blueGray-50 rounded outline-none"
							type="text"
							placeholder="Name"
							onChange={(e) =>
								setPayload((prevState: any) => ({
									...prevState,
									name: e.target.value,
								}))
							}
						/>
					</div>
					<div className="mb-4">
						<input
							className="w-full p-4 text-xs font-semibold leading-none bg-blueGray-50 rounded outline-none"
							type="email"
							placeholder="name@example.com"
							style={{
								border: payload.email
									? !isValidEmail(payload?.email)
										? "1px solid red"
										: "none"
									: "none",
							}}
							onChange={(e) =>
								setPayload((prevState: any) => ({
									...prevState,
									email: e.target.value,
								}))
							}
						/>
					</div>
					{/* <div>
            <label className="flex px-2 bg-blueGray-50 rounded">
              <input
                className="hidden"
                type="file"
                name="Choose file"
              />
              <span className="my-1 ml-auto px-4 py-3 text-xs text-white font-semibold leading-none bg-blueGray-500 hover:bg-blueGray-600 rounded cursor-pointer">
                {" "}
                Browse
              </span>
            </label>
          </div> */}
				</div>
				<div className="w-full lg:w-1/2 px-3">
					<textarea
						className="w-full h-full p-4 text-xs font-semibold leading-none resize-none bg-blueGray-50 rounded outline-none"
						placeholder="Message..."
						onChange={(e) =>
							setPayload((prevState: any) => ({
								...prevState,
								message: e.target.value,
							}))
						}
					></textarea>
				</div>
			</div>
			<div className="flex justify-between items-center">
				<label>
					<input
						className="mr-1"
						type="checkbox"
						name="terms"
						value="accept"
						onChange={(e) =>
							setPayload((prevState: any) => ({
								...prevState,
								terms: e.target.value,
							}))
						}
					/>
					<span className="text-sm font-semibold">
            I agree to terms and conditions.
					</span>
				</label>
				<button
					className="py-4 px-8 text-sm text-white font-semibold leading-none bg-blue-400 hover:bg-blue-500 rounded"
					// type="submit"
					onClick={(e) => {
						payload?.terms === "accept" && isValidEmail( payload.email ) && payload?.department
							? sendPayload( e, payload )
							: alert( `Please check: 
                                ${ !isValidEmail( payload.email ) && "eMail is not Valid, " } 
                                ${ payload.terms !== "accept" ? "You need to Accept Terms, ": "" }
                                ${!payload.department ? "Please Choose Deparment" : "" }`
								, );
					} } >
                    Submit
				</button>
			</div>
			{notification && (
				<Notification
					status={notification.status || "Status"}
					title={notification.title || "title"}
					message={notification.message || "message"}
				/>
			)}
		</>
	);
};