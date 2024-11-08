import { FC, useState } from 'react';
import { IoIosCloseCircleOutline } from "react-icons/io";
import { LoginForm } from '@/components/Auth/Login';
import { CreateAccount } from '@/components/Auth/CreateAccount';
import { ResetPassword } from '@/components/Auth/ResetPassword';
import { Modal } from "@/components/Modal";

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    className? : string;
}

const LoginModal: FC<LoginModalProps> = ({ isOpen, onClose, className }) => {
    const [isAccountCreated, setIsAccountCreated] = useState(true);
    const [isResetPassword, setIsResetPassword] = useState(false);
    

    const toggleState = (setStateFunction: React.Dispatch<React.SetStateAction<boolean>>) => {
        setStateFunction(prevState => !prevState);
    };

    return (
        <Modal isOpen={isOpen} className="bg-white rounded-md">
            <button onClick={onClose} className="mt-2 ml-2 text-black text-2xl pl-2">
                <IoIosCloseCircleOutline />
            </button>

            {!isResetPassword ? (
                isAccountCreated ? (
                    <LoginForm
                        signIn={() => toggleState(setIsAccountCreated)}
                        resetPassword={() => toggleState(setIsResetPassword)}
                    />
                ) : (
                    <CreateAccount
                        signIn={() => toggleState(setIsAccountCreated)}
                    />
                )
            ) : (
                <ResetPassword
                    resetPassword={() => toggleState(setIsResetPassword)}
                />
            )}
        </Modal>
    );
};

export default LoginModal;
