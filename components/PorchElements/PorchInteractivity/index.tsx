import { FC, useContext, useState, MouseEvent, useEffect } from 'react';
import { CiCirclePlus } from "react-icons/ci";
import { IoIosCloseCircleOutline } from "react-icons/io";
import UserInfoContext from "@/context/UserInfoContext";
import {LoginModal} from '@/components/Auth/LoginPopup';


interface PorchUserButtonProps {
    showUserForm: boolean;
    setShowUserForm: React.Dispatch<React.SetStateAction<boolean>>;
  }

const PorchUserButton : FC<PorchUserButtonProps> = ( { showUserForm, setShowUserForm} ) => {
    
    const { userInfo } = useContext(UserInfoContext)
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const isAuth = userInfo?.email;

    const handleButtonClick = () => {
      if (isAuth) {
        setShowUserForm((prevState) => !prevState);
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
      <div>
      <button onClick={handleButtonClick}>
        <span>
          {showUserForm ? (
            <IoIosCloseCircleOutline className="h-8 w-8" />
          ) : (
            <CiCirclePlus className="h-8 w-8" />
          )}
        </span>
      </button>
      {showLoginPopup && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-40"></div>
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 rounded-lg  max-w-xl w-full p-6">
            <LoginModal isOpen={showLoginPopup} onClose={closeLoginPopup} />
          </div>
        </>
      )}
    </div>
    );
}

export default PorchUserButton;
