import { useState, useEffect, useContext} from 'react';
import WeeklyGoalForm from '../PorchWeeklyGoalForm';
import UserInfoContext from '@/context/UserInfoContext';
import supabase from '@/lib/supabase';
import Calendar from './Calendar';
import { IoIosCloseCircleOutline } from "react-icons/io";

//!!!
// General 
    // need to update styles depending on screen size 
        // phone 
        // tablet
        // computer


const PorchUserDataForm= ({setShowUserForm}: any) => {
    const [showUpdateGoals, setShowUpdateGoals] = useState<boolean>(false);
    const [weeklyGoal, setWeeklyGoal] = useState<number>(1);
    const [currentStreak, setCurrentStreak] = useState<number>(0);
    const [longestStreak, setLongestStreak] = useState<number>(0);
    const [weeklyLearningDays, setWeeklyLearningDays] = useState<number>(0);
    const [learningDates, setLearningDates] = useState<{date: string; count: number}[]>([]);



    const { userInfo } = useContext(UserInfoContext)

    useEffect(() => {
        const storedGoal = localStorage.getItem('weeklyGoal');
        if (storedGoal) {
            setWeeklyGoal(Number(storedGoal));
        };
    }, []);

    // grabbing the post created at time by user eamil in ascending order
    useEffect(() => {
        const fetchConsecutiveLearningDays = async () => {
            if (userInfo?.email) {
                const { data, error } = await supabase
                    .from("porch")
                    .select("created_at")
                    .eq("email", userInfo.email)
                    .order("created_at", {ascending: true});
                
                if (error) {
                    console.log("Error fetching consecutive learning days", error)
                } else {
                    console.log(data)
                    let currentStreak = 0;
                    let longestStreak = 0;
                    let lastDate: Date | null = null;
                    
                    // for each created at entry per user in porch what is the difference in days between the last post and the ucrrent post 
                    data.forEach((entry: {created_at: string}) => {
                        const currentDate = new Date(entry.created_at);

                        if (lastDate) {
                            let differenceInDays = (currentDate.getTime() - lastDate.getTime()) / (1000 * 3600 * 24);

                            if (differenceInDays === 1) {
                                currentStreak += 1

                            } else if (differenceInDays > 1) {
                                currentStreak = 1
                            }
                        } else {
                            currentStreak = 1;
                        }

                        lastDate = currentDate;
                        longestStreak = Math.max(longestStreak, currentStreak)

                    });
                    setCurrentStreak(currentStreak);
                    setLongestStreak(longestStreak);
                }
            }
        };
        fetchConsecutiveLearningDays();
    }, [userInfo?.email])

    // grabbing posts by created-at time by user in ascending order 
    useEffect(() => {
        const fetchWeeklyLearningDays = async () => {
            if (userInfo?.email) {
                const { data, error } = await supabase
                    .from("porch")
                    .select("created_at")
                    .eq("email", userInfo.email)
                    .order("created_at", {ascending: true});
                
                if (error) {
                    console.log("Error fetching consecutive learning days", error)
                } else {
                    console.log(data)

                    const currentWeekLearningDays = new Set<string>(); // using set only concerned with unique values
                    const today = new Date(); 
                    const currentDayOfWeek = today.getDay(); // 0-7 ; 0 = sunday ... 
                    const startOfWeek = new Date(today); 
                    startOfWeek.setDate(today.getDate() - currentDayOfWeek); // subtracting current day of week from current day to get day of start of week
                    
                    
                    // for each created-at entry per user in porch what is the the total amount of entries for the current given week
                    data.forEach((entry: {created_at: string}) => {
                        const learningDate = new Date(entry.created_at);

                        // check to see if learning date is within the current week
                        if (learningDate >= startOfWeek && learningDate <= today) {
                            currentWeekLearningDays.add(learningDate.toDateString());
                        }

                    });
                    setWeeklyLearningDays(currentWeekLearningDays.size)
                }
            }
        };
        fetchWeeklyLearningDays();
    }, [userInfo?.email]);


	useEffect(() => {
		const fetchLearningDates = async () => {
			if (userInfo?.email) {
				const { data, error } = await supabase
					.from("porch")
					.select("created_at")
					.eq("email", userInfo.email);

				if (error) {
					console.error("Error fetching learning days from Supabase:", error);
				} else {
                    const formattedDate = data.map((entry: {created_at: string}) => ({
                        date: new Date(entry.created_at).toISOString().split('T')[0],
                        count: 1
                    }))
					setLearningDates(formattedDate);
				}
			}
		};
		fetchLearningDates();
	}, [userInfo?.email]);

    // !!!
    // State Machine
        // where to keep state 
        // learn about state machine 
        // learn abotu redux / contact
        // refactor code to make database pulls more efficient



    if (showUpdateGoals) {
        return (
           <div>
               <WeeklyGoalForm />
           </div> 
        )
    }

    return (
        <div className='h-fit w-fit bg-blue-100 p-2 flex flex-col rounded-md'>
            <button className="ml-auto pr-2" onClick={() => setShowUserForm(false)}>
                <IoIosCloseCircleOutline className='h-8 w-8'/>
            </button>
            <div className='border-2 p-4 m-2 flex flex-col overflow-hidden bg-white shadow-lg group rounded-xl'>
                <div className='flex flex-row justify-between align-baseline space-x-20'>
                    <h5 className='flex'>Weekly Learning Goals </h5>
                    <a onClick={() => setShowUpdateGoals(true)}><p className='text-sm font-normal flex hover:underline'>Edit Goal ➡️</p></a>
                </div>
                <p className='font-bold text-4xl mt-4 flex justify-center'>{weeklyLearningDays} / {weeklyGoal}</p>
                <p className='font-bold flex justify-center'>days</p>
                <div className='flex justify-center'>
                       { weeklyLearningDays >= weeklyGoal ? (
                            <p className='text-sm text-center border rounded-full px-2 py-1 w-fit mt-2 bg-green-400'>
                                Nice! 🚀
                            </p>
                       ) : weeklyLearningDays >= Math.floor(weeklyGoal / 2) ? (
                            <p className='text-sm text-center border rounded-full px-2 py-1 w-fit mt-2 bg-yellow-400'>
                                On Track
                            </p> 
                       ) : (
                            <p className='text-sm text-center border rounded-full px-2 py-1 w-fit mt-2 bg-red-400'>
                                Off Track
                            </p>
                       )
                       }
                </div>
                { weeklyLearningDays === weeklyGoal ? (
                          <p className='flex justify-center text-xs mt-2'>
                            You hit your goal this week, 
                            <span className='font-bold pl-1'> keep the momentum going!</span>
                          </p>
                    ) : (
                        <p className='flex justify-center text-xs mt-2'>
                            To hit your goal this week, learn
                            <span className='font-bold pl-1'>{weeklyGoal} times!</span>
                         </p>
                    )
                }
            </div>
            <div className='border-2 p-4 m-2 flex flex-col overflow-hidden bg-white shadow-lg group rounded-xl'>
                <h5>🔥 Current Streak</h5>
                <p className='font-bold text-2xl mt-4'>{currentStreak}<span className='font-normal text-sm uppercase pl-2 text-slate-800'>days</span></p>
                <div className='border mt-3 mb-1'></div>
                <div className='flex flex-row justify-between mb-2'>
                    <h4 className=''>✅ Longest Streak</h4>
                    <p className='font-bold'>{longestStreak}</p>
                </div>
            </div>
            <div className='border-2 p-4 m-2 flex flex-col overflow-hidden  bg-white shadow-lg group rounded-xl'>
                <h5 className='mb-4'>Learning Charts</h5>

                {/* Need to use the learning dates array 
                of objects to render charts here */}
                <Calendar learningDates = {learningDates} />
            </div>
        </div>
    );
}

export default PorchUserDataForm;
 
// Need to delete package-lock.json 
// reinstall yarn install again
