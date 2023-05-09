import data from "data/data-videos.json";
import { getVideosType } from "./types";

interface ObjectVideoType {
    channelOne:{
        items:[]
    }
}
export const getVideos: getVideosType = (channel)=>{
	const channelType = channel ? channel : "channelOne";
	return data[channelType as keyof ObjectVideoType].items.map(
		(item:{
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        id:any
        snippet:{
            thumbnails:{high:{url:string}}
            title: string
            channelTitle:string
        }
      })=>{
			return {
				imgUrl: item.snippet.thumbnails.high.url,
				title: item.snippet.title,
				channelName: item.snippet.channelTitle,
				id: item.id.videoId
			};
		},  
	);

};