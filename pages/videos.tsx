import { NextPage } from "next";
import { VideoLine } from "@/lib/videoHelper";
import { VideoContext } from "@/lib/context";
import { useContext } from "react";
import { HeadBasePage } from "../components";

const Videos: NextPage = () => {
	const udacityVideos = VideoLine("channelOne");
	const freeCodeCampVideos = VideoLine("channelTwo");
	const webDevVideos = VideoLine("channelThree");

	const context = useContext(VideoContext);

	return (
		<>
			<HeadBasePage
				title={"Free Videos to help you to make a Career Change: Learn Web Development for a Bright Future"}
				metaDescription="My name is Slavo Popovic and I am an experienced software web engineer, freelance developer and mentor. Helping companies and individuals to build there online business, optimize websites and scale. For future Digital Nomads & Freelancers" />
			<div className="p-8">
				<div>
					<h1 className="text-3xl  ml-6 font-bold font-family-jakarta text-black">Udacity</h1>
					<div className="overflow-scroll overflow-y-hidden"
						onClick={() => context.setVideoLine("channelOne")}>
						{udacityVideos}
					</div>
				</div>
				<div>
					<h1 className="text-3xl  ml-6 font-bold font-family-jakarta text-black">Free Code Camp</h1>
					<div
						className="overflow-scroll overflow-y-hidden"
						onClick={() => context.setVideoLine("channelTwo")}>
						{freeCodeCampVideos}
					</div>
				</div>
				<div><h1 className="text-3xl  ml-6 font-bold font-family-jakarta text-black">WebDev Simplified</h1>
					<div
						className="overflow-scroll overflow-y-hidden"
						onClick={() => context.setVideoLine("channelThree")}>
						{webDevVideos}
					</div>
				</div>
			</div>
		</>
	);
};

export default Videos;
