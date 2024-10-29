import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import UserInfoContext from "@/context/UserInfoContext";
import { CreateAccount } from "@/components/Auth/CreateAccount";
import { ResetPassword } from "@/components/Auth/ResetPassword";
import { LoginForm } from "@/components/Auth/Login";
import { BlurWrapper } from "../components";

const Test: NextPage = () =>
{
	const [ isAccountCreated, setIsAccountCreated ] = useState<boolean>( true );
	const [ isResetPassword, setIsResetPassword ] = useState<boolean>( false );
	const router = useRouter();
	const { userInfo } = useContext( UserInfoContext );
	const isAuth = userInfo?.email;
    
	if (isAuth) {
		router.push("/");
	} else {
		console.log(false);
	}
    
	const toggleState = (setStateFunction: ( arg0: ( prevState: boolean ) => boolean ) => void) => {
		setStateFunction((prevState: boolean) => !prevState);
	};
    
	return (
			<BlurWrapper>
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
			</BlurWrapper>
		);
	};

export default Test;