import { NextPage } from "next";
import { VideoLine } from "@/components/VideoElements";
import VideoContext from "@/context/VideoContext";
import UserInfoContext from "@/context/UserInfoContext";
import { useContext } from "react";
import { HeadBasePage } from "../components";
import Link from "next/link";

const Videos: NextPage = () => {
	const udacityVideos = VideoLine("channelOne");
	const freeCodeCampVideos = VideoLine("channelTwo");
	const webDevVideos = VideoLine("channelThree");
	const { userInfo } = useContext(UserInfoContext);
	const isAuth = userInfo?.email;

	const context = useContext(VideoContext);

	return (
		<>
			{isAuth ? (
			<>
			<HeadBasePage
				title={ "Free Web Development Videos - Learn Coding & Programming" }
				description={"Access free web development videos to learn coding and programming. Our curated video tutorials cover HTML, CSS, JavaScript, and more. Start your journey to becoming a web developer with Slavo.io!"} />
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
			</>) 
			:
			(<div className="text-center p-10 min-h-[82vh]">
    			<h1 className="text-2xl font-bold text-gray-800">Access Restricted</h1>
    			<p className="text-lg text-gray-600 mt-2">
     			 	Please <Link href="/login" className="text-blue-600 underline">log in</Link> to access our library of free web development videos.
					<br/> 
					Once logged in, you'll have full access to tutorials on HTML, CSS, JavaScript, and more!
    			</p>
  			</div>
		)}
		</>
	);
}


export default Videos;
