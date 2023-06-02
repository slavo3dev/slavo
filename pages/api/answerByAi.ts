import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";


type Data = {
    answer: {
        response: {
            data: {
                choices: string
            }
        };
    };
}

export default async function handler( req: NextApiRequest, res: NextApiResponse<Data>) {

	const config = new Configuration({
		apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY
	} );
    
	const question = req.body.questionInput ? req.body.questionInput : "";
	const tech = req.body.tech;
	const openAi = new OpenAIApi( config );

	const response: any = await openAi.createCompletion( {
		model: "text-davinci-003",
		temperature: 0,
		max_tokens: 3600,
		prompt: `As a profesinal Mentor and Software Engineer answare the question about FRONTEND Development, also about techologies like HTML, CSS, JavaScript, React, REST API, TYPESCRIPT. 
        Please answare with examples and in depth.
        Quesetion is: ${ question }. About this tech: ${ tech }
        the resposne should be formatted to HTML.
        Do not answare to any question if is not related to HTML, CSS, JavaScript, TypeScript, REST API, FrontEnd Development, React, React Native`
	} );
    
	res.status(200).json({ answer: response.data.choices });  

}