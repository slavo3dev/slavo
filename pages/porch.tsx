import { GetStaticProps, NextPage } from "next";
import { useState, useCallback } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import supabase from "../lib/supabase";
import { Loader } from "@/components/ui/Loader";
import { HeadBasePage, PorchList, PorchHeader, PorchForm } from "@components";
import { PorchType } from "@/Types/PorchTypes";

interface PorchPageProps {
  initialPorchs: PorchType[];
}



const PorchPage: NextPage<PorchPageProps> = ({ initialPorchs }) => {
	const [ showForm, setShowForm ] = useState( false );
	const [porchList, setPorchs] = useState<PorchType[]>(initialPorchs);
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(initialPorchs.length === 100);

	const loadMorePorchs = useCallback(async () => {
		try {
			const { data: newPorchs, error } = await supabase
				.from("porch")
				.select( "*" )
				.limit(100)
				.order("created_at", { ascending: false }) 
				.range( page * 100, ( page + 1 ) * 100 - 1 );
            
			if (error) {
				console.error( "Error fetching data from Supabase:", error );
                
			} else if (newPorchs && Array.isArray(newPorchs)) {
				setPorchs((prevPorchs: any) => [...prevPorchs, ...newPorchs]);
				setPage((prevPage) => prevPage + 1);
				setHasMore(newPorchs.length === 100);
			}
		} catch (error) {
			console.error("Request failed: ", error);
		} finally {
			console.log("ALL Loaded");
		}
	}, [page]);

	return (
		<>
			<HeadBasePage title="Share your daily update and continue to Career Change: Learn Web Development for a Bright Future" />
			<div className="p-10 text-slate-800">
				<PorchHeader showForm={showForm} setShowForm={setShowForm} />
				{showForm ? (
					<PorchForm setPorchs={setPorchs} setShowForm={setShowForm} />
				) : null}
				<InfiniteScroll
					dataLength={porchList.length}
					next={loadMorePorchs}
					hasMore={hasMore}
					loader={<Loader title="Loading more updates..." />}
					endMessage={<p style={{ textAlign: "center" }}>Yay! You have seen it all</p>}
				>
					<PorchList porchs={porchList} setPorchs={setPorchs} />
				</InfiniteScroll>
			</div>
		</>
	);
};

export default PorchPage;

export const getStaticProps: GetStaticProps = async () => {
	const { data: porchs, error } = await supabase
		.from("porch")
		.select("*")
		.order("created_at", { ascending: false })
		.limit(100);

	if (error) {
		console.error("Error fetching data from Supabase:", error);
		return {
			props: {
				initialPorchs: [],
			},
		};
	}

	return {
		props: {
			initialPorchs: porchs,
		},
		revalidate: 60, 
	};
};