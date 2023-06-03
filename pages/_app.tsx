import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import * as ga from "../lib/ga";
import "animate.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Layout, HeadBasePage, MainNavigation, Footer } from "../components";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import {VideoContext} from "@/lib/context/index";
function MyApp ( { Component, pageProps }: AppProps )
{
    
	const router = useRouter();
  
	useEffect(() => {
		const handleRouteChange = (url: string) => {
			ga.pageview(url);
		};
		//When the component is mounted, subscribe to router changes
		//and log those page views
		router.events.on("routeChangeComplete", handleRouteChange);

		// If the component is unmounted, unsubscribe
		// from the event with the `off` method
		return () => {
			router.events.off("routeChangeComplete", handleRouteChange);
		};
	}, [ router.events ] );
    
	const [videoLine, setVideoLine]= useState("channelOne");
	
	return (<VideoContext.Provider value={{videoLine, setVideoLine}}>
		<UserProvider>
			<Layout>
				<HeadBasePage title="Career Change: Learn Web Development for a Bright Future" />
				<MainNavigation />
				<Component { ...pageProps } />
				<Footer />
			</Layout>
		</UserProvider>
	</VideoContext.Provider>
	);
}

export default MyApp;
