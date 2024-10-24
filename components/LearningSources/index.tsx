/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useMemo, useEffect } from "react";
import { useState, useContext} from "react";
import { NewResourceFrom } from "../Forms";
import { FreeSourcesList } from "../FreeSourcesList";
import { CategoryFilter } from "../CategoryFilter";
import { Title } from "../Title";
import UserInfoContext from "@/context/UserInfoContext";
import { Source } from "@/Types/FreeReSources";


type LearningSourcesProps = {
  sources: Source[];
};

export const LearningSources: FC<LearningSourcesProps> = ( { sources }: any ) => {
	const { userInfo } = useContext( UserInfoContext );
	const [facts, setFacts] = useState<Source[]>(sources);
	const [ showForm, setShowForm ] = useState<boolean>( false );
	const [ currentCategory, setCurrentCategory ] = useState<string>( "all" );

	useEffect(() => {
		console.log( "Your New Source is added to the list" );
	}, [facts]);

	const filteredFacts = useMemo(() => {
		if (currentCategory === "all") {
			return facts;
		}
        
		return facts.filter((facts: any )=> facts.category === currentCategory);
	}, [currentCategory, facts]);
    
	const handleOnClose = () => { setShowForm( true ); };
    
	return (
		<>
			{ showForm && <NewResourceFrom setSources={ setFacts } setShowForm={ setShowForm } /> }
			<section className="flex flex-wrap items-center mx-auto container">
				<Title title={"Learning Sources"} />
				<CategoryFilter setCurrentCategory={setCurrentCategory} />
				<div className="w-full px-3 py-9">
					<FreeSourcesList facts={ filteredFacts } setFacts={ setFacts } /> 
				</div>
			</section>
			{userInfo && <div className="w-full flex items-center justify-center pb-5" >
				<button className="hover:bg-blue-100 bg-blue-500 text-white hover:text-red-500 font-bold py-2 px-4 rounded w-1/2" onClick={ handleOnClose }>Add Source</button>
			</div>}
		</>
	);
};