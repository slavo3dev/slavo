import { FC } from "react";
import { formattedDate } from "@/lib/helpers";
import { PostHeaderType } from "Types/PostType";
import { HeadBasePage } from "@/components/HeadBasePage";

export const PostHeader: FC<PostHeaderType> = ({ title, category, data, excerpt}) =>
{   
	return (
		<>
			<HeadBasePage title={ title } description={excerpt} />
			<header className="max-w-xl mx-auto text-center">
				<nav className="flex items-center justify-center">
					<div className="flex items-center space-x-2">
						<a href="/" target="_blank" title="Home Page" className="text-base font-medium text-gray-900"> Home </a>
						<div className="flex items-center">
							<svg className="w-5 h-5 text-gray-900 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
								<path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
							</svg>
							<a href={`/category/${category.toLowerCase().replace(" ", "-")}`} target="_blank" title={category} className="ml-2 text-base font-medium text-gray-900"> {category} </a>
						</div>
						<div className="flex items-center">
							<svg className="w-5 h-5 text-gray-900 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
								<path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
							</svg>
							<a href="/contact" target="_blank" title="Contact us" className="ml-2 text-base font-medium text-gray-500"> Contact us </a>
						</div>
					</div>
				</nav>
				<div className="max-w-xl mx-auto text-center">
					<h1 className="mt-6 text-4xl font-bold text-gray-900 sm:text-5xl">{title}</h1>
					<div className="flex items-center justify-center mt-8 space-x-2">
						<p className="text-base font-medium text-gray-900">
							<a href={`/category/${category.toLowerCase().replace( " ", "-")}` } title="" className="">{ category }</a>
						</p>
						<span className="text-base font-medium text-gray-500"> • </span>
						<p className="text-base font-medium text-gray-500">{formattedDate(data)}</p>
					</div>
				</div>
			</header>
		</>
	);
};
