import { FC } from "react";
import { useEffect, useState, useContext} from "react";
import { NewResourceFrom } from "../Forms";
import supabase from "@/lib/supabase";
import { FreeSourcesList } from "../FreeSourcesList";
import { CategoryFilter } from "../CategoryFilter";
import { Loader } from "../ui/Loader";
import { Title } from "../Title";
import UserInfoContext from "@/context/UserInfoContext";

export const LearningSources: FC = () => {
	const { userInfo } = useContext( UserInfoContext );
	const [facts, setFacts] = useState<[]>([]);
	const [ showForm, setShowForm ] = useState<boolean>( false );
	const [ currentCategory, setCurrentCategory ] = useState<string>( "all" );
	const [ isLoading, setIsLoading] = useState<boolean>(false);
    
	useEffect(
		function () {
			async function getSources() {
				setIsLoading(true);

				let query = supabase.from("sources").select("*");
				if (currentCategory !== "all")
					query = query.eq("category", currentCategory);

				const { data: facts, error }: any = await query
					.order("like", { ascending: false })
					.limit(1000);
                
				if (!error) setFacts(facts);
				else alert("There was a problem getting data");
				setIsLoading(false);
			}
			getSources();
		},
		[currentCategory, showForm ]
	);
    
	const handleOnClose = () => { setShowForm( true ); };
    
	return (
		<>
			{ showForm && <NewResourceFrom setSources={ setFacts } setShowForm={ setShowForm } /> }
			<section className="flex flex-wrap items-center mx-auto container">
				<Title title={"Learning Sources"} />
				<CategoryFilter setCurrentCategory={setCurrentCategory} />
				<div className="w-full px-3 py-9">
					{ isLoading ? <Loader title="Please Wait... Loading..." /> : <FreeSourcesList facts={ facts } setFacts={ setFacts } /> }
				</div>
			</section>
			{userInfo && <div className="w-full flex items-center justify-center pb-5" >
				<button className="hover:bg-blue-100 bg-blue-500 text-white hover:text-red-500 font-bold py-2 px-4 rounded w-1/2" onClick={ handleOnClose }>Add Source</button>
			</div>}
		</>
	);
};