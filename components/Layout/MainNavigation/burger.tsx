import { FC, useState } from "react";

export const Burger : FC = ()=>{

	const [showDrop, setShowDrop]= useState(false);

	const handleBurger = ()=>{
		setShowDrop(!showDrop);
	};

	return <div>

		<div className="sm:hidden">
			<button onClick={handleBurger}className="navbar-burger flex items-center py-2 px-3 text-blue-500 hover:text-blue-700 rounded border border-blue-200 hover:border-blue-300">
				<svg className="fill-current h-4 w-4" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
					<path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path></svg>
			</button>
			
			<div className={showDrop ? "visible fixed ml-0 bg-black" : "hidden"}><ul className="flex-col absolute ml-0 bg-black">
				<li>One</li>
				<li>two</li>
				<li>Three</li>
				<li>Four</li>
			</ul></div>
			
			
		</div>
	</div>;
};