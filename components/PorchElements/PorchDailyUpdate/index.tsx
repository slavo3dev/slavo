import React, { useState, useContext } from "react";
import UserInfoContext from "@/context/UserInfoContext";


interface PorchType {
  id: string;
  created_at: string;
  email: string;
  text: string;
  source: string;
  excellent: number;
  [key: string]: any; 
}

interface PorchDailyUpdateProps {
  porch: PorchType;
  setPorchs: React.Dispatch<React.SetStateAction<PorchType[]>>;
}

export const PorchDailyUpdate: React.FC<PorchDailyUpdateProps> = ({ porch, setPorchs }) => {
	const [isUpdating, setIsUpdating] = useState<boolean>(false);
	const { userInfo } = useContext(UserInfoContext);

	const date = new Date(porch.created_at);
	const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
	const formattedTime = `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`;

	const handleVote = async (columnName: string) => {
		if (userInfo?.email) {
			setIsUpdating(true);
			const response = await fetch("/api/createDailyUpdate", {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					id: porch.id,
					vote: porch[columnName] + 1,
				}),
			});

			if (response.ok) {
				const responseData = await response.json();
				setPorchs((porchs) =>
					porchs.map((f) => (f.id === porch.id ? responseData.newUpdate[0] : f))
				);
				setIsUpdating(false);
			}
		} else {
			alert("Please Login or Verify email address");
		}
	};

	const commentText = porch.text;
	const [showMore, setShowMore] = useState<boolean>(false);

	const displayComment = showMore ? commentText : commentText.slice(0, 90);

	const handleMore = () => {
		setShowMore(true);
	};

	return (
		<div className="flex flex-col overflow-hidden transition-all duration-200 transform bg-white shadow group rounded-xl hover:shadow-lg hover:-translate-y-1 hover:bg-sky-100">
			<div className="flex-1 py-5 px-2 sm:p-6">
				<p className="px-1 text-base">
					<b>Daily Update</b> [
					<span className="text-sm font-medium text-gray-900">{formattedDate}</span>
					<span className="text-sm font-medium text-gray-900"> | </span>
					<span className="text-sm font-medium text-gray-900">{formattedTime}</span> ] :
					<br /><br />
					{displayComment}
					{!showMore && commentText.length > 90 && (
						<button onClick={handleMore}>... read more</button>
					)}
				</p>
				<div className="py-5 px-2 mt-auto border-gray-100 sm:px-1">
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-2">
							<a href={`mailto:${porch.email}`} title={porch.email}>
								<p className="text-sm font-medium text-gray-900">
									<b>User Email:</b> {porch.email}
								</p>
							</a>
						</div>

						<a href={porch.source.includes("http") ? porch.source : `//${porch.source}`} title="" className="" role="button" target="_blank">
							<svg className="w-5 h-5 text-blue-300 transition-all duration-200 group-hover:text-gray-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
								<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
								<line x1="17" y1="7" x2="7" y2="17"></line>
								<polyline points="8 7 17 7 17 16"></polyline>
							</svg>
						</a>
					</div>
				</div>

				<div className="p-1 text-sm text-gray-800 rounded-lg shadow-lg hover:bg-yellow-100 transition duration-300 ease-in-out">
					<a
						href={porch.source.includes("http") ? porch.source : `//${porch.source}`}
						target="_blank"
						className="text-sm hover:bg-sky-100 whitespace-normal break-words"
					>
						<b>Source:</b> {porch.source}
					</a>
				</div>

				<div className="p-2">
					<button
						className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
						onClick={() => handleVote("excellent")}
						disabled={isUpdating}
					>
            🤯 👍 {porch.excellent}
					</button>
				</div>
			</div>
		</div>
	);
};
