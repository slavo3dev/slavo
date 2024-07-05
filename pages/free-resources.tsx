/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextPage } from "next";
import { HeadBasePage, LearningSources } from "../components";


const FreeSource: NextPage = () => {
	
	return (
		<>
			<HeadBasePage title={ "Free Learning Resources for Career Change - Share & Discover Web Development" } description={"Discover free learning resources for a career change. Share and find web development tutorials, guides, and tools to boost your skills and advance your career."} />
			<LearningSources />
		</>
	);
};


export default FreeSource;