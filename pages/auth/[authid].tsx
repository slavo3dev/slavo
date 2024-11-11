import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import supabase from "lib/supabase";

const AuthPages: NextPage = () =>
{
	const router = useRouter();
    
	const login: () => void = async () => {

		//const redirectUrl: string = window.location.hostname === 'localhost' ? process.env.NEXT_PUBLIC_LOCAL_HOST_URL || "" : '/'
        
		await supabase.auth.signInWithOAuth({
			provider: "github",
			//options: { redirectTo: redirectUrl, }, // Explicit redirect URL
		});
		//router.push(redirectUrl);
		router.push("/");
	};
    
	const logout: () => void = async () => {
		await supabase.auth.signOut();
		router.push("/");
	};
    
	type AuthAction = "login" | "logout";

	const authActions: Record<AuthAction, () => void> = {
		login: () => login(),
		logout: () => logout(),
	};
    
	useEffect( () => {
		const action = authActions[router.query.authid as AuthAction];
		if (action) {
			action();
		}
	}, [router.query.authid]);
    

	return (
		<h1>{router.query.authid}</h1>
	);
};


export default AuthPages;