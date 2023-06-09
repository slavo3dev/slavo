import type { NextPage } from "next";
import { HeroAI } from "../components";

const Mentor: NextPage = () =>
{
    
	const handlePayments = async () =>
	{
		const res = await fetch( "api/stripe_payments", {
			method: "POST"
		} );
        
		const result = await res.json();
		console.log( "Results: ", result );
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