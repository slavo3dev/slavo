import { FC } from "react";
import Head from "next/head";
import Script from "next/script";
import { useRouter } from "next/router";
import { HeadProps } from "@/lib/types";


export const HeadBasePage: FC<HeadProps> = (props) => {
	const router = useRouter();
	const {
		title = "Slavo Software Development Consulting",
		canonicalPath, } = props;
    
	return (
		<>
			<Head>
				<title>{ title }</title>
                
				<link
					href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
				/>
                
				<Script
					src="https://cdnjs.cloudflare.com/ajax/libs/wow/1.1.2/wow.min.js"
					integrity="sha512-Eak/29OTpb36LLo2r47IpVzPBLXnAMPAVypbSZiZ4Qkf8p/7S/XRG5xp7OKWPPYfJT6metI+IORkR5G8F900+g=="
					crossOrigin="anonymous"></Script>
				<Script>new WOW().init();</Script>

				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/>
				<meta name="description" content="Discover how a career change into web development can open up new opportunities. Learn web development skills, programming languages, and tools to start your journey today." />
				<meta name="keywords" content="career change, web development, learn web development, programming, coding, frontend, backend, full stack, HTML, CSS, JavaScript, frameworks, libraries, React, React Native, ChatGPT, Mentorship, Mentor"></meta>
                
				{/* <!-- Open Graph Meta Tags --> */}
				<meta property="og:title" content="Career Change: Learn Web Development for a Bright Future" />
				<meta property="og:description" content="Discover how a career change into web development can open up new opportunities. Learn web development skills, programming languages, and tools to start your journey today." />
				<meta property="og:image" content="https://www.slavo.io/images/components/team.svg" />
				<meta property="og:url" content="https://slavo.io" />
				<meta property="og:type" content="https://slavo.io"></meta>
                
				{/* <!-- Twitter Meta Tags --> */}
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content="Career Change: Learn Web Development for a Bright Future" />
				<meta name="twitter:description" content="Discover how a career change into web development can open up new opportunities. Learn web development skills, programming languages, and tools to start your journey today." />
				<meta name="twitter:image" content="https://www.slavo.io/_next/image?url=%2Fimages%2Fpost-img%2Fremote-business-ideas-post.png&w=1080&q=75" />
				<meta name="twitter:site" content="@slavo3dev" />
				<meta name="twitter:creator" content="@slavo3dev" ></meta>

                
				<meta name="title" key="title" content={title} />
				<meta property="og:title" key="og:title" content={title} />
				<meta property="og:locale" key="og:locale" content="en_EU" />
				<meta property="og:url" key="og:url" content={`${process.env.BASE_URL}${router.asPath}`} />
				<meta property="og:type" key="og:type" content="website" />
				<meta property="og:image" key="og:image" content={ `${ process.env.BASE_URL }/images/lion-favicon.png` } />
                
				
  
				<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;700&display=swap"></link>
				<link rel="icon" type="image/x-icon" href="/images/lion-favicon.jpeg"/>
				<link
					rel="canonical"
					href={`${process.env.BASE_URL}${canonicalPath ? canonicalPath : router.asPath}`} />
			</Head>
		</>
	);
};