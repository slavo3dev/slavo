/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import remarkGfm from "remark-gfm";
import { PostHeader } from "../PostHeader";
import { PostImage } from "../PostImage";
import ReactMarkdown from "react-markdown";
import { HeadBasePage } from "@/components/HeadBasePage";
import { customRenderers } from "@/lib/formatText";


interface PostContentDataType {
    post: {
        image: string;
        title: string;
        category: string;
        date: string;
        content: string;
        excerpt: string;
    }
}

export const PostContent: FC<PostContentDataType> = ({ post }) => {
	const imgPath = `/images/post-img/${ post.image }`;
    
	return (
		<>
			<HeadBasePage title={ `Blog Title: ${ post.title } | Career Change: Learn Web for a Bright Future` } description={post.excerpt} />
			<article className={ "py-12 bg-white sm:py-16 lg:py-20" }>
				<div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
					<PostHeader title={ post.title } imgSrc={ imgPath } category={ post.category } data={ post.date } excerpt={post.excerpt} />
					<PostImage title={ post.title } imgSrc={ imgPath } />
					<div className="grid grid-cols-1 mt-8 sm:mt-12 lg:mt-16 lg:grid-cols-12 lg:gap-x-12 gap-y-8">
						<div className="lg:col-span-2 lg:self-start lg:sticky lg:top-24 lg:order-last">
							<div className="flex space-x-3 lg:space-x-0 lg:space-y-4 lg:flex-col lg:items-center">
							
								<a href="https://twitter.com/slavo3dev" target="_blank" title="slavo.io twitter" className="inline-flex items-center justify-center w-10 h-10 text-gray-900 transition-all duration-200 border border-gray-200 rounded-full hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900">
									<span className="sr-only"> Twitter </span>
									<svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
										<path
											d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z"
										></path>
									</svg>
								</a>
							
							
								<a href="https://www.instagram.com/slavo_3/" title="slavo.io Instagram" target="_blank" className="inline-flex items-center justify-center w-10 h-10 text-gray-900 transition-all duration-200 border border-gray-200 rounded-full hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900">
									<span className="sr-only"> Instagram </span>
									<svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 30 30">
										<path fill="#000000" d="M 8.808594 0 C 4.238281 0 0.484375 3.75 0.484375 8.324219 L 0.484375 19.984375 C 0.484375 24.550781 4.234375 28.304688 8.808594 28.304688 L 20.46875 28.304688 C 25.035156 28.304688 28.789062 24.558594 28.789062 19.984375 L 28.789062 8.324219 C 28.789062 3.753906 25.039062 0 20.46875 0 Z M 8.808594 2.574219 L 20.46875 2.574219 C 23.648438 2.574219 26.21875 5.140625 26.21875 8.324219 L 26.21875 19.984375 C 26.21875 23.164062 23.648438 25.734375 20.46875 25.734375 L 8.808594 25.734375 C 5.625 25.734375 3.058594 23.164062 3.058594 19.984375 L 3.058594 8.324219 C 3.058594 5.140625 5.625 2.574219 8.808594 2.574219 Z M 22.238281 5.386719 C 21.589844 5.386719 21.070312 5.90625 21.070312 6.554688 C 21.070312 7.203125 21.589844 7.71875 22.238281 7.71875 C 22.886719 7.71875 23.402344 7.203125 23.402344 6.554688 C 23.402344 5.90625 22.886719 5.386719 22.238281 5.386719 Z M 14.636719 6.433594 C 10.390625 6.433594 6.917969 9.90625 6.917969 14.152344 C 6.917969 18.398438 10.390625 21.875 14.636719 21.875 C 18.882812 21.875 22.355469 18.398438 22.355469 14.152344 C 22.355469 9.90625 18.882812 6.433594 14.636719 6.433594 Z M 14.636719 9.007812 C 17.496094 9.007812 19.785156 11.292969 19.785156 14.152344 C 19.785156 17.011719 17.496094 19.300781 14.636719 19.300781 C 11.777344 19.300781 9.492188 17.011719 9.492188 14.152344 C 9.492188 11.292969 11.777344 9.007812 14.636719 9.007812 Z M 14.636719 9.007812 " fill-opacity="1" fill-rule="nonzero" />
									</svg>
								</a>
							

							
								<a href="https://www.linkedin.com/in/slavopopovic/" title="slavo.io - LinkedIn" target="_blank" className="inline-flex items-center justify-center w-10 h-10 text-gray-900 transition-all duration-200 border border-gray-200 rounded-full hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900">
									<span className="sr-only"> LinkedIn </span>
									<svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
										<path
											d="M20 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM8.339 18.337H5.667v-8.59h2.672v8.59zM7.003 8.574a1.548 1.548 0 1 1 0-3.096 1.548 1.548 0 0 1 0 3.096zm11.335 9.763h-2.669V14.16c0-.996-.018-2.277-1.388-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248h-2.667v-8.59h2.56v1.174h.037c.355-.675 1.227-1.387 2.524-1.387 2.704 0 3.203 1.778 3.203 4.092v4.71z"
										></path>
									</svg>
								</a>
							
							
								<a href="https://discord.gg/KXVHbAeb" target="_blank" title="slavo discord" className="inline-flex items-center justify-center w-10 h-10 text-gray-900 transition-all duration-200 border border-gray-200 rounded-full hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900">
									<span className="sr-only"> Discord </span>
									<svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
										<path
											d="M14.82 4.26a10.14 10.14 0 0 0-.53 1.1 14.66 14.66 0 0 0-4.58 0 10.14 10.14 0 0 0-.53-1.1 16 16 0 0 0-4.13 1.3 17.33 17.33 0 0 0-3 11.59 16.6 16.6 0 0 0 5.07 2.59A12.89 12.89 0 0 0 8.23 18a9.65 9.65 0 0 1-1.71-.83 3.39 3.39 0 0 0 .42-.33 11.66 11.66 0 0 0 10.12 0q.21.18.42.33a10.84 10.84 0 0 1-1.71.84 12.41 12.41 0 0 0 1.08 1.78 16.44 16.44 0 0 0 5.06-2.59 17.22 17.22 0 0 0-3-11.59 16.09 16.09 0 0 0-4.09-1.35zM8.68 14.81a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.93 1.93 0 0 1 1.8 2 1.93 1.93 0 0 1-1.8 2zm6.64 0a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.92 1.92 0 0 1 1.8 2 1.92 1.92 0 0 1-1.8 2z"
										></path>
									</svg>
								</a>
							
							</div>
						</div>

						<div className="hidden lg:block lg:col-span-2"></div>

						<article
							className="prose lg:col-span-8 max-w-none prose-gray prose-blockquote:px-8 prose-blockquote:py-3 prose-blockquote:lg:text-xl prose-blockquote:font-medium prose-blockquote:text-gray-900 prose-blockquote:border-gray-900 prose-blockquote:border-l-2 prose-blockquote:lg:leading-9 prose-blockquote:not-italic prose-blockquote:bg-gray-100 prose-blockquote:text-lg prose-blockquote:leading-8">
							<ReactMarkdown remarkPlugins={ [ remarkGfm ] } components={ customRenderers } linkTarget='_blank'>{post.content}</ReactMarkdown>
						</article>
					</div>
				</div>
			</article>
		</>
	);
};



