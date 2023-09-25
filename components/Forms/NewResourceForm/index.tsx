/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, FC } from "react";
import { CATEGORIES } from "@/lib/constants";
import axios from "axios";
import { isValidHttpUrl } from "@/lib/constants";
import { NewResourceFromProps } from  "@/lib/types";
import { useUser } from "@auth0/nextjs-auth0/client";

export const NewResourceFrom: FC<NewResourceFromProps> = ( { setSources, setShowForm } ) => {
	const [text, setText] = useState("");
	const [source, setSource] = useState("");
	const [category, setCategory ] = useState( "" );
	const [ isUploading, setIsUploading ] = useState( false );
    
	const textLength = text.length;
    
	const { user } = useUser();
    
	const email = user?.user !== undefined ? user.user : "";
    
	async function handleSubmit(e: { preventDefault: () => void; }) {
		// 1. Prevent browser reload
		e.preventDefault();

		if (text && isValidHttpUrl(source) && category && textLength <= 200) {
			try {
				setIsUploading(true);
				await axios.post( "api/createSource", {
					text, source, category: category.toUpperCase(), email
				} );
				setSources( ( sources: any ) => [ sources[ 0 ], ...sources ] );
                
				setTimeout(() => {
					setText("");
					setSource("");
					setCategory( "" );
					setIsUploading(false);
					setShowForm(false);
				}, 1500);
				
	
			} catch (error) {
				throw new Error("Something Went Wrong Message was not saved!!!");
            
			}

		}
	}

	const handleOnClose = () => { setShowForm(false); };
 

	return (
		<>
			<div className="bg-gray-800 bg-opacity-75 transition-opacity"></div>
			<div className="flex fixed inset-0 z-10 overflow-y-auto items-center justify-center">
				{ isUploading && <h3 style={ { color: "red", textDecoration: "underline", backgroundColor: "white", padding: "1rem" } }>Thank You so much for sharing this with the Comunity</h3> }
				<div className="w-full max-w-lg bg-gray-300 p-9 shadow-lg shadow-gray-100 transition-all rounded-lg sm:my-8 sm:w-full sm:max-w-lg">
					<div className="flex flex-wrap -mx-3 mb-6">
						<div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
							<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                            Add URL Source
							</label>
							<input
								className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name"
								type="text"
								value={ source }
								placeholder='Question Title / Topic'
								onChange={ ( e ) => setSource( e.target.value ) }
								disabled={ isUploading }
							/>
							{(source.length === 0 ||  !isValidHttpUrl(source) ) ? <p className="text-red-500 text-xs italic">Please fill out this field or Add proper URL.</p> : "" }
						</div>
						<div className="w-full md:w-1/2 px-3">
							<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="select_category">
                            Category
							</label>
							<select
								className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
								id="select_category"
								value={category}
								onChange={(e) => setCategory(e.target.value)}
								disabled={isUploading}
							>
								{ CATEGORIES.map( ( cat: any ) => (
									<option key={ cat.name } value={ cat.name }>
										{ cat.name }
									</option>
								) ) }
							</select>
						</div>
					</div>
					<div className="flex flex-wrap -mx-3 mb-6">
						<div className="w-full px-3">
							<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="question-topic">
                            Description About The Source
							</label>
							<textarea
								id="question-topic"
								rows={ 4 }
								className="block p-2.5 w-full text-sm bg-gray-200 border border-gray-200 text-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500"
								placeholder='Add Short Description About The Source...'
								value={ text }
								onChange={ ( e ) => setText( e.target.value ) }
								disabled={ isUploading } />
							<p className="text-gray-600 text-xs italic">You Have 250 words to describe your source - You are helping Comunity - </p>
						</div>
					</div>
					<div className="itmes-center content-center w-full">
						<button className="bg-gray-500 hover:bg-gray-900 text-white w-1/3 font-bold py-2 px-4 border border-red-700 rounded" disabled={ isUploading } onClick={handleSubmit}>
                        Submit
						</button>
						<button className="bg-red-100 hover:bg-gray-900 w-1/3 font-bold py-2 px-4 border border-red-300 rounded float-right" onClick={handleOnClose} >
                        Cancel
						</button>
					</div>
				</div>
			</div>
		</>
	);
};