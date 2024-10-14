import {FC, useContext, useState, MouseEvent} from 'react';
import { CiCirclePlus } from "react-icons/ci";
import { IoIosCloseCircleOutline } from "react-icons/io";
import UserInfoContext from "@/context/UserInfoContext";

interface PorchUserButtonProps {
    showUserForm: boolean;
    setShowUserForm: React.Dispatch<React.SetStateAction<boolean>>;
  }

const PorchUserButton : FC<PorchUserButtonProps> = ( { showUserForm, setShowUserForm} ) => {
    
    const { userInfo } = useContext(UserInfoContext)

    
    return (
        <div>
                <button onClick={() => {
                    (userInfo?.email) 
                        ? setShowUserForm((show: any) => !show) 
                        : alert("Please log-in or Verify Your email address")
                        
                     }}
                >
                    <span>{showUserForm ? <IoIosCloseCircleOutline className='h-8 w-8'/> : <CiCirclePlus className='h-8 w-8'/>}</span>
                </button>
        </div>
    );
}

export default PorchUserButton;
