import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import supabase from "@/lib/supabase";

const AuthPages: NextPage = () =>
{
	const router = useRouter();
    
	const login: () => void = async () => {
		await supabase.auth.signInWithOAuth({
			provider: "github"
		});
		router.push("/");
	};
    
	const logout: () => void = async () => {
		await supabase.auth.signOut();
		await router.push("/api/auth/logout");
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