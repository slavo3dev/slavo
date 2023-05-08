import { NextPage } from "next";
import { Card } from "../components";

const Videos: NextPage = () => {
	return (
		<div>
			<div><h1 className="text-3xl  ml-6 font-bold font-family-jakarta text-black">Free Code Camp</h1>
				<Card/>
			</div>
			<div><h1 className="text-3xl  ml-6 font-bold font-family-jakarta text-black">Udacity</h1>
				<Card/></div>
			<div><h1 className="text-3xl  ml-6 font-bold font-family-jakarta text-black">WebDev Simplifier</h1>
				<Card/></div>
		</div>
	);
};

export default Videos;