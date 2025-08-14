import { useContext, FC } from "react";
import { VideoType } from "../../../lib/types";
import { getVideos } from "../../../lib/videos";
import { VideoCard } from "../..";
import UserInfoContext from "@/context/UserInfoContext";

interface VideoLineProps {
	channelLine: string;
}

export const VideoLine: FC<VideoLineProps> = ({ channelLine }) => {
	const { userInfo } = useContext(UserInfoContext);
	const isAuth = userInfo?.email;
	const LineVideos: VideoType[] = getVideos(channelLine);

	return (
		<div className="w-screen flex flex-row">
			{LineVideos.map(
				(
					video: VideoType,
					// eslint-disable-next-line @typescript-eslint/ban-types
					idx: {},
				) => (
					<VideoCard
						key={video.id}
						id={idx}
						videoURL={isAuth ? (`/video/${video.id}`): ((""))}
						imgUrl={video.imgUrl}
						title={video.title}
						name={video.channelName}
					/>
				),
			)}
		</div>
	);
};
