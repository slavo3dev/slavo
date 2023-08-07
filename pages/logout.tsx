import type { NextPage } from "next";
import { useEffect } from "react";
import supabase from "@/lib/supabase";
import { useRouter } from "next/router";

const Logout: NextPage = () => 
{    
	const router = useRouter();
	const logout: () => void = async () => {
		await supabase.auth.signOut();
		router.push("/");
	};
   
	useEffect(() => {
		logout(); 
	}, []);

	return <h1>Logging out</h1>;
};

export default Logout;