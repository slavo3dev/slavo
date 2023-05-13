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
		

			<div className="w-full h-screen flex-col py-16 md:py-12 overflow-sroll">
				<div className="player justify-center rounded-2xl md:h-4/6 overflow-hidden flex w-full  outline-0 ">
					<iframe
						sandbox="allow-forms allow-scripts allow-pointer-lock allow-same-origin allow-presentation allow-top-navigation"
						id="ytplayer"
						width="80%"
						height=""
						allowFullScreen
						allow="autoplay"
						src={url}
					>
					</iframe>
				</div>

				<div className=" grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
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