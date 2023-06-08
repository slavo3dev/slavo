import { FC } from "react";


interface LoaderProp {
    title: string
}

export const Loader: FC<LoaderProp> = ( { title = "Loading..." } ) =>  {
	return (
		<div className="flex items-center justify-center p-10 flex-col">
			<div className="flex items-center justify-center p-8">
				<div className="spinner-border rounded bg-blue-500 animate-spin inline-block w-16 h-16 border-6 text-black" role="status">
				</div>
			</div>
			<p className= "text-sky-800 text-lg animate-ping p-4">{title}</p>
		</div>
	);
};