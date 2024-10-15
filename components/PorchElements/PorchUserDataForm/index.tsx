import { useState, useEffect, useContext} from 'react';
import Image from 'next/image';
import WeeklyGoalForm from '../PorchWeeklyGoalForm';
import UserInfoContext from '@/context/UserInfoContext';
import supabase from '@/lib/supabase';

//!!!
// General 
    // need to update styles depending on screen size 
        // phone 
        // tablet
        // computer


const PorchUserDataForm= () => {
    const [showUpdateGoals, setShowUpdateGoals] = useState<boolean>(false);
    const [weeklyGoal, setWeeklyGoal] = useState<number>(1);
    const [currentStreak, setCurrentStreak] = useState<number>(0);
    const [longestStreak, setLongestStreak] = useState<number>(0);

    const { userInfo } = useContext(UserInfoContext)

    useEffect(() => {
        const storedGoal = localStorage.getItem('weeklyGoal');
        if (storedGoal) {
            setWeeklyGoal(Number(storedGoal));
        };
    }, []);


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
    // !!!
    // WEEKLY LEARNING GOALS 
        // need to update weekly learning days when edit goal is changed or when user submits daily update
        // need to create functionality for off/track button 
            // when goal is completed turn green -> Good Job (or something)
            // when goal is halfway turn yellow -> almost there / on track
            // otherwise less than halfway towards goal still offtrack
    // HEATMAP
        // need to implement and create heatmap 
            // need to use user data 
                // update the day they submitted the update with the corresponding day in heatmap 
    if (showUpdateGoals) {
        return (
           <div>
               <WeeklyGoalForm />
           </div> 
        )
    }

    return (
        <div className='h-fit w-fit bg-blue-100 p-2 flex flex-col rounded-md'>
            <div className='border-2 p-4 m-2 flex flex-col overflow-hidden bg-white shadow-lg group rounded-xl'>
                <div className='flex flex-row justify-between align-baseline space-x-20'>
                    <h5 className='flex'>Weekly Learning Goals </h5>
                    <a onClick={() => setShowUpdateGoals(true)}><p className='text-sm font-normal flex hover:underline'>Edit Goal ➡️</p></a>
                </div>
                <p className='font-bold text-4xl mt-4 flex justify-center'>0/{weeklyGoal}</p>
                <p className='font-bold flex justify-center'>days</p>
                <div className='flex justify-center'>
                    <p className='text-sm text-center border rounded-full px-2 bg-red-300 w-fit mt-2'>Off Track</p>
                </div>
                <p className='flex justify-center text-xs mt-2'>To hit your goal this week, learn<span className='font-bold pl-1'>{weeklyGoal} times!</span></p>
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
                <h5 className='mb-4'>Heatmap</h5>
                <Image
                src='/images/components/winter.png'
                alt='fake heatmap'
                width={400}
                height={200}
                />
            </div>
        </div>
    );
}

export default PorchUserDataForm;
