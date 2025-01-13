import React, { useState, useContext } from "react";
import UserInfoContext from "@/context/UserInfoContext";
import { isValidHttpUrl } from "lib/constants";
import { Loader } from "@/components/ui/Loader";
import { PorchType } from "@/Types/PorchTypes";
import { trackEvent } from "lib/ga";


interface PorchFormProps {
  setPorchs: React.Dispatch<React.SetStateAction<PorchType[]>>;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PorchForm: React.FC<PorchFormProps> = ({ setPorchs, setShowForm }) => {
	const [text, setText] = useState<string>("");
	const [source, setSource] = useState<string>("");
	const [isUploading, setIsUploading] = useState<boolean>(false);
	const [responseUpdate, setResponseUpdate] = useState<string>("");

	const { userInfo } = useContext(UserInfoContext);

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (text && isValidHttpUrl(source)) {
			const payload = { text, source, email: userInfo?.email };
			setIsUploading(true);

			try {
				const response = await fetch("/api/createDailyUpdate", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(payload),
				});

				if (response.ok) {
					const responseData = await response.json();
					setResponseUpdate( responseData.ticket );
        
					setPorchs((porchs: PorchType[]) => [responseData.newUpdate[0], ...porchs]);
					trackEvent( {
						action: "click",
						category: "button",
						label: "new-porch-update-button",
						value: 1,
					} );
					setTimeout(() => {
						setText("");
						setSource("");
						setIsUploading(false);
						setShowForm(false);
						setResponseUpdate("");
					}, 500);
				} else {
					console.error("Error: ", response.status, response.statusText);
				}
			} catch (error) {
				console.error("Request failed: ", error);
			}
		} else {
			alert(
				`The submission was unsuccessful. Please ensure all text fields are filled correctly, and your URL is valid. Double-check your entries and try again!\n Your input: \n source: ${source}\n text: ${text}`
			);
		}
	}

	// !!!
	// Fix styles for Porch Form
	return (
		<>
			{responseUpdate ? (
				<Loader title={responseUpdate} />
			) : (
				<div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
					<div className="relative bg-gray-300 rounded-lg w-full max-w-lg p-9 shadow-lg shadow-gray-100 transition-all">
					<button onClick={() => setShowForm(false)} 
							className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
							&times;
						</button>
					<form className="flex flex-col" onSubmit={handleSubmit}>
						<div className="flex flex-col">
						<h5 className="mb-4 text-xl font-semibold text-gray-700">Progress Update</h5>
						<input
							className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white placeholder:text-sm"
							type="text"
							placeholder="Share your update with the world..."
							value={text}
							onChange={(e) => setText(e.target.value)}
							disabled={isUploading}
						/>
						<input
							className={
								!isValidHttpUrl(source) && source.length > 0
									? "appearance-none block w-full bg-red-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
									: "appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white placeholder:text-sm"
							}
							value={source}
							type="text"
							placeholder="Provide your learning resource URL..."
							onChange={(e) => setSource(e.target.value)}
							disabled={isUploading}
						/>
					</div>
					<div className="flex items-center justify-center">
				  <button
					className="bg-gray-500 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded w-1/3"
					disabled={isUploading}>
					Update
				  </button>
				</div>
				</form>
				</div>
			</div>	
			)}
		</>
	);
};

export default PorchForm;
