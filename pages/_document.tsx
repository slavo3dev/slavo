import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default class MyDocument extends Document {
	render() {
		return (
			<Html lang="en">
				<Head>
					{/* Manifest */}
					<link rel="manifest" href="/manifest.json" />
          
					{/* Meta Tags */}
					<meta name="theme-color" content="#EDEDED" />
					<link rel="icon" href="/prototypenext.svg" />

					{/* Apple Web App Settings */}
					<link rel="apple-touch-icon" href="/images/icons/s3-mini-logo.png" />

					{/* Preload Google Fonts */}
					<link
						rel="preload"
						href="https://fonts.googleapis.com/css2?family=Lobster&display=swap"
						as="style"
					/>
					<link
						href="https://fonts.googleapis.com/css2?family=Lobster&display=swap"
						rel="stylesheet"
					/>
          
					{/* Load animate.css asynchronously */}
					<link
						rel="preload"
						href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
						as="style"
					/>
					<link
						href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
						rel="stylesheet"
					/>
          
					{/* Google Analytics (using Next.js Script component) */}
					<Script
						strategy="lazyOnload"
						src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
					/>
					<Script
						id="google-analytics"
						strategy="lazyOnload"
						dangerouslySetInnerHTML={{
							__html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                  page_path: window.location.pathname,
                });
              `,
						}}
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
					{/* Notification Container */}
					<div id="notifications"></div>
				</body>
			</Html>
		);
	}
}
