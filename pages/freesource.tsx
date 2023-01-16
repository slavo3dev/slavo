/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, Key } from "react";
import type { NextPage } from "next";
import supabase from "../lib/supabase";


const FreeSource: NextPage = () => {
	const [showForm, setShowForm] = useState(false);
	const [facts, setFacts] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [currentCategory, setCurrentCategory] = useState("all");

	useEffect(
		function () {
			async function getFacts() {
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
			getFacts();
		},
		[currentCategory]
	);

	return (
		<div className="freeSourceContainer">
			<Header showForm={showForm} setShowForm={setShowForm} />
			{showForm ? (
				<NewFactForm setFacts={setFacts} setShowForm={setShowForm} />
			) : null}

			<main className='main'>
				<CategoryFilter setCurrentCategory={setCurrentCategory} />

				{isLoading ? (
					<Loader />
				) : (
					<FactList facts={facts} setFacts={setFacts} />
				)}
			</main>
		</div>
	);
};

function Loader() {
	return <p className='message'>Loading...</p>;
}

function Header({ showForm, setShowForm }: any) {
	const appTitle = "Web Dev - Free Resources";

	return (
		<header className='header'>
			<div className='logo'>
				<h1>{appTitle}</h1>
			</div>

			<button
				className='btn btn-large btn-open'
				onClick={() => setShowForm((show: any) => !show)}
			>
				{showForm ? "Close" : "Share Source"}
			</button>
		</header>
	);
}

const CATEGORIES: any = [
	{ name: "FrontEnd", color: "#3b82f6" },
	{ name: "JavaScript", color: "#f0db4f" },
	{ name: "TypeScript", color: "#007acc" },
	{ name: "NodeJS", color: "#3C873A" },
	{ name: "NextJS", color: "#5e72e4" },
	{ name: "DataBase", color: "#14b8a6" },
	{ name: "Learning", color: "#db2777" },
	{ name: "Science", color: "#f97316" },
	// { name: "News", color: "#8b5cf6" },
];

function isValidHttpUrl(string: string | URL) {
	let url;
	try {
		url = new URL(string);
	} catch (_) {
		return false;
	}
	return url.protocol === "http:" || url.protocol === "https:";
}

function NewFactForm({ setFacts, setShowForm }: any) {
	const [text, setText] = useState("");
	const [source, setSource] = useState("");
	const [category, setCategory] = useState("");
	const [isUploading, setIsUploading] = useState(false);
	const textLength = text.length;

	async function handleSubmit(e: { preventDefault: () => void; }) {
		// 1. Prevent browser reload
		e.preventDefault();
		console.log(text, source, category);

		if (text && isValidHttpUrl(source) && category && textLength <= 200) {
			// 2. Upload fact to Supabase and receive the new fact object
			setIsUploading(true);
			const { data: newFact, error } = await supabase
				.from("sources")
				.insert([{ text, source, category }])
				.select();
			setIsUploading(false);

			// 3. Add the new fact to the UI: add the fact to state
			if (!error) setFacts((facts: any) => [newFact[0], ...facts]);

			// 4. Reset input fields
			setText("");
			setSource("");
			setCategory("");

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
			<span>{200 - textLength}</span>
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

function CategoryFilter({ setCurrentCategory }: any) {
	return (
		<aside>
			<ul>
				<li className='category'>
					<button
						className='btn btn-all-categories'
						onClick={() => setCurrentCategory("all")}
					>
            All
					</button>
				</li>

				{CATEGORIES.map((cat: any) => (
					<li key={cat.name} className='category'>
						<button
							className='btn btn-category'
							style={{ backgroundColor: cat.color, color: "whitesmoke" }}
							onClick={() => setCurrentCategory(cat.name)}
						>
							{cat.name}
						</button>
					</li>
				))}
			</ul>
		</aside>
	);
}

function FactList({ facts, setFacts }: any) {
	if (facts.length === 0)
		return (
			<p className='message'>
        No facts for this category yet! Create the first one ✌️
			</p>
		);

	return (
		<section>
			<ul className='facts-list'>
				{facts.map((fact: { id: Key | null | undefined; }) => (
					<Fact key={fact.id} fact={fact} setFacts={setFacts} />
				))}
			</ul>
			<p style={{ color: "#1d1e18"}}>There are {facts.length} source. Add your own source!</p>
		</section>
	);
}

function Fact({ fact, setFacts }: any) {
	const [isUpdating, setIsUpdating] = useState(false);
	const badSource =
    fact.like + fact.exelent < fact.false;

	async function handleVote(columnName: string) {
		setIsUpdating(true);
		const { data: updatedFact, error } = await supabase
			.from("sources")
			.update({ [columnName]: fact[columnName] + 1 })
			.eq("id", fact.id)
			.select();
		setIsUpdating(false);

		if (!error)
			setFacts((facts: any[]) =>
				facts.map((f: { id: any; }) => (f.id === fact.id ? updatedFact[0] : f))
			);
	}

	return (
		<li className='fact'>
			<p>
				{badSource ? <span className='badsource'>[ ⛔️ BAD SOURCE ]</span> : null}
				{fact.text}
				<a className='source' href={fact.source} target='_blank'>
          (Source)
				</a>
			</p>
			<span
				className='tag'
				style={{ backgroundColor: CATEGORIES.find((cat: any) => cat?.name === fact?.category).color, padding: "0.4 rem"
				}}
			>
				{fact.category}
			</span>
			<div className='vote-buttons'>
				<button
					onClick={() => handleVote("like")}
					disabled={isUpdating}
				>
          👍 {fact.like}
				</button>
				<button
					onClick={() => handleVote("exelent")}
					disabled={isUpdating}
				>
          🤯 {fact.exelent}
				</button>
				<button onClick={() => handleVote("false")} disabled={isUpdating}>
          ⛔️ {fact.false}
				</button>
			</div>
		</li>
	);
}

export default FreeSource;
