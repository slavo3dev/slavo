import { useEffect, useState, useRef, useMemo } from "react";
import { useRouter } from "next/router";
import * as ga from "../lib/ga";
import { GoogleAnalytics } from "@next/third-parties/google";
import { SpeedInsights } from "@vercel/speed-insights/next";

import "../styles/globals.css";
import "animate.css";

import type { AppProps } from "next/app";
import { Layout, HeadBasePage, MainNavigation, Footer, Preloader } from "../components";
import { SmallRouteLoader } from "../components/SmallRouteLoader";

import VideoContext from "context/VideoContext";
import UserInfoContext from "context/UserInfoContext";

import supabase from "lib/supabase";
import { User } from "@supabase/supabase-js";


function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [videoLine, setVideoLine] = useState("channelOne");

  const [firstLoad, setFirstLoad] = useState(true);
  const [routeLoading, setRouteLoading] = useState(false);

  const routeTimerRef = useRef<NodeJS.Timeout | null>(null);

  const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS || "";

  // ----------------------------------------------------
  // 1. First-load preloader timeout
  // ----------------------------------------------------
  useEffect(() => {
    const timeout = setTimeout(() => setFirstLoad(false), 700);
    return () => clearTimeout(timeout);
  }, []);

  // ----------------------------------------------------
  // 2. Supabase Authentication Listener
  // ----------------------------------------------------
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUserInfo(session?.user || null);
      }
    );

    return () => authListener?.subscription?.unsubscribe();
  }, []);

  // ----------------------------------------------------
  // 3. Google Analytics Route Tracking
  // ----------------------------------------------------
  useEffect(() => {
    const handleRouteChange = (url: string) => ga.pageview(url);

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  // ----------------------------------------------------
  // 4. Route Loading Indicator
  // ----------------------------------------------------
  useEffect(() => {
    if (firstLoad) return;

    const start = () => {
      routeTimerRef.current = setTimeout(() => setRouteLoading(true), 200);
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
  }, [router, firstLoad]);

  // ----------------------------------------------------
  // 5. Fetch Categories Once
  // ----------------------------------------------------
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/categories");
        if (!res.ok) throw new Error("Failed to fetch categories");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    }

    fetchCategories();
  }, []);

  // ----------------------------------------------------
  // 6. Memoized Context Values
  // ----------------------------------------------------
  const userInfoValue = useMemo(
    () => ({ userInfo, setUserInfo }),
    [userInfo]
  );

  const videoValue = useMemo(
    () => ({ videoLine, setVideoLine }),
    [videoLine]
  );

  // ----------------------------------------------------
  // 7. First Load Preloader
  // ----------------------------------------------------
  if (firstLoad) return <Preloader />;

  // ----------------------------------------------------
  // Render Tree
  // ----------------------------------------------------
  return (
    <>
      {routeLoading && <SmallRouteLoader />}

      <UserInfoContext.Provider value={userInfoValue}>
        <VideoContext.Provider value={videoValue}>
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

export default MyApp;
