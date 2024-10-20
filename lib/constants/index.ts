
export const CATEGORIES: any = [
	{ name: "all", color: "" },
	{ name: "FrontEnd", color: "#3b82f6" },
	{ name: "JavaScript", color: "#cccc00" },
	{ name: "TypeScript", color: "#007acc" },
	{ name: "NodeJS", color: "#3C873A" },
	{ name: "NextJS", color: "#5e72e4" },
	{ name: "Git", color: "#171515" },
	{ name: "DataBase", color: "#14b8a6" },
	{ name: "Learning", color: "#db2777" },
	{ name: "Science", color: "#f97316" },
	{ name: "News", color: "#8b5cf6" },
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