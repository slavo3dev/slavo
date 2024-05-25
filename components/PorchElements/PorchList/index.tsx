import React, { useState, useEffect, useContext } from "react";
import UserInfoContext from "@/context/UserInfoContext";
import { PorchDailyUpdate } from "../PorchDailyUpdate"; 
import { PorchType } from "@/Types/PorchTypes";


interface PorchListProps {
  porchs: PorchType[];
  setPorchs: React.Dispatch<React.SetStateAction<PorchType[]>>;
}

export const PorchList: React.FC<PorchListProps> = ({ porchs, setPorchs }) => {
	const { userInfo } = useContext(UserInfoContext);
	const [filtered, setFiltered] = useState<boolean>(false);
	const [dailyUpdates, setDailyUpdates] = useState<PorchType[]>(porchs);
	const [ buttonTitle, setButtonTitle ] = useState<string>( "Track Your Daily Updates" );
    
	useEffect( () => {
		setDailyUpdates( porchs );  
	}, [ porchs ] );

	const sortPorchbyDate = dailyUpdates.sort(
		(a: PorchType, b: PorchType) => {
			const aDate: Date = new Date(a.created_at);
			const bDate: Date = new Date(b.created_at);
			return bDate.getTime() - aDate.getTime();
		},
	);

	const filteringUpdatesPerUser = dailyUpdates.filter((porch: PorchType) => porch.email === userInfo?.email);
	const learningDays = filteringUpdatesPerUser.length;

	const handleFiltering = () => {
		if (filtered) {
			setDailyUpdates(porchs);
			setButtonTitle("All Daily Updates");
		} else {
			setDailyUpdates(filteringUpdatesPerUser);
			setButtonTitle("Track Your Daily Updates");
		}
		setFiltered(!filtered);
	};
    
	return (
		<section className="py-1 sm:py-1 lg:py-1 border-y-4">
			<div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
				<div className="max-w- mx-auto overflow-hidden bg-gray-100 rounded-xl">
					<div className="px-4 py-5 sm:p-6">
						<div>
							<p className="text-lg font-bold text-gray-900">Daily Highlights</p>
							<p className="mt-1 text-sm font-medium text-gray-500">Growth and Learning News</p>
							{userInfo?.email ? (
								<>
									<p className="mt-5 text-lg font-medium text-gray-800">
                    You've been dedicated to learning for <b>{learningDays}</b> days!
									</p>
									<button
										onClick={handleFiltering}
										className="mt-3 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
									>
										{buttonTitle}
									</button>
								</>
							) : null}
						</div>
						<div className="mt-6 space-y-3">
							{sortPorchbyDate.map((porch: PorchType) => (
								<PorchDailyUpdate key={porch.id} porch={porch} setPorchs={setPorchs} />
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
