import { twitterAPI} from "@/api/twitterApi";
import { FC, useEffect, useState } from "react";

const TweetList: FC = ()=>{

	const [tweets,setTweets]= useState<any[]>([]);

	useEffect(()=>{
		const getTweets= async()=>{
			try{
				const data = await twitterAPI();
				setTweets(data);
			}
			catch(error){
				console.log(error);
			}
		};
		getTweets();
	}
	,[]);

	return (
		<div className="bg-white h-96 w-96"><iframe> {tweets.map((tweet)=>(
			<div key={tweet.id}>{tweet.id}</div>))}</iframe>
		</div>
	);

};

export default TweetList;