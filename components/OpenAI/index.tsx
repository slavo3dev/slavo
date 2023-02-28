import axios from "axios";
import { useState, FC } from "react";
import { Loader } from "../ui/Loader";

export const OpenAI: FC = () => {

	const [aiRes, setAiRes] = useState<any>();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [ questionInput, setQuestionInput ] = useState<string>( "" );
	const [ tech, setTech ] = useState<string>("Andrew");

	const handleApiAI = async () =>
	{
		setIsLoading( true );
		try {
			const res = await axios.post( "api/answerByAi", {
				questionInput,
				tech
			} );
			setAiRes( res );
			setIsLoading(false);
		} catch ( error )
		{
			setAiRes("Oops... We are very sorry, something went wrong please try again ");
			setIsLoading(false);
			throw new Error("Something Went Wrong!!");
		}
	};

	return (
		<>
			<div className="max-w-sm rounded overflow-hidden shadow-lg lg:max-w-full lg:flex lg:w-full sm:w-full" id="openai">
				<div className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full lg:max-w-full">
					<div className="mb-4 pl-8 pr-8 flex items-center justify-center pb-4 flex-col">
						<label className="block text-gray-700 text-xl text-center font-bold mb-2" >
                           Choose Between:<br />"HTML | CSS | JS | TS | React"<br /> Suggestions & Advice 
						</label>
						<select
							className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-3"
							onChange={ e => setTech( e.target.value ) }
							value={ tech } > 
							<option value="HTML">HTML</option>
							<option value="CSS">CSS</option>
							<option value="JavaScript">JavaScript</option>
							<option value="React">React</option>
							<option value="TypeScript">TypeScript</option>
						</select>
						<input
							className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							type="text"
							placeholder="Ask Question FronEnd Tech - HTML, CSS, JavaScript..."
							value={ questionInput }
							onChange={ e => setQuestionInput( e.target.value ) } />
					</div>
					<div className="flex items-center justify-between">
						<button
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 w-full rounded focus:outline-none focus:shadow-outline ml-8 mr-8"
							type="button"
							disabled={isLoading}
							onClick={ () => handleApiAI() }>
                                Press For Answer
						</button>
					</div>
					{ isLoading ? <Loader title={"Please Wait... Answer is coming...."} /> :
						aiRes?.data?.answer.map( ( answer: { text: string; } ) =>
							<div key={ Math.random() } dangerouslySetInnerHTML={{__html: answer.text }} className="text-gray-700 text-base p-8" /> ) 
					}
				</div>
			</div>

		</>
	);
};