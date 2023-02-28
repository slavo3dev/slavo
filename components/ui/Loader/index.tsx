import { FC } from "react";


interface LoaderProp {
    title: string
}

export const Loader: FC<LoaderProp> = ( { title = "Loading..." } ) =>  {
	return (
		<div className="flex items-center justify-center p-10 flex-col">
			<div className="flex items-center justify-center p-8">
				<div className="spinner-border animate-spin inline-block w-12 h-12 border-4 text-black" role="status">
				</div>
			</div>
			<p className= "text-black text-lg animate-ping p-4">{title}</p>
		</div>
	);
};