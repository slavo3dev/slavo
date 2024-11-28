import { FC } from "react";


interface ErrorAlertMsgProps
{
    title: string
}

export const ErrorAlertMsg: FC<ErrorAlertMsgProps> = ( { title } ) =>
{
    

	return (
		<div className="py-12 bg-white">
			<div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
				<div className="max-w-4xl mx-auto">
					<div className="rounded-lg bg-red-50">
						<div className="p-3">
							<div className="flex items-start justify-between">
								<svg className="flex-shrink-0 w-5 h-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
									<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
								</svg>

								<div className="flex-1 ml-3">
									<p className="text-sm font-bold text-red-700">{title}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

	);
};