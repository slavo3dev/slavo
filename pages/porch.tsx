/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, Key } from "react";
import type { NextPage } from "next";
import supabase from "../lib/supabase";
import { useUser } from "@auth0/nextjs-auth0/client";
import { CATEGORIES, isValidHttpUrl } from "@/lib/constants";
import { Loader } from "@/components/ui/Loader";


const PorchPage: NextPage = () => {
	const [showForm, setShowForm] = useState(false);
	const [Porchs, setPorchs] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
    
	useEffect(
		function () {
			async function getPorchs() {
				setIsLoading(true);

				const query = supabase.from("porch").select("*");

				const { data: Porchs, error }: any = await query
					.order("excellent", { ascending: false })
					.limit(1000);

				console.log("Data: ", Porchs);
				if (!error) setPorchs(Porchs);
				else alert("There was a problem getting data");
				setIsLoading(false);
			}
			getPorchs();
		},
		[]
	);

	return (
		<div className="freeSourceContainer">
			<Header showForm={showForm} setShowForm={setShowForm} />
			{/* {showForm ? (
				<NewFactForm setPorchs={setPorchs} setShowForm={setShowForm} />
			) : null} */}
			{true ? (
				<NewFactForm setPorchs={setPorchs} setShowForm={setShowForm} />
			) : null}
			<main className='main'>
				{isLoading ? (
					<Loader title="Please Wiat... Loading..."/>
				) : (
					<FactList Porchs={Porchs} setPorchs={setPorchs} />
				)}
			</main>
		</div>
	);
};


function Header({ showForm, setShowForm }: any) {
	const appTitle = "Your Daily Update";
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
	const [category, setCategory] = useState("");
	const [isUploading, setIsUploading] = useState(false);
	const textLength = text.length;

	async function handleSubmit(e: { preventDefault: () => void; }) {
		// 1. Prevent browser reload
		e.preventDefault();
		console.log( text, source, category );
		const { user } = useUser();

		if (text && isValidHttpUrl(source) && textLength <= 300) {
			// 2. Upload fact to Supabase and receive the new fact object
			setIsUploading(true);
			const { data: newFact, error } = await supabase
				.from("porch")
				.insert([{ text, source, email: user?.email}])
				.select();
			setIsUploading(false);

			// 3. Add the new fact to the UI: add the fact to state
			if (!error) setPorchs((Porchs: any) => [newFact[0], ...Porchs]);

			// 4. Reset input fields
			setText("");
			setSource("");

			// 5. Close the form
			setShowForm(false);
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
			<select
				value={category}
				onChange={(e) => setCategory(e.target.value)}
				disabled={isUploading}
			>
				<option value=''>Choose category:</option>
				{CATEGORIES.map((cat: any) => (
					<option key={cat.name} value={cat.name}>
						{cat.name.toUpperCase()}
					</option>
				))}
			</select>
			<button className='btn btn-large' disabled={isUploading}>
        Post
			</button>
		</form>
	);
}

function FactList({ Porchs, setPorchs }: any) {

	return (
		<section>
			<ul className='Porchs-list'>
				{Porchs.map((fact: { id: Key | null | undefined; }) => (
					<Fact key={fact.id} fact={fact} setPorchs={setPorchs} />
				))}
			</ul>
		</section>
	);
}

function Fact({ fact, setPorchs }: any) {
	const [isUpdating, setIsUpdating] = useState(false);
	const badSource =
        fact.like + fact.exelent < fact.false;
    
	const { user } = useUser();
    
	const date = new Date(fact.created_at);
	const formattedDate = `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
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
				setPorchs((Porchs: any[]) =>
					Porchs.map((f: { id: any; }) => (f.id === fact.id ? updatedFact[0] : f))
				);
		} else
		{
			alert("Please Login or Verify email address");
		}
          
	}

	return (
		<li className='fact'>
			<p>{ fact.text }</p>
			<p>
				<a className='source' href={fact.source} target='_blank'>(Source)</a>
			</p>
			<p
				className='tag'
				style={{ backgroundColor: "blue", padding: "0.4 rem"
				}}
			>
				{ formattedDate } | {formattedTime }
			</p>
			<div className='vote-buttons'>
				<button
					onClick={() => handleVote("excellent")}
					disabled={isUpdating}
				>
          🤯 👍 {fact.excellent}
				</button>
			</div>
		</li>
	);
}

export default PorchPage;
