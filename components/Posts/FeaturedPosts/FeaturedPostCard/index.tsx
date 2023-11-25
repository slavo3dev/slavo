
import { FC } from "react";
import { PostType } from "@/Types/PostType";
import { formattedDate } from "@/lib/helpers";

export const FeaturedPostCard: FC<PostType> = ( { post } ) =>
{

	const { title, image, date, category, slug } = post;
    
    
	return (
		<div className="group border border-gray-100 hover:-translate-y-1 rounded-xl p-3 shadow hover:shadow-lg">
			<a href={ `/blog/${ slug }` } title="" className="block overflow-hidden aspect-w-16 aspect-h-9 rounded-xl">
				<img className="object-cover w-full h-full transition-all duration-200 transform group-hover:scale-110" src={`/images/post-img/${image}`} alt={title} />
			</a>
			<div className="flex items-center mt-6 space-x-2">
				<p className="text-sm font-medium text-gray-900">
					<a href="#" title={title} className="">{category}</a>
				</p>
				<span className="text-sm font-medium text-gray-900"> • </span>
				<p className="text-sm font-medium text-gray-900">{ formattedDate(date) }</p>
			</div>
			<p className="mt-4 text-xl font-bold text-gray-900 group-hover:text-gray-600">
				<a href={ `/blog/${ slug }` } title="" className="">{title}</a>
			</p>
		</div>
	);
};