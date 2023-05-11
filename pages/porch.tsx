/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, Key } from "react";
import type { NextPage } from "next";
import supabase from "../lib/supabase";
import { useUser } from "@auth0/nextjs-auth0/client";
import { isValidHttpUrl } from "@/lib/constants";
import { Loader } from "@/components/ui/Loader";


const PorchPage: NextPage = () => {
	const [showForm, setShowForm] = useState(false);
	const [porchs, setPorchs] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
    
	useEffect(
		function () {
			async function getPorchs() {
				setIsLoading(true);

				const query = supabase.from("porch").select("*");

				const { data: porchs, error }: any = await query
					.order("excellent", { ascending: false })
					.limit(1000);

				console.log("Data: ", porchs);
				if (!error) setPorchs(porchs);
				else alert("There was a problem getting data");
				setIsLoading(false);
			}
			getPorchs();
		},
		[]
	);

	return (
		<div className="p-10 h-screen text-slate-800">
			<Header showForm={showForm} setShowForm={setShowForm} />
			{/* {showForm ? (
				<NewFactForm setPorchs={setPorchs} setShowForm={setShowForm} />
			) : null} */}
			{showForm ? (
				<NewFactForm setPorchs={setPorchs} setShowForm={setShowForm} />
			) : null}
			{isLoading ? (
				<Loader title="Please Wiat... Loading..."/>
			) : (
				<FactList porchs={porchs} setPorchs={setPorchs} />
			)}
	
		</div>
	);
};


function Header({ showForm, setShowForm }: any) {
	const appTitle = "Daily Update";
	// const { user } = useUser();
	
	const user = true;
	return (
		<header className='header'>
			<div className='logo'>
				<h1>{appTitle}</h1>
			</div>

			<button
				className='btn btn-large btn-open'
				onClick={ () =>
				{
					user ? setShowForm( ( show: any ) => !show ) : alert("Please log in or verify your email address");
				} }
			>
				{showForm ? "Close" : "Share Your Work"}
			</button>
		</header>
	);
}

function NewFactForm({ setPorchs, setShowForm }: any) {
	const [text, setText] = useState("");
	const [source, setSource] = useState("");
	const [isUploading, setIsUploading] = useState(false);
	const textLength = text.length;

	async function handleSubmit(e: { preventDefault: () => void; }) {
		// 1. Prevent browser reload
		e.preventDefault();
		console.log( text, source );
		// const { user } = useUser();
        
		const user = {
			email: "slavo@slavo.io"
		};

		if (text && isValidHttpUrl(source) && textLength <= 300) {
			

			const payload = {text, source, email: user?.email };
			setIsUploading( true );
            
			try {
				const response = await fetch("api/createDailyUpdate", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(payload),
				});

				if (response.ok) {
					const responseData = await response.json();
					console.log( "Response data:", responseData );
                    
					// setPorchs( ( porchs: any ) => [ porchs[ 0 ], ...porchs ] );
                
					setTimeout(() => {
						setText("");
						setSource("");
						setIsUploading(false);
						setShowForm(false);
					}, 1500);
				} else {
					console.error("Error: ", response.status, response.statusText);
				}
			} catch (error) {
				// Handle any other errors (e.g., network errors)
				console.error("Request failed: ", error);
			}
            
		}
	}

	return (
		<form className='fact-form' onSubmit={handleSubmit}>
			<input
				type='text'
				placeholder='Share a fact with the world...'
				value={text}
				onChange={(e) => setText(e.target.value)}
				disabled={isUploading}
			/>
			<span>{300 - textLength}</span>
			<input
				value={source}
				type='text'
				placeholder='Trustworthy source...'
				onChange={(e) => setSource(e.target.value)}
				disabled={isUploading}
			/>
			<button className='btn btn-large' disabled={isUploading}>
        Post
			</button>
		</form>
	);
}

function FactList({ porchs, setPorchs }: any) {

	return (
		<section className="grid md:grid-cols-4 gap-4 grid-cols-2">
			{porchs.map((fact: { id: Key | null | undefined; }) => (
				<Fact key={fact.id} fact={fact} setPorchs={setPorchs} />
			))}
		</section>
	);
}

function Fact({ fact, setPorchs }: any) {
	const [isUpdating, setIsUpdating] = useState(false);
    
	const { user } = useUser();
    
	const date = new Date(fact.created_at);
	const formattedDate = `${ date.getFullYear() }-${ ( date.getMonth() + 1 ).toString().padStart( 2, "0" ) }-${ date.getDate().toString().padStart( 2, "0" ) }`;
    
	const formattedTime = `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`;
   
	async function handleVote ( columnName: string )
	{
		if ( user?.email_verified )
		{
			setIsUpdating(true);
			const { data: updatedFact, error } = await supabase
				.from("sources")
				.update({ [columnName]: fact[columnName] + 1 })
				.eq("id", fact.id)
				.select();
			setIsUpdating(false);

			if (!error)
				setPorchs((porchs: any[]) =>
					porchs.map((f: { id: any; }) => (f.id === fact.id ? updatedFact[0] : f))
				);
		} else
		{
			alert("Please Login or Verify email address");
		}
          
	}

	return (
		<div className="max-w-sm rounded overflow-hidden shadow-lg bg-blue-800 p-2 hover:bg-slate-600 transition-duration: 900ms; text-slate-100">
			<div className="px-2 py-2">
				<p>
					{ formattedDate } | { formattedTime }
				</p>
				<p>
					<a href={`mailto:${fact.email}`} className="underline-offset-1 hover:bg-slate-900 text-sm" target='_blank'>
						User: {fact.email}
					</a>
				</p>
                --- 
				<p className="text-slate-50 text-base">{ fact.text }</p>
                ---
				<div>
					<a href={fact.source} target='_blank' className="text-sm hover:bg-slate-900">
						Source: {fact.source}
					</a>
				</div>
			</div>  
			<div>
				<button 
					className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
					onClick={() => handleVote( "excellent" ) }
					disabled={isUpdating} >🤯 👍 { fact.excellent }
				</button>
			</div>
		</div>
	
	);
}

export default PorchPage;
