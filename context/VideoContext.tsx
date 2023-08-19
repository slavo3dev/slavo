import { createContext } from "react";
import { videoContextType } from "@/lib/types";


const VideoContext = createContext<videoContextType>({
	videoLine:"",
	setVideoLine: function(videoLine:string):void{
		throw new Error("Error");
	}
});

export default VideoContext;