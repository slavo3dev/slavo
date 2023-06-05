
export async function  twitterAPI ():Promise<any>{
  
	const endpoint="https://api.twitter.com/2/tweets/search/recent";
	const apiKey="oaEGgQXMy8HP8Cu6yUGPvQTMu";
	// const apiKeySecret="Rvpb6vxXF9B8ifyDH5nes0tysnnUCFeZdyJ1mBZDRouXxt2Gi2";
	const bearerToken="AAAAAAAAAAAAAAAAAAAAALC8ngEAAAAA4kHZXRdjZUXKrhBPESK48m4%2BkG8%3D6xeTaN6qf9wOaB5VVOKXcyyBSD6KmXZrJ7qIIgwu7qR7yNiswn";



	const response = await fetch(endpoint,{
		method:"GET",
		headers:{
			Authorization: bearerToken,
			ContentType: "application/json",
			ApiKey: apiKey,
		},
	});
	if(!response.ok){
		throw new Error("Request not succesfull");
	}

	const data = await response.json();
	return data;
}
// 		.then(response=>{
// 			if(!response.ok){
// 				throw new Error("Request failed");
// 			} return response.json;})
// 		.then(data=>{
// 			console.log(data);
// 		})
// 		.catch(error=>{
// 			console.log(error);
// 		})
// 	;

// }
