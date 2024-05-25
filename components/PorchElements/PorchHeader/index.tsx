import React, { useContext } from "react";
import UserInfoContext from "@/context/UserInfoContext";

interface PorchHeaderProps {
  showForm: boolean;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PorchHeader: React.FC<PorchHeaderProps> = ({ showForm, setShowForm }) => {
	const { userInfo } = useContext(UserInfoContext);

	return (
		<header className="header">
			<div className="logo">
				<h2>Consistently conquer</h2>
			</div>

			<button
				className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
				onClick={() => {
					(userInfo?.email)
						? setShowForm((show) => !show)
						: alert("Please log-in or Verify Your email address");
				}}
			>
				{showForm ? "Close" : "Post Your Progress"}
			</button>
		</header>
	);
};

export default PorchHeader;
