import { useEffect, useMemo, useRef, useState } from "react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Head from "next/head";

import { GoogleAnalytics } from "@next/third-parties/google";
import { SpeedInsights } from "@vercel/speed-insights/next";

import "../styles/globals.css";
import "animate.css";

import {
  Layout,
  HeadBasePage,
  MainNavigation,
  Footer,
  Preloader,
} from "../components";
import { SmallRouteLoader } from "../components/SmallRouteLoader";

import VideoContext from "context/VideoContext";
import UserInfoContext from "context/UserInfoContext";

import supabase from "lib/supabase";
import type { User } from "@supabase/supabase-js";

const SITE_URL = "https://www.slavo.io";
const DEFAULT_TITLE = "Slavo | Mentorship & Coding Habits";
const DEFAULT_DESCRIPTION =
  "Build coding habits and transition into tech with structured mentorship and accountability.";

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [videoLine, setVideoLine] = useState("channelOne");

  const [firstLoad, setFirstLoad] = useState(true);
  const [routeLoading, setRouteLoading] = useState(false);

  const routeTimerRef = useRef<NodeJS.Timeout | null>(null);

  const GA_TRACKING_ID =
    process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS || "";

  // ----------------------------------------------------
  // 1) First-load preloader timeout
  // ----------------------------------------------------
  useEffect(() => {
    const timeout = setTimeout(() => setFirstLoad(false), 700);
    return () => clearTimeout(timeout);
  }, []);

  // ----------------------------------------------------
  // 2) Supabase initial session + auth listener
  // ----------------------------------------------------
  useEffect(() => {
    let isMounted = true;

    // Load initial session (important on refresh)
    supabase.auth
      .getSession()
      .then(({ data }) => {
        if (!isMounted) return;
        setUserInfo(data.session?.user ?? null);
      })
      .catch(() => {
        // ignore; keep userInfo null
      });

    // Listen for changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUserInfo(session?.user || null);
      },
    );

    return () => {
      isMounted = false;
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  // ----------------------------------------------------
  // 3) Route Loading Indicator
  // ----------------------------------------------------
  useEffect(() => {
    if (firstLoad) return;

    const start = () => {
      routeTimerRef.current = setTimeout(
        () => setRouteLoading(true),
        200,
      );
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
  }, [router.events, firstLoad]);

  // ----------------------------------------------------
  // 4) Fetch Categories Once
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
  // 5) Memoized Context Values
  // ----------------------------------------------------
  const userInfoValue = useMemo(
    () => ({ userInfo, setUserInfo }),
    [userInfo],
  );
  const videoValue = useMemo(
    () => ({ videoLine, setVideoLine }),
    [videoLine],
  );

  // ----------------------------------------------------
  // 6) First Load Preloader
  // ----------------------------------------------------
  if (firstLoad) return <Preloader />;

  // If you want canonical to reflect current route by default:
  const canonical = `${SITE_URL}${router.asPath === "/" ? "" : router.asPath}`;

  // ----------------------------------------------------
  // Render Tree
  // ----------------------------------------------------
  return (
    <>
      {/* Global SEO defaults (pages can override with their own <Head>) */}
      <Head>
        <title>{DEFAULT_TITLE}</title>
        <meta name="description" content={DEFAULT_DESCRIPTION} />

        <link rel="canonical" href={canonical} />

        {/* Open Graph */}
        <meta property="og:site_name" content="Slavo" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta property="og:title" content={DEFAULT_TITLE} />
        <meta
          property="og:description"
          content={DEFAULT_DESCRIPTION}
        />
        <meta
          property="og:image"
          content={`${SITE_URL}/og-image.jpg`}
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={DEFAULT_TITLE} />
        <meta
          name="twitter:description"
          content={DEFAULT_DESCRIPTION}
        />
        <meta
          name="twitter:image"
          content={`${SITE_URL}/og-image.jpg`}
        />
      </Head>

      {routeLoading && <SmallRouteLoader />}

      <UserInfoContext.Provider value={userInfoValue}>
        <VideoContext.Provider value={videoValue}>
          <Layout>
            <MainNavigation categories={categories} />
            <Component {...pageProps} />
            <SpeedInsights />
            <Footer />
          </Layout>

          {/* GA: Keep ONLY this (remove GA scripts from _document.tsx, and remove ga.pageview from _app) */}
          {GA_TRACKING_ID ? (
            <GoogleAnalytics gaId={GA_TRACKING_ID} />
          ) : null}
        </VideoContext.Provider>
      </UserInfoContext.Provider>
    </>
  );
}
