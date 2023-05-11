import { NextPage } from "next";

import { VideoLine } from "@/lib/helperFunctions";


const Videos: NextPage = () => {

	const udacityVideos = VideoLine("channelOne");
	const freeCodeCampVideos = VideoLine("channelTwo");
	const webDevVideos = VideoLine("channelThree");

	return (
		<div className="p-8">
			<div>
				<h1 className="text-3xl  ml-6 font-bold font-family-jakarta text-black">Free Code Camp</h1>

				<div className="overflow-scroll overflow-y-hidden">{udacityVideos}</div>
			</div>
			<div><h1 className="text-3xl  ml-6 font-bold font-family-jakarta text-black">Udacity</h1>
				<div className="overflow-scroll overflow-y-hidden">{freeCodeCampVideos}</div>
			</div>
			<div ><h1 className="text-3xl  ml-6 font-bold font-family-jakarta text-black">WebDev Simplified</h1>
				<div className="overflow-scroll overflow-y-hidden">{webDevVideos}</div>
			</div>
		</div>
	);
};

export default Videos;