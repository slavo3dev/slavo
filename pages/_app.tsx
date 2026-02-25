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

  // ✅ IMPORTANT: do NOT block SSR with a preloader return.
  // Render the site immediately, and only show a client-side overlay loader.
  const [showFirstLoadOverlay, setShowFirstLoadOverlay] =
    useState(false);

  const [routeLoading, setRouteLoading] = useState(false);
  const routeTimerRef = useRef<NodeJS.Timeout | null>(null);

  const GA_TRACKING_ID =
    process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS || "";

  // ----------------------------------------------------
  // 1) First-load overlay (client only)
  // ----------------------------------------------------
  useEffect(() => {
    // Ensure this never affects SSR HTML (useEffect runs only on client)
    setShowFirstLoadOverlay(true);
    const timeout = setTimeout(
      () => setShowFirstLoadOverlay(false),
      700,
    );
    return () => clearTimeout(timeout);
  }, []);

  // ----------------------------------------------------
  // 2) Supabase initial session + auth listener
  // ----------------------------------------------------
  useEffect(() => {
    let isMounted = true;

    supabase.auth
      .getSession()
      .then(({ data }) => {
        if (!isMounted) return;
        setUserInfo(data.session?.user ?? null);
      })
      .catch(() => {
        // ignore; keep userInfo null
      });

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
  }, [router.events]);

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
  // Canonical (strip query/hash so it stays clean)
  // ----------------------------------------------------
  const path = router.asPath.split("?")[0].split("#")[0];
  const canonical = `${SITE_URL}${path === "/" ? "" : path}`;

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
          content={`${SITE_URL}/og-image.png`}
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
          content={`${SITE_URL}/og-image.png`}
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

          {/* ✅ Overlay preloader so SSR HTML still contains real page content */}
          {showFirstLoadOverlay ? <Preloader overlay /> : null}

          {/* GA */}
          {GA_TRACKING_ID ? (
            <GoogleAnalytics gaId={GA_TRACKING_ID} />
          ) : null}
        </VideoContext.Provider>
      </UserInfoContext.Provider>
    </>
  );
}
