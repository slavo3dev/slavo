
export const CATEGORIES: any = [
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

export function isValidHttpUrl(string: string | URL) {
	let url;
	try {
		url = new URL(string);
	} catch (_) {
		return false;
	}
	return url.protocol === "http:" || url.protocol === "https:";
}

export const META_DESCRIPTION="My name is Slavo Popovic and I am an experienced software web engineer, freelance developer and mentor. Helping companies and individuals to build there online business, optimize websites and scale. For future Digital Nomads & Freelancers / My name is Slavo Popovic and I am an experienced software web engineer, freelance developer and mentor. Helping companies and individuals to build there online business, optimize websites and scale. For future Digital Nomads & Freelancers / Master Web and Mobile Development with our comprehensive Software Engineering Mentorship program. Learn cutting-edge programming languages like Python, JavaScript, Java, Swift, and more. Gain industry insights from seasoned professionals and boost your career prospects";