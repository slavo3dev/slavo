import axios from "axios";
import { useState, FC } from "react";
import { Loader } from "../ui/Loader";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { customRenderers } from "lib/formatText";

export const OpenAI: FC = () => {

	const [aiRes, setAiRes] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [ questionInput, setQuestionInput ] = useState<string>( "" );
	const [ tech, setTech ] = useState<string>( "HTML" );
	const [ errMsg, setErrMsg ] = useState<string>( "" );
    

	const handleApiAI = async () =>
	{
		setIsLoading( true );
		try {
			const res = await axios.post( "api/answerByAi", {
				questionInput,
				tech
			} );
			setAiRes( res.data.answer );
			setIsLoading(false);
		} catch ( error )
		{
			setErrMsg("We're sorry, we're currently experiencing some difficulties retrieving data.\n Please come back later or try again. \n Thank you for your patience.");
			setIsLoading(false);
		}
	};
    
	const resposeAI = errMsg ? <div className="text-gray-700 text-base p-8">{errMsg}</div> : 
		<div className="text-gray-700 text-base p-8" >
			<ReactMarkdown remarkPlugins={ [ remarkGfm ] } components={ customRenderers } linkTarget='_blank'>{aiRes}</ReactMarkdown>
		</div> ; 

	return (
		<>
			<div className="lg:flex rounded lg:max-w-full sm:max-w-full md:max-w-full" id="openai">
				<div className="bg-white shadow-inner rounded px-8 pt-6 pb-8 w-full lg:max-w-full">
					<div className="mb-7 pl-8 pr-8 flex pb-4 flex-col">
						<label className="block text-gray-700 first-letter:text-7xl first-letter:font-normal first-letter:text-blue-600 lg:text-3xl md:text-xl font-bold mb-2 lg:text-left md:text-center sm:text-xs" >
                            Ask Question About:
							<p className="text-gray-700 lg:text-xl font-normal mt-7">HTML | CSS | JavaScript | TypeScript | React | NodeJS | API</p>
							<p className="text-gray-700 lg:text-xl font-normal mb-7">Suggestions, Advice & Solutions</p>
						</label>
						<select
							className="block bg-white border-2 border-blue-500 text-gray-700 py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-white sm:w-full md:w-1/4 lg:w-1/6 mb-3"
							onChange={ e => setTech( e.target.value ) }
							value={ tech } > 
							<option value="HTML">HTML</option>
							<option value="CSS">CSS</option>
							<option value="JavaScript">JavaScript</option>
							<option value="React">React</option>
							<option value="TypeScript">TypeScript</option>
							<option value="NodeJS">NodeJS</option>
							<option value="API">API</option>
						</select>
						<textarea
							id="editor" rows={ 8 }
							className="shadow appearance-none block w-full py-3 px-3 text-sm text-gray-800 bg-blue-50 focus:ring-0 dark:text-bule dark:placeholder-gray-400 border rounded focus:outline-none focus:shadow-outline placeholder:italic placeholder:text-slate-400"
							placeholder="Ask Question FronEnd Tech - HTML, CSS, JavaScript..."
							required
							value={ questionInput }
							onChange={ e => setQuestionInput( e.target.value ) } />
						<div className="flex justify-end">
							<button
								className="text-base border-2 border-blue-500 text-gray-700 bg-white rounded-lg font-medium focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-500 hover:text-white mt-4 p-3 lg:w-1/6 md:max-w-full"
								style={{ textAlign: "center"}}
								type="button"
								disabled={isLoading}
								onClick={ () => handleApiAI() }>
                                Press For Answer
							</button>
						</div>
					</div>
					
					{ isLoading ? <Loader title={"Please Wait... Answer is coming...."} /> : resposeAI }
				</div>
			</div>

		</>
	);
};