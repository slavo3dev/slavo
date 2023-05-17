import { VideoType } from "./types";
import { getVideos } from "./videos";
import { VideoCard } from "../components";
import { useUser } from "@auth0/nextjs-auth0/client";



export const VideoLine = (channelLine: string) => {

	const { user } = useUser();
	const isAuth = user?.email;
	const LineVideos: VideoType[] = getVideos(channelLine);

	return (
		<div className="w-screen flex flex-row">
			{LineVideos.map(
				(
					video: VideoType,
					// eslint-disable-next-line @typescript-eslint/ban-types
					idx: {},
				) => (
					<>
						<VideoCard
							id={idx}
							videoURL={isAuth ? (`/video/${video.id}`): ((""))}
							key={video.id}
							imgUrl={video.imgUrl}
							title={video.title}
							name={video.channelName}
						/>
					</>
				),
			)}
		</div>
	);
};
