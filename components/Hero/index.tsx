import { FC } from "react";
import { useEffect, useState} from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import classes from "./hero.module.css";
import Image from "next/image";
import { NewResourceFrom } from "../Forms";
import supabase from "@/lib/supabase";

export const Hero: FC = () => {
	const { user } = useUser();
	const [ userEmail, setUserEmail ] = useState<string | undefined | null>("");
	const [ userVerified, setUserVerified ] = useState<boolean | null>();
	const [ showForm, setShowForm ] = useState<boolean>( false );
	const [ sources, setSources ] = useState( [] );
	const [ currentCategory, setCurrentCategory ] = useState<string>( "all" );
	const [ isLoading, setIsLoading] = useState<boolean>(false);
    
	useEffect(
		function () {
			async function getSources() {
				setIsLoading(true);

				let query = supabase.from("sources").select("*");
				if (currentCategory !== "all")
					query = query.eq("category", currentCategory);

				const { data: sources, error }: any = await query
					.order("like", { ascending: false })
					.limit(1000);
                
				if (!error) setSources(sources);
				else alert("There was a problem getting data");
				setIsLoading(false);
			}
			getSources();
		},
		[currentCategory, showForm ]
	);
    
	useEffect( () => {
		if ( user )
		{
			setUserEmail( user.email );
			setUserVerified(user?.email_verified);
		}
	},[userEmail, userVerified, user]);
    
	const handleOnClose = () => { setShowForm( true ); };
    
	console.log("Sources: ", sources);
	return (
		<>
			{ showForm &&  <NewResourceFrom setSources={setSources} setShowForm={setShowForm}/> }
			<section className="flex flex-wrap items-center mx-auto container">
				<div className="w-full lg:w-1/2 px-3 py-9">
					<Image
						className="animate__animated animate__fadeIn profile-image-hero"
						src="/images/profile/profile-image.png"
						alt="Profile Image, Software Developer"
						width={300}
						height={300}
					/>
				</div>
				<div className="w-full lg:w-1/2 px-3 lg:bg-blueGray-10 mb-12 lg:mb-0 pb-10 md:p-2">
					<h1>Slavo</h1>
					<p>The future depends on what<br /> you do today.</p>
					<button className="hover:bg-blue-100 bg-blue-500 text-white hover:text-red-500 font-bold py-2 px-4 mt-3 rounded" onClick={ handleOnClose }>Add Source</button>
				</div>
			</section>
		</>
	);
};