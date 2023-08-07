import type { NextPage } from "next";
import { useEffect } from "react";
import supabase from "@/lib/supabase";
import { useRouter } from "next/router";

const Logtoapp: NextPage = () => 
{    
	const router = useRouter();
	const login: () => void = async () => {
		await supabase.auth.signInWithOAuth({
			provider: "github"
		});
		router.push("/");
	};
   
	useEffect(() => {
		login(); 
	}, []);

	return <h1>Logging out</h1>;
};

export default Logtoapp;