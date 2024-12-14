import { useContext, useState, useEffect } from "react";
import UserInfoContext from "@/context/UserInfoContext";
import { MdOutlineTrendingUp } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import LoginModal from "@/components/Auth/LoginPopup";
import { GoArrowLeft } from "react-icons/go";
import { QuoteFetcher } from "@/components/Quotes";

interface PorchHeaderProps {
  showForm: boolean;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PorchHeader: React.FC<PorchHeaderProps> = ({ showForm, setShowForm }) => {
	const { userInfo } = useContext(UserInfoContext);
	const [showLoginPopup, setShowLoginPopup] = useState(false);
    const isAuth = userInfo?.email;

	const handleButtonClick = () => {
		if (isAuth) {
		  setShowForm((prevState) => !prevState);
		} else {
		  setShowLoginPopup(true);
		}
	  };
  
	   const closeLoginPopup = () => {
		setShowLoginPopup(false);
	  };
  
	  useEffect(() => {
		if (isAuth) {
		  setShowLoginPopup(false);
		}
	  }, [isAuth]);

	return (
		<header className="flex flex-col mt-1">
			<div className="flex flex-row items-center">
				<button
					className="group flex h-[1.65rem] w-[1.65rem] border mb-6 ml-0.5 border-black rounded-full justify-center items-center"
					onClick={handleButtonClick}>
					<span className="flex text-black font-bold ">{showForm ? <IoMdClose/> : <MdOutlineTrendingUp/>} </span>
				</button>
				{showLoginPopup && (
        		<>
          		<div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-40"></div>
          		<div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 rounded-lg  max-w-xl w-full p-6">
            	<LoginModal isOpen={showLoginPopup} onClose={closeLoginPopup} />
          	</div>
        		</>
      			)}
			<p className="pl-2 pb-6"><GoArrowLeft /></p>
			<p className="pl-2 pb-6 text-xs">Post your <span className="font-bold text-blue-700">progress!</span></p>
			</div>
			<div className="w-full flex flex-col justify-center mb-6">
				<QuoteFetcher />
			</div>
		</header>
	);
};

export default PorchHeader;
