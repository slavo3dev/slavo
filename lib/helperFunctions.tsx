import { VideoType } from "./types";
import { getVideos } from "./videos";
import { VideoCard } from "../components";
import Link from "next/link";
import testImage from "@/public/images/post-img/getting-started-nextjs.png";

export const UdacitySection=()=>{

	

	const UdacityVideos: VideoType[]= getVideos("channelTwo");

	return (
		<div className="w-screen flex flex-row">
			{UdacityVideos.map((
				video:{
                    id:string,
                    imgUrl:string,
                    title:string,
                    channelName:string;
                },
				// eslint-disable-next-line @typescript-eslint/ban-types
				idx:{},
			) => 
				<Link key={video.id + Math.random()} href={""}>
					<>
						<VideoCard
							id={idx}
							videoURL={`/video/${video.id}`}
							key={video.id}
							imgUrl={video.imgUrl}
							title={video.title}
							name={video.channelName}
						/></>

				</Link>       
			)}
		</div>

	);

};