import { NextPage } from "next";
import { VideoLine } from "@/components/VideoElements";
import VideoContext from "@/context/VideoContext";
import { useContext } from "react";
import { HeadBasePage } from "../components";

const Videos: NextPage = () => {
	const context = useContext(VideoContext);

	return (
		<>
			<HeadBasePage
				title={ "Free Web Development Videos - Learn Coding & Programming" }
				description={"Access free web development videos to learn coding and programming. Our curated video tutorials cover HTML, CSS, JavaScript, and more. Start your journey to becoming a web developer with Slavo.io!"} />
			<div className="p-8">
				<div>
					<h1 className="text-3xl  ml-6 font-bold font-family-jakarta text-black">Udacity</h1>
					<div className="overflow-scroll overflow-y-hidden"
						onClick={() => context.setVideoLine("channelOne")}>
						<VideoLine channelLine="channelOne" />
					</div>
				</div>
				<div>
					<h1 className="text-3xl  ml-6 font-bold font-family-jakarta text-black">Free Code Camp</h1>
					<div
						className="overflow-scroll overflow-y-hidden"
						onClick={() => context.setVideoLine("channelTwo")}>
						<VideoLine channelLine="channelTwo" />
					</div>
				</div>
				<div><h1 className="text-3xl  ml-6 font-bold font-family-jakarta text-black">WebDev Simplified</h1>
					<div
						className="overflow-scroll overflow-y-hidden"
						onClick={() => context.setVideoLine("channelThree")}>
						<VideoLine channelLine="channelThree" />
					</div>
				</div>
			</div>
		</>
	);
};

export default Videos;
