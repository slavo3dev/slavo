/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextPage } from "next";
import {Hero,FeaturedPosts,Subscribe,Growth,Solution,} from "@components";
import { getFeaturedPosts } from "@/lib/posts-lib";
import { useState } from "react";

const Home: NextPage = ({ posts }: any) => {

	const [ userEmail, setUserEmail ] = useState("");
	const [ password, setUserPassword ] = useState( "" );

	const handleOnSubmint = async () =>
	{
		const authResponse = await fetch( "api/authentication/login", {
			method: "POST", 
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email: userEmail, password: password})
		} );
        
		const result = await authResponse.json();
		alert( JSON.stringify(result) );
	};
    
	return (
		<>
			<div className="container">
				<p>Login</p>
				<input placeholder="Add your email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)}/>
				<input placeholder="Add your password" value={password} onChange={e => setUserPassword(e.target.value)} />
				<button onClick={ handleOnSubmint }>Submit</button>
				<br></br>
				<button onClick={() => fetch("api/authentication/logout")} >Logout</button>
			</div>
			<Solution />
			<Hero />
			<Subscribe />
			<FeaturedPosts posts={posts} />
			<Growth />
			<Subscribe />
		</>
	);
};

export function getStaticProps() {
	const featuredPost = getFeaturedPosts();

	return {
		props: {
			posts: featuredPost,
		},
		revalidate: 60,
	};
}

export default Home;
