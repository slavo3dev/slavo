import { FC } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { HeadProps } from "lib/types";
import { META_DESCRIPTION } from "lib/constants";

const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://www.slavo.io";

type Props = HeadProps & {
  /** Optional override image for OG/Twitter (1200x630 recommended) */
  ogImage?: string;
  /** For pages you don't want indexed (login/dashboard/etc) */
  noIndex?: boolean;
  /** Override og:type if needed */
  ogType?: "website" | "article";
};

export const HeadBasePage: FC<Props> = ({
  title = "Slavo | Mentorship & Coding Habits",
  description = META_DESCRIPTION,
  canonicalPath,
  ogImage,
  noIndex = false,
  ogType = "website",
}) => {
  const router = useRouter();

  const canonical = `${SITE_URL}${canonicalPath ?? router.asPath}`;
  const image = ogImage ?? `${SITE_URL}/og-image.jpg`;

  return (
    <Head>
      {/* Primary */}
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Canonical */}
      <link rel="canonical" href={canonical} />

      {/* Robots control */}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : null}

      {/* Open Graph */}
      <meta property="og:site_name" content="Slavo" />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@slavo3dev" />
      <meta name="twitter:creator" content="@slavo3dev" />

      {/* Optional keywords (not very important for SEO, but harmless) */}
      <meta
        name="keywords"
        content="career change, web development, learn web development, coding habits, mentorship, react, javascript"
      />
    </Head>
  );
};
