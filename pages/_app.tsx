import { useEffect, useState, useRef, useMemo } from "react";
import { useRouter } from "next/router";
import * as ga from "../lib/ga";
import { GoogleAnalytics } from "@next/third-parties/google";
import { SpeedInsights } from '@vercel/speed-insights/next';
import "animate.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Layout, HeadBasePage, MainNavigation, Footer, Preloader } from "../components";
import VideoContext from "context/VideoContext";
import UserInfoContext from "context/UserInfoContext";
import supabase from "lib/supabase";
import { User } from "@supabase/supabase-js";
import { SmallRouteLoader } from "../components/SmallRouteLoader";
import { GetServerSideProps } from "next";



function MyApp ( { Component, pageProps }: AppProps ) {
    
	const [userInfo, setUserInfo] = useState<User | null>(null);
	const router = useRouter();
	const [firstLoad, setFirstLoad] = useState(true);
	const [routeLoading, setRouteLoading] = useState(false);
	const [categories, setCategories] = useState<string[]>([]);

	const routeTimerRef = useRef<NodeJS.Timeout | null>(null);
    
	useEffect(() => {
    const t = setTimeout(() => setFirstLoad(false), 700);
    return () => clearTimeout(t);
  }, []);

    
	const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS || ""; 
    
	useEffect( () => {
		const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
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

	useEffect(() => {
		const fetchCategories = async () => {
		  try {
			const response = await fetch("/api/categories");
			if (!response.ok) throw new Error("Failed to fetch categories");
			const data = await response.json();
			setCategories(data);
		  } catch (error) {
			console.error("Error fetching categories:", error);
		  }
		};
	  
		fetchCategories();
	  }, []);

	useEffect(() => {

		if (firstLoad) return;

    const start = () => {
      routeTimerRef.current = setTimeout(() => {
        setRouteLoading(true);
      }, 200);
    };

    const stop = () => {
      if (routeTimerRef.current) clearTimeout(routeTimerRef.current);
      setRouteLoading(false);
    };

    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", stop);
    router.events.on("routeChangeError", stop);

    return () => {
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", stop);
      router.events.off("routeChangeError", stop);
    };
  }, [router]);

	const userInfoValue = useMemo(
    () => ({ userInfo, setUserInfo }),
    [userInfo]
  );

  const videoValue = useMemo(
    () => ({ videoLine, setVideoLine }),
    [videoLine]
  );

	if (firstLoad) {
		return <Preloader />; 
	}

	     
	return (
  <>
    {routeLoading && <SmallRouteLoader />} 
    <UserInfoContext.Provider value={ userInfoValue }>
      <VideoContext.Provider value={ videoValue }>
        <Layout>
          <HeadBasePage title="Career Change: Learn Web Development for a Bright Future" />
          <MainNavigation categories={categories} />
          <Component {...pageProps} />
          <SpeedInsights />
          <Footer />
        </Layout>
        <GoogleAnalytics gaId={GA_TRACKING_ID} />
      </VideoContext.Provider>
    </UserInfoContext.Provider>
  </>
);
    
	}






