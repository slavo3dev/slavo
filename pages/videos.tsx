import { NextPage } from "next";

import { UdacitySection } from "@/lib/helperFunctions";


const Videos: NextPage = () => {

	const udacityVideos = UdacitySection();
	return (
		<div className="p-8">
			<div>
				<h1 className="text-3xl  ml-6 font-bold font-family-jakarta text-black">Free Code Camp</h1>

				<div className="overflow-scroll overflow-y-hidden">{udacityVideos}</div>
			</div>
			<div><h1 className="text-3xl  ml-6 font-bold font-family-jakarta text-black">Udacity</h1>
				<div className="overflow-scroll overflow-y-hidden">{udacityVideos}</div>
			</div>
			<div ><h1 className="text-3xl  ml-6 font-bold font-family-jakarta text-black">WebDev Simplifier</h1>
				<div className="overflow-scroll overflow-y-hidden">{udacityVideos}</div>
			</div>
		</div>
	);
};

export default Videos;