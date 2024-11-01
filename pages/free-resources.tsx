/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextPage, GetServerSideProps } from "next";
import { HeadBasePage, LearningSources } from "../components";
import { Source } from "@/Types/FreeReSources";
import supabase from "@/lib/supabase";


type FreeSourceProps = {
  sources: Source[];
};

const FreeSource: NextPage<FreeSourceProps> = ( { sources }: any ) => {


	return (
		<>
			<HeadBasePage
				title="Free Learning Resources for Career Change - Share & Discover Web Development"
				description="Discover free learning resources for a career change. Share and find web development tutorials, guides, and tools to boost your skills and advance your career."
			/>
			<LearningSources sources={sources} />
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async () => {

	const { data: sources, error } = await supabase
		.from("sources")
		.select("*")
		.order("like", { ascending: false });

	if (error) {
		return {
			props: {
				sources: [],
				error: "There was a problem getting data",
			},
		};
	}

	return {
		props: {
			sources,
		},
	};
};

export default FreeSource;
