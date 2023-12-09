import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import UserInfoContext from "@/context/UserInfoContext";
import { CreateAccount } from "@/components/Auth/CreateAccount";
import { LoginForm } from "@/components/Auth/Login";

const Test: NextPage = () =>
{
	const [ isAccountCreated, setIsAccountCreated ] = useState<boolean>( true );
	const router = useRouter();
	const { userInfo } = useContext( UserInfoContext );
	const isAuth = userInfo?.email;
    
	if (isAuth) {
		console.log("This is true");
		router.push("/");
	} else {
		console.log(false);
	}
    
	const handlerForms = () =>
	{
		setIsAccountCreated(!isAccountCreated);
	};
	return (

		isAccountCreated ? 
			<LoginForm signIn={handlerForms} /> :
			<CreateAccount signIn={handlerForms} />
	);
};


export default Test;