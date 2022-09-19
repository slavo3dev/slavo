/* eslint-disable @typescript-eslint/no-explicit-any */
declare const window: any;

// log the pageview with their URL
export const pageview = ( url: string ) =>
{
	if ( window.gtag )
	{ 
		window.gtag("config", process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
			page_path: url,
		});  
	}
};

// log specific events happening.
export const event = ({ action, params }: any) => {
	window.gtag("event", action, params);
};