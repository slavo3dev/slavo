import { useState, useEffect, useContext,useMemo } from 'react';
import WeeklyGoalForm from '../PorchWeeklyGoalForm';
import UserInfoContext from '@/context/UserInfoContext';
import supabase from '@/lib/supabase';
import Calendar from './Calendar';
import { IoIosCloseCircleOutline } from 'react-icons/io';

const PorchUserDataForm = ({ setShowUserForm }: { setShowUserForm: (value: boolean) => void }) => {
    const [showUpdateGoals, setShowUpdateGoals] = useState<boolean>(false);
    const [weeklyGoal, setWeeklyGoal] = useState<number>(1);
    const [currentStreak, setCurrentStreak] = useState<number>(0);
    const [longestStreak, setLongestStreak] = useState<number>(0);
    const [weeklyLearningDays, setWeeklyLearningDays] = useState<number>(0);
    const [learningDates, setLearningDates] = useState<{ date: string; count: number }[]>([]);
    const { userInfo } = useContext(UserInfoContext);


    // Fetch user activity and learning data
    const fetchUserAndLearningData = async () => {

        if (!userInfo?.email) {
            console.warn('No user email available');
            return;
        }

        try {
            const response = await fetch(`/api/getUserActivity?email=${encodeURIComponent(userInfo.email)}`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch user activity');
            }

            const { userActivityData, learningData } = await response.json();

            // Only set weekly_goal if userActivityData exists and has a weekly_goal value
            if (userActivityData?.weekly_goal) {
                setWeeklyGoal(userActivityData.weekly_goal);
            }
            setLongestStreak(userActivityData?.longest_streak ?? 0);

            if (learningData && learningData.length > 0) {
                calculateStreaks(learningData);
                calculateWeeklyLearningDays(learningData);
                setLearningDates(
                    learningData.map((entry: { created_at: string }) => ({
                        date: new Date(entry.created_at).toISOString().split('T')[0],
                        count: 1,
                    }))
                );
            } else {
                // Reset states if no learning data exists
                setCurrentStreak(0);
                setWeeklyLearningDays(0);
                setLearningDates([]);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    // Calculate current streak and longest streak
    const calculateStreaks = (data: { created_at: string }[]) => {
        if (data.length === 0) {
            setCurrentStreak(0);
            setLongestStreak(0);
            return;
        }

        let currentStreak = 0;
        let longestStreak = 0;
        let lastDate: Date | null = null;
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Get unique dates and sort them
        const uniqueDates = Array.from(new Set(data.map(entry => {
            const date = new Date(entry.created_at);
            date.setHours(0, 0, 0, 0);
            return date.toISOString().split('T')[0];
        }))).sort();

        // Convert back to Date objects with explicit typing
        const sortedUniqueDates: Date[] = uniqueDates.map(date => new Date(date));

        sortedUniqueDates.forEach((currentDate: Date) => {
            if (!lastDate) {
                currentStreak = 1;
                lastDate = currentDate;
                return;
            }

            const differenceInDays = Math.floor(
                (currentDate.getTime() - (lastDate as Date).getTime()) / (1000 * 3600 * 24)
            );

            if (differenceInDays === 1) {
                currentStreak += 1;
            } else if (differenceInDays > 1) {
                currentStreak = 1;
            }

            lastDate = currentDate;
            longestStreak = Math.max(longestStreak, currentStreak);
        });

        // Check if the streak is still active (last activity was today or yesterday)
        if (lastDate !== null) {
            const differenceToToday = Math.floor((today.getTime() - (lastDate as Date).getTime()) / (1000 * 3600 * 24));
            if (differenceToToday > 1) {
                currentStreak = 0;
            }
        }

        setCurrentStreak(currentStreak);
        setLongestStreak(longestStreak);
    };
    
    // Calculate weekly learning days
    const calculateWeeklyLearningDays = (data: { created_at: string }[]) => {
        const today = new Date();
        const currentDayOfWeek = today.getDay();
        // Calculate days to subtract to get to Monday (0 = Sunday, 1 = Monday, etc.)
        const daysToSubtract = currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1;
        
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - daysToSubtract);
        startOfWeek.setHours(0, 0, 0, 0);

        // Set today to end of day to include all of today's entries
        today.setHours(23, 59, 59, 999);

        const currentWeekLearningDays = new Set<string>();

        data.forEach((entry: { created_at: string }) => {
            const learningDate = new Date(entry.created_at);
            if (learningDate >= startOfWeek && learningDate <= today) {
                currentWeekLearningDays.add(learningDate.toDateString());
            }
        });

        setWeeklyLearningDays(currentWeekLearningDays.size);
    };

    // Update user activity in the database
    const updateUserActivity = async () => {
        if (!userInfo?.email) {
            console.warn('No user email available');
            return;
        }

        if (currentStreak > longestStreak) {
            setLongestStreak(currentStreak);
        }

        try {
            const response = await fetch('/api/updateUserActivity', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: userInfo.email,
                    weekly_goal: weeklyGoal,
                    longest_streak: longestStreak,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update user activity');
            }

            const data = await response.json();
            
            setShowUserForm(false);
        } catch (error) {
            console.error('Error updating user activity:', error);
            
        }
    };
    
    // Fetch data on mount or when user changes
    useEffect(() => {
        fetchUserAndLearningData();
    }, [userInfo?.email]);


    // Memoize learning dates
    const memoizedLearningDates = useMemo(() => learningDates, [learningDates]);

    if (showUpdateGoals) {
        return (
           <div>
               <WeeklyGoalForm setShowUserForm={setShowUserForm}/>
           </div> 
        )
    }

    return (
        <div className='h-fit w-fit bg-blue-100 p-2 flex flex-col rounded-md'>
            <button className='ml-auto pr-2' onClick={() => setShowUserForm(false)}>
                <IoIosCloseCircleOutline className='h-8 w-8' />
            </button>
            <div className='border-2 p-4 m-2 flex flex-col overflow-hidden bg-white shadow-lg group rounded-xl'>
                <div className='flex flex-row justify-between align-baseline space-x-20'>
                    <h5 className='flex'>Weekly Learning Goals </h5>
                    <a onClick={() => setShowUpdateGoals(true)}>
                        <p className='text-sm font-normal flex hover:underline'>Edit Goal ➡️</p>
                    </a>
                </div>
                <p className='font-bold text-4xl mt-4 flex justify-center'>
                    {weeklyLearningDays} / {weeklyGoal}
                </p>
                <p className='font-bold flex justify-center'>days</p>
                <div className='flex justify-center'>
                    {weeklyLearningDays >= weeklyGoal ? (
                        <p className='text-sm text-center border rounded-full px-2 py-1 w-fit mt-2 bg-green-400'>Nice! 🚀</p>
                    ) : weeklyLearningDays >= Math.floor(weeklyGoal / 2) ? (
                        <p className='text-sm text-center border rounded-full px-2 py-1 w-fit mt-2 bg-yellow-400'>On Track</p>
                    ) : (
                        <p className='text-sm text-center border rounded-full px-2 py-1 w-fit mt-2 bg-red-400'>Off Track</p>
                    )}
                </div>
                {weeklyLearningDays === weeklyGoal ? (
                    <p className='flex justify-center text-xs mt-2'>
                        You hit your goal this week,
                        <span className='font-bold pl-1'> keep the momentum going!</span>
                    </p>
                ) : (
                    <p className='flex justify-center text-xs mt-2'>
                        To hit your goal this week, learn
                        <span className='font-bold pl-1'>{weeklyGoal} times!</span>
                    </p>
                )}
            </div>
            <div className='border-2 p-4 m-2 flex flex-col overflow-hidden bg-white shadow-lg group rounded-xl'>
                <h5>Current Streak</h5>
                <p className='font-bold text-2xl mt-4'>
                    {currentStreak}
                    <span className='font-normal text-sm uppercase pl-2 text-slate-800'>days</span>
                </p>
                <div className='border mt-3 mb-1'></div>
                <div className='flex flex-row justify-between mb-2'>
                    <h4 className=''>✅ Longest Streak</h4>
                    <p className='font-bold'>{longestStreak}</p>
                </div>
            </div>
            <div className='border-2 p-4 m-2 flex flex-col overflow-hidden  bg-white shadow-lg group rounded-xl'>
                <h5 className='mb-4'>Learning Charts</h5>
                <Calendar learningDates={memoizedLearningDates} />
            </div>
        </div>
    );
};

export default PorchUserDataForm;
