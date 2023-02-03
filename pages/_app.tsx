import { useEffect } from "react";
import { useRouter } from "next/router";
import * as ga from "../lib/ga";
import type { AppProps } from "next/app";
import { Layout, HeadBasePage, MainNavigation, Footer } from "../components";

// importing styles 
import "../styles/globals.css";
import "../styles/font-awesome-pro.min.css";
import "../styles/font-linea.css";
import "../styles/fonts.css";
import "../styles/swiper.css";
import React from "react";

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
    
	return (
		<Layout>
			<HeadBasePage
				title="Consulting | Mentorship Software Web Development Free Sources | SEO | Web3.0 | NFT/Crypto"
				metaDescription="My name is Slavo Popovic and I am an experienced software web engineer and freelance developer. Helping companies and individuals to build there online business, optimize websites and scale. For future Digital Nomads & Freelancers" />
			<MainNavigation />
			<Component { ...pageProps } />
			<Footer />
		</Layout>
	);
}

export default MyApp;
