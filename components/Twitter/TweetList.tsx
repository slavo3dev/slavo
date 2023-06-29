// import TweetEmbed from "react-tweet-embed";

  
// export default function Tweets() {

// 	const tweetId = "1668306825140219936";

// 	return (
// 		<div>
// 			<h3>GeeksforGeeks - Tweet</h3>
// 			<TweetEmbed tweetId={tweetId}
// 				options={{theme: "dark" }}/>
				
// 		</div>
// 	);
// }




import { twitterAPI} from "@/api/twitterApi";
import { FC, useEffect, useState } from "react";

const TweetList: FC = ()=>{

	const [tweets,setTweets]= useState<any[]>([]);

	useEffect(()=>{
		const getTweets = async()=>{
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
		<div className="bg-white rounded border border-gray-300 px-6 py-4 my-4 w-full">
			<iframe> {tweets.map((tweet)=>(
				<div key={tweet.id}>{tweet.id}</div>))}
			</iframe>
		</div>
	);

};

export default TweetList;

