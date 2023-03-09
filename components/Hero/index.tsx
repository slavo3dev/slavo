import { FC } from "react";
import { useEffect, useState} from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { NewResourceFrom } from "../Forms";
import supabase from "@/lib/supabase";
import { FreeSourcesList } from "../FreeSourcesList";
import { CategoryFilter } from "../CategoryFilter";
import { Loader } from "../ui/Loader";
import { Title } from "../Title";

export const Hero: FC = () => {
	const { user } = useUser();
	const [facts, setFacts] = useState<any[]>([]);
	const [ userEmail, setUserEmail ] = useState<string | undefined | null>("");
	const [ userVerified, setUserVerified ] = useState<boolean | null>();
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
    
	useEffect( () => {
		if ( user ) {
			setUserEmail( user.email );
			setUserVerified(user?.email_verified);
		}
	},[userEmail, userVerified, user]);
    
	const handleOnClose = () => { setShowForm( true ); };
    
	return (
		<>
			{ showForm && <NewResourceFrom setSources={ setFacts } setShowForm={ setShowForm } /> }
			<section className="flex flex-wrap items-center mx-auto container">
				<Title title={"Learning Sources"} />
				<CategoryFilter setCurrentCategory={setCurrentCategory} />
				<div className="w-full px-3 py-9">
					{isLoading ? 
						<Loader title="Please Wait... Loading..." /> :
						<FreeSourcesList facts={ facts } setFacts={ setFacts } /> }
				</div>
			</section>
			{userVerified && <div className="w-full flex items-center justify-center pb-5" >
				<button className="hover:bg-blue-100 bg-blue-500 text-white hover:text-red-500 font-bold py-2 px-4 rounded w-1/2" onClick={ handleOnClose }>Add Source</button>
			</div>}
		</>
	);
};