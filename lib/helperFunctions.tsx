import { VideoType } from "./types";
import { getVideos } from "./videos";
import { Card } from "../components";


export const UdacitySection=()=>{


	const UdacityVideos: VideoType[]= getVideos("channelTwo");

	return (
		<div className="overflow-x-scroll w-screen flex flex-row">
			{UdacityVideos.map((
				video:{
                    id:string,
                    imgUrl:string,
                    title:string,
                    channelName:string;
                },
				// eslint-disable-next-line @typescript-eslint/ban-types
				idx:{},
			)=>{
				return(
					<Card
						id={idx}
						key={video.id}
						imgUrl={video.imgUrl}
						title={video.title}
						name={video.channelName}
					/>
				);
			}          
			)}
		</div>
	);

};