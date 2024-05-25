import React, { useState, useContext } from "react";
import UserInfoContext from "@/context/UserInfoContext";
import { isValidHttpUrl } from "@/lib/constants";
import { Loader } from "@/components/ui/Loader";
import { PorchType } from "@/Types/PorchTypes";


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

	return (
		<>
			{responseUpdate ? (
				<Loader title={responseUpdate} />
			) : (
				<form className="fact-form bg-sky-600" onSubmit={handleSubmit}>
					<input
						className="bg-gray-200 text-gray-700 appearance-none border-none w-full mr-3 py-1 px-2 leading-tight focus:outline-none"
						type="text"
						placeholder="Share your update with the world..."
						value={text}
						onChange={(e) => setText(e.target.value)}
						disabled={isUploading}
					/>
					<input
						className={
							!isValidHttpUrl(source) && source.length > 0
								? "bg-red-200 text-gray-700 border-red-800 border-2"
								: "bg-gray-200 text-gray-700"
						}
						value={source}
						type="text"
						placeholder="Share learning source..."
						onChange={(e) => setSource(e.target.value)}
						disabled={isUploading}
					/>
					<button
						className="bg-slate-100 hover:bg-blue-500 text-blue-500 font-semibold hover:text-white py-3 px-4 border border-r-2 border-blue-500 rounded shadow-md shadow-slate-300"
						disabled={isUploading}
					>
            Update
					</button>
				</form>
			)}
		</>
	);
};

export default PorchForm;
