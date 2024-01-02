import { FC, useState , useContext} from "react";
import supabase from "@/lib/supabase";
import UserInfoContext from "@/context/UserInfoContext";


interface FreeSourceTypeProps {
    fact: {
        like: number,
        exelent: number, 
        id: number, 
        false: number,
        text: string,
        source: string, 
        category: string
    };
    setFacts: () => void;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const FreeSource: FC<FreeSourceTypeProps> = ({ fact, setFacts }: any) => {
	const [isUpdating, setIsUpdating] = useState(false);
	const badSource =
        fact.like + fact.exelent < fact.false;
    
	const { userInfo } = useContext(UserInfoContext);
   
	async function handleVote ( columnName: string )
	{
		if ( userInfo?.email)
		{
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
		} else
		{
			alert("Please Login or Verify email address");
		}
          
	}

	return (
		<>
			{badSource ? <span className='badsource'>[ ⛔️ BAD SOURCE ]</span> : null}
			<div className="max-w-sm rounded overflow-hidden shadow-lg bg-blue-100 p-2 hover:bg-slate-100 transition-duration: 900ms;">
				<div className="px-2 py-2">
					<div className="font-bold text-xl mb-2">{fact.category.toUpperCase()}</div>
					<p className="text-gray-700 text-base">
						{fact.text}
					</p>
					<div className="font-bold text-sm mt-3">
						<a
							href={fact.source.includes("http") ? fact.source : `//${fact.source}`}
							target="_blank"
							className="text-sm hover:bg-sky-100 whitespace-normal break-words"
						>
              Source: {fact.source.length > 60 ? fact.source.slice(0, 60) + "..." : fact.source}
						</a>
					</div>
				</div>
				<div>
					<button 
						className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
						onClick={() => handleVote("like")}
						disabled={ isUpdating } >
                        👍 { fact.like }
					</button>
					<button
						className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
						onClick={() => handleVote("exelent")}
						disabled={ isUpdating }>
                        🤯 {fact.exelent}
					</button>
					<button
						className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
						onClick={() => handleVote("false")} disabled={isUpdating} >
                        ⛔️ {fact.false}
					</button>
				</div>
			</div>
		</>
	);
};