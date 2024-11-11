import React, { useState, useContext } from "react";
import UserInfoContext from "@/context/UserInfoContext";
import { BiLike } from "react-icons/bi";
import LoginModal from "@/components/Auth/LoginPopup";


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
	const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
	const toggleLoginModal = () => setShowLoginModal((prev) => !prev);

	const date = new Date(porch.created_at);
	const formattedDate = `${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}-${date.getFullYear()}`;
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
			setIsUpdating(false);  
			toggleLoginModal(); 
		}
	};

	const commentText = porch.text;
	const [showMore, setShowMore] = useState<boolean>(false);

	const displayComment = showMore ? commentText : commentText.slice(0, 90);

	const handleMore = () => {
		setShowMore(true);
	};

	return (
		<>
		<div className="flex flex-col overflow-hidden transition-all duration-200 transform bg-white shadow group rounded-xl hover:shadow-lg hover:-translate-y-1 hover:bg-sky-100 ">
			<div className="flex-1 py-3 px-4 sm:p-6">
				<p className="text-xl text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-500 to-blue-800">
					<b>Daily Update</b>
				</p>
				<div className="flex flex-col mt-2 border-4 border-gray-200 rounded-xl bg-gray-200">
					<a href={`mailto:${porch.email}`} title={porch.email}>
						<p className="pl-2 text-sm font-medium text-gray-900">
							<b>User Email: </b>
							<span className="whitespace-normal hover:underline">
								{porch.email}
							</span>
						</p>
					</a>
					<a
						href={
							porch.source.includes("http")
								? porch.source
								: `//${porch.source}`
						}
						target="_blank"
						className="pl-2 text-gray-900 text-sm font-medium"
					>
						<b>Source: </b>
						<span className="whitespace-normal hover:underline">
							{porch.source}
						</span>
					</a>
				</div>
				<div className="py-8 px-2 mt-auto border-gray-100 sm:px-1">
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-2">
							<p className="pl-1 text-base font-medium text-gray-900">
								{displayComment}
								{!showMore && commentText.length > 90 && (
									<button onClick={handleMore}>... read more</button>
								)}
							</p>
						</div>
					</div>
				</div>
				<div className="p-2">
					<p className="text-sm pl-1">
						<b>Likes: </b> {porch.excellent}
					</p>
					<button
						className="flex items-center gap-4 bg-gradient-to-br from-blue-700 via-blue-600 to-blue-900 rounded-xl px-8 py-1 text-md font-extrabold text-white hover:opacity-75"
						onClick={() => handleVote("excellent")}
						disabled={isUpdating}
					>
						<BiLike />
					</button>
				</div>
				<p className="pl-2 text-sm">{formattedDate}</p>
			</div>
    	</div>
		{showLoginModal && (
				<>
        		<div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-40"></div>
				<div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 rounded-lg  max-w-xl w-full p-6">
          			<LoginModal isOpen={showLoginModal} onClose={toggleLoginModal} />
        		</div>
				</>
     		)}
		</>
  );
};
