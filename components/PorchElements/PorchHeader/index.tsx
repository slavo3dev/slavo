import React, { useContext } from "react";
import UserInfoContext from "@/context/UserInfoContext";
import PorchUserButton from "../PorchInteractivity";
import { MdOutlineTrendingUp } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { GoArrowLeft } from "react-icons/go";


interface PorchHeaderProps {
  showForm: boolean;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PorchHeader: React.FC<PorchHeaderProps> = ({ showForm, setShowForm }) => {
	const { userInfo} = useContext(UserInfoContext);

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
				<h5 className="font-extralight text-center text-lg italic">"Success isn't always about greatness. It's about consistency. Consistent hard work leads to success. Greatness will come."</h5>
				<p className="text-center font-bold"><span className="italic font-extralight">-</span> Dwayne Johnson</p>
			</div>
		</header>
	);
};

export default PorchHeader;
