import { VideoCard } from "@/components/index";
import { VideoContext } from "@/lib/context";
import { getVideos } from "@/lib/videos";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";



const Video = ()=>{





	
	const router = useRouter();
	const context = useContext(VideoContext);
	const selectVideos= context.videoLine;
	const channelVideos= getVideos(selectVideos);
	console.log(channelVideos);

	const url= `https://www.youtube.com/embed/${router.query.videoId}?origin=http://example.com&controls=1&rel=0&disablekb=1&modestbranding=1`;
	return(
		<>
		

			<div className="w-full flex-col py-16 md:py-12 overflow-sroll">
			
				<div className=" justify-center rounded-2xl  overflow-hidden flex   outline-0  ">
					<iframe
						className="h-[480px]"
						sandbox="allow-forms allow-scripts allow-pointer-lock allow-same-origin allow-top-navigation"
						id="ytplayer"
						width="80%"
						height=""
						allowFullScreen
						allow="autoplay"
						src={url}
					></iframe>
				</div>
				
				<div className=" grid sm:grid-cols-1 pt-16  md:grid-cols-2 lg:grid-cols-4 gap-6 ">
					{channelVideos.map(
						(
							video: {
                id: string
                imgUrl: string
                title: string
                channelName: string
              },
							// eslint-disable-next-line @typescript-eslint/ban-types
							idx: {},
						) => {
							return (
								<Link
									href={`/video/${video.id}`}
									key={video.id + Math.random()}
								>
									<VideoCard
										id={idx}
										videoURL={`/video/${video.id}`}
										key={video.id}
										imgUrl={video.imgUrl}
										title={video.title}
										name={video.channelName}
									/>
								</Link>
							);
						},
					)}
				</div>



			</div>
		</>
	);

};

export default Video;