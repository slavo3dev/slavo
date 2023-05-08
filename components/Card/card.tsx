import { FC } from "react";


export const Card : FC = ()=>{


 

	return(
		<div className="w-64 h-72 m-6 mb-0 shrink-0 transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110  duration-400">
			<img className="rounded-t-xl -mt-4 -mb-4 overflow-hidden"
				src="https://images.unsplash.com/photo-1485846234645-a62644f84728?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1340&q=80"
				width={"600"}
				height={"400"}
				alt={"Video Image"}/>
		</div>
	);
};