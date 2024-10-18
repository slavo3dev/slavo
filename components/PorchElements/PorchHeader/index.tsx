import React, { useContext } from "react";
import UserInfoContext from "@/context/UserInfoContext";
import PorchUserButton from "../PorchInteractivity";

interface PorchHeaderProps {
  showForm: boolean;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PorchHeader: React.FC<PorchHeaderProps> = ({ showForm, setShowForm }) => {
	const { userInfo } = useContext(UserInfoContext);

	return (
		<header className="header flex flex-col w-full">
			<div className="w-full flex justify-center mb-6 text-xl md:text-2xl lg:text-3xl ">
				<h2 className="font-impact text-center">BE CONSISTENT</h2>
			</div>
			<button
				className="px-1 py-1 bg-gradient-to-br from-blue-700 via-blue-500 to-blue-800 text-white w-full sm:w-1/2 rounded-md transition h-8 hover:opacity-75"
				onClick={() => {
					(userInfo?.email)
						? setShowForm((show) => !show)
						: alert("Please log-in or Verify Your email address");
				}}
			>
				<span className="block bg-blue-50 hover:opacity-75 text-black font-bold rounded-md">{showForm ? "Close" : "Post your progress"} </span>
			</button>
		</header>
	);
};

export default PorchHeader;
