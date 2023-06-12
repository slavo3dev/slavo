
const apiKey=process.env.TWITTER_API_KEY;
// const bearerToken=process.env.TWITTER_BEARER_TOKEN;
const bearerToken="tnAWRA1lpYzURO42948EdcTEUM1Dw86E2vtqmIoLhinW3";
// const apiKeySecret=process.env.TWITTER_API_KEY_SECRET;
// const accessToken=process.env.ACCESS_TOKEN;
// const accessTokenSecret=process.env.ACCESS_TOKEN_SECRET;

const endpoint = "https://api.twitter.com/2/tweets/search/recent";


export async function  twitterAPI():Promise<any>{
	console.log("This is Api Key",apiKey);
	try{
		const response = await fetch(endpoint,{
			method:"GET",
			headers:{
				"User-Agent": "v2TweetLookupJS",
				"authorization": `Bearer ${bearerToken}`,
			},
		});
		if (!response.ok) {
			throw new Error("Baxd Request");
		}
		
		const data = await response.json();
		return data;
		
	} catch (error) {
		console.log(error);
		throw error;
	}
}


//try{
// 	const response = await fetch(endpoint,{
// 		method:"GET",
// 		mode:"no-cors",
// 		headers:{
// 			"User-Agent": "v2RecentSearchJS",
// 			"authorization": `Bearer ${bearerToken}`
// 		},
// 	});
// 	if(!response.ok){
// 		throw new Error("Request not succesfull");
// 	}

// 	const data = await response.json();
// 	return data;
// } catch (error) {
// 	console.log(error);
// 	throw error;
	