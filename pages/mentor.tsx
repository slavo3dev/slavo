import type { NextPage } from "next";
import { HeroAI } from "../components";
import { useUser } from "@auth0/nextjs-auth0/client";

const Mentor: NextPage = () =>
{
    
	const email: string | undefined | null = useUser()?.user?.email;
    
	const handlePayments = async () =>
	{
		const res = await fetch( "api/stripe_payments", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
 
			},
			body: JSON.stringify({
				email: email
			})
		},
		);
        
		const result = await res.json();
		window.location.href = result.session.url;
	};
    
	return (
		<>
			<h1 onClick={handlePayments}>Subsribe to Mantorship Program</h1>
			<HeroAI />
		</>   
	);
};


export default Mentor;