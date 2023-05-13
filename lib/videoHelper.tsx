import { VideoType } from "./types";
import { getVideos } from "./videos";
import { VideoCard } from "../components";

export const VideoLine = (channelLine: string) => {
	const LineVideos: VideoType[] = getVideos(channelLine);

	return (
		<div className="w-screen flex flex-row">
			{LineVideos.map(
				(
					video: {
            id: string;
            imgUrl: string;
            title: string;
            channelName: string;
          },
					// eslint-disable-next-line @typescript-eslint/ban-types
					idx: {},
				) => (
					<>
						<VideoCard
							id={idx}
							videoURL={`/video/${video.id}`}
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
