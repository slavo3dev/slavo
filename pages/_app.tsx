import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import * as ga from "../lib/ga";
import { GoogleAnalytics } from "@next/third-parties/google";
import "animate.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Layout, HeadBasePage, MainNavigation, Footer, Preloader } from "../components";
import VideoContext from "context/VideoContext";
import UserInfoContext from "context/UserInfoContext";
import supabase from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { SpeedInsights } from "@vercel/speed-insights/react";

function MyApp ( { Component, pageProps }: AppProps ) {
    
	const [userInfo, setUserInfo] = useState<User | null>(null);
	const router = useRouter();
	const [ loading, setLoading ] = useState( true );
    
	useEffect(() => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
		}, 700);
	}, []);
    
	const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS || ""; 
    
	useEffect( () => {
		const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
			const currentUser = session?.user || null;
			setUserInfo(currentUser);
		});
        
		//  Unsubscribe when the component unmounts
		return () => {
			authListener?.subscription?.unsubscribe();
		};
		
	}, [] );
    
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
    
	const [ videoLine, setVideoLine ] = useState( "channelOne" );
     
	const App =(
		<UserInfoContext.Provider value={ { userInfo, setUserInfo } }>
			<VideoContext.Provider value={ { videoLine, setVideoLine } }>
				<Layout>
					<HeadBasePage title="Career Change: Learn Web Development for a Bright Future" />
					<MainNavigation  />
					<Component { ...pageProps } />
					<SpeedInsights route={router.pathname} />
					<Footer />
				</Layout>
				<GoogleAnalytics gaId={GA_TRACKING_ID} />
			</VideoContext.Provider>
		</UserInfoContext.Provider>
	);
    
	const AppLoaded = !loading ? App : <Preloader />;
	
	return  AppLoaded;
}

export default MyApp;



