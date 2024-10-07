/* eslint-disable @typescript-eslint/no-explicit-any */
declare const window: any;
import { sendGAEvent } from "@next/third-parties/google";

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


export const trackEvent = ({ action, category, label, value } : {
  action: string;
  category: string;
  label: string;
  value: number;
}): void => {
	sendGAEvent({
		action,
		category,
		label,
		value,
	});
};