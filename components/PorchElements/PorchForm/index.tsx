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
				<form className="border rounded-lg w-[400px] h-fit p-8 flex flex-col justify-between bg-blue-100" onSubmit={handleSubmit}>
					<div className="flex flex-col">
						<h5 className="mb-4">Progress Update</h5>
						<input
							className="bg-white border mb-4 py-1 px-2 rounded-xl text-gray-700 focus:outline-none placeholder:text-sm"
							type="text"
							placeholder="Share your update with the world..."
							value={text}
							onChange={(e) => setText(e.target.value)}
							disabled={isUploading}
						/>
						<input
							className={
								!isValidHttpUrl(source) && source.length > 0
									? "bg-red-200 text-gray-700 focus:outline-none mb-4 py-1 px-2 rounded-xl border"
									: "bg-white border mb-8 py-1 px-2 rounded-xl text-gray-700 focus:outline-none placeholder:text-sm"
							}
							value={source}
							type="text"
							placeholder="Share your learning source"
							onChange={(e) => setSource(e.target.value)}
							disabled={isUploading}
						/>
					</div>
					<div className="flex flex-col">
						<button
							className="bg-blue-50 border border-blue-700 rounded-lg hover:bg-opacity-50"
							disabled={isUploading}
						>
				Update
						</button>
					</div>
				</form>
			)}
		</>
	);
};

export default PorchForm;
