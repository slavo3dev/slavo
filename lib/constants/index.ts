
export const CATEGORIES: any = [
	{ name: "all" },
	{ name: "FrontEnd" },
	{ name: "JavaScript" },
	{ name: "TypeScript" },
	{ name: "NodeJS" },
	{ name: "NextJS" },
	{ name: "Git" },
	{ name: "DataBase" },
	{ name: "Learning" },
	{ name: "Science" },
	{ name: "News" },
];

export function isValidHttpUrl(urlInput: string) {

	const urlPattern = new RegExp("^(https?:\\/\\/)?"+ // validate protocol
                    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|"+ // validate domain name
                    "((\\d{1,3}\\.){3}\\d{1,3}))"+ // validate OR ip (v4) address
                    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*"+ // validate port and path
                    "(\\?[;&a-z\\d%_.~+=-]*)?"+ // validate query string
                    "(\\#[-a-z\\d_]*)?$", "i" ); // validate fragment locator
    
	return !!urlPattern.test(urlInput);
}

export const META_DESCRIPTION="Experienced software web engineer, freelance developer, and mentor. Specializing in career change, web consulting, and micro-learning. Helping build online businesses, optimize websites, and scale. Master web and mobile development with our mentorship program";