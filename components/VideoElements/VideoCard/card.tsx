import { FC } from "react";
import { cardTypes } from "@/lib/types";

import Link from "next/link";

export const VideoCard : FC<cardTypes> = ({imgUrl,title,name,videoURL})=>{

	return(
		<>
			<Link href={videoURL}>
				<div className="w-64 h-72 m-6 mb-0 shrink-0 transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110  duration-400">
					<div className="overflow-hidden rounded-t-xl ">
						<img className="rounded-t-xl -mt-4 -mb-4 overflow-hidden"
							src={imgUrl || "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1340&q=80"}
							width={"600"}
							height={"400"}
							alt={"Video Image"} />
					</div>
					<div className="bottom-1 bg-white opacity-75 border rounded-b-xl pl-4 text-black font-semibold  ">
						<span className=" bottom-4  title-font w-5/6 sm:w-96 ">
							<p>{title}</p>
						</span><p className="text-slate-400">{name}</p>
					</div>

					
				</div>
			</Link>
		</>
	);
};