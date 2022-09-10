import { FC } from 'react';
import Head from "next/head";
import { useRouter } from "next/router";

type Props = {
    title: string,
    metaDescription: string, 
    canonicalPath?: string
}

export const HeadBasePage: FC<Props> = (props) => {
	const router = useRouter();
	const {
		title = "Slavo_3 Software Development Consulting",
		metaDescription="My name is Slavo Popovic and I am an experienced software web engineer and freelance developer. The enthusiastic professional developer of web/chatbots/aws cloud who is used to fast-paced environments. Hardworking and effective as both a team leader and in an individual role",
		canonicalPath,} = props;

	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/>
				<meta name="description" key="description" content={metaDescription} />
				<meta name="title" key="title" content={title} />
				<meta property="og:title" key="og:title" content={title} />
				<meta property="og:locale" key="og:locale" content="en_EU" />
				<meta property="og:url" key="og:url" content={`${process.env.BASE_URL}${router.asPath}`} />
				<meta property="og:type" key="og:type" content="website" />
				<meta property="og:description" key="og:description" content={metaDescription} />
				<meta property="og:image" key="og:image" content={`${process.env.BASE_URL}/images/lion-favicon.png`} />
				<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;700&display=swap" rel="stylesheet"></link>
				<link rel="icon" type="image/x-icon" href="/images/lion-favicon.png"/>
				<link
					rel="canonical"
					href={`${process.env.BASE_URL}${canonicalPath ? canonicalPath : router.asPath}`} />
			</Head>
		</>
	);
};