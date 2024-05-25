import { useState } from "react"; 
import { GetStaticProps, NextPage } from "next";
import supabase from "../lib/supabase";
import { HeadBasePage, PorchList, PorchHeader, PorchForm } from "@components";
import { PorchType } from "@/Types/PorchTypes";

interface PorchPageProps {
  porchs: PorchType[];
}


const PorchPage: NextPage<PorchPageProps> = ({ porchs }) => {
	const [showForm, setShowForm] = useState(false);
	const [porchList, setPorchs] = useState<PorchType[]>(porchs);
       
	return (
		<>
			<HeadBasePage title="Share your daily update and continue to Career Change: Learn Web Development for a Bright Future" />
			<div className="p-10 text-slate-800">
				<PorchHeader showForm={showForm} setShowForm={setShowForm} />
				{showForm ? (
					<PorchForm setPorchs={setPorchs} setShowForm={setShowForm} />
				) : null}
				<PorchList porchs={porchList} setPorchs={setPorchs} />
			</div>
		</>
	);
};

export default PorchPage;

export const getStaticProps: GetStaticProps = async () => {
	const { data: porchs, error } = await supabase
		.from("porch")
		.select("*")
		.order("excellent", { ascending: false })
		.limit(1000);

	if (error) {
		console.error("Error fetching data from Supabase:", error);
		return {
			props: {
				porchs: [],
			},
		};
	}

	return {
		props: {
			porchs,
		},
		revalidate: 60
	};
};
