import React, { useContext } from "react";
import UserInfoContext from "@/context/UserInfoContext";
import PorchUserButton from "../PorchInteractivity";
import { MdOutlineTrendingUp } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { GoArrowLeft } from "react-icons/go";
import { Quotes } from "@/components/Quotes";


interface PorchHeaderProps {
  showForm: boolean;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PorchHeader: React.FC<PorchHeaderProps> = ({ showForm, setShowForm }) => {
	const { userInfo } = useContext(UserInfoContext);

	return (
		<header className="flex flex-col mt-1">
			<div className="flex flex-row items-center">
				<button
					className="group flex h-[1.65rem] w-[1.65rem] border mb-6 ml-0.5 border-black rounded-full justify-center items-center"
					onClick={() => {
						(userInfo?.email)
							? setShowForm((show) => !show)
							: alert("Please log-in or Verify Your email address");
					}}
				>
					<span className="flex text-black font-bold ">{showForm ? <IoMdClose/> : <MdOutlineTrendingUp/>} </span>
				</button>
				<p className="pl-2 pb-6"><GoArrowLeft /></p>
				<p className="pl-2 pb-6 text-xs">Post your <span className="font-bold text-blue-700">progress!</span></p>
			</div>
			<div className="w-full flex flex-col justify-center mb-6">
				<Quotes />
			</div>
		</header>
	);
};

export default PorchHeader;
