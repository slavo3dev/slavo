import React, { useState, useContext } from "react";
import UserInfoContext from "@/context/UserInfoContext";
import LoginModal from "@/components/Auth/LoginPopup";
import { CardLayout } from "@/components/Layout/CardsLayout";
import { PorchComments } from "@/components/porchComments";

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
			const userVoteKey = `voted_${userInfo.email}_${porch.new_id}`;
			const hasVoted = localStorage.getItem(userVoteKey);
	  
			if (hasVoted) {
			  alert("You've already voted for this Daily Update.");
			  return;
			}
			setIsUpdating(true);

			const response = await fetch("/api/createDailyUpdate", {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					id: porch.new_id,
					vote: porch[columnName] + 1,
				}),
			});

			if (response.ok) {
				const responseData = await response.json();
				setPorchs((porchs) =>
					porchs.map((f) => (f.new_id === porch.new_id ? responseData.newUpdate[0] : f))
				);
				localStorage.setItem(userVoteKey, "true");
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
	const userVoteKey = `voted_${userInfo?.email}_${porch.new_id}`;
	const isVoteDisabled = localStorage.getItem(userVoteKey) !== null;

	return (
		<>
		<CardLayout
        	title="Daily Update"
        	porch={porch}
        	displayComment={displayComment}
        	commentText={porch.text}
        	showMore={showMore}
        	handleMore={handleMore}
        	handleVote={handleVote}
        	isUpdating={isUpdating}
        	formattedDate={formattedDate}
			isVoteDisabled={isVoteDisabled} 
			extraContent={
				<div className="py-5">
				  <PorchComments sourceId={porch.new_id} />
				</div>
			  }
      />
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
