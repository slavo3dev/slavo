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
    const [isUpdating, setIsUpdating] = useState(false);
    const { userInfo } = useContext(UserInfoContext);


      // Fetch user activity and learning data
      const fetchUserAndLearningData = async () => {
        if (!userInfo?.email) return;
    
        try {
            const { data: userActivityData, error: activityError } = await supabase
                .from('user_activity')
                .select('weekly_goal, current_streak, longest_streak, weekly_learning_days')
                .eq('user_email', userInfo.email)
                .single(); // Ensure only one row is returned
    
            if (activityError) {
                console.error('Error fetching user activity:', activityError);
                return;
            }
    
            if (userActivityData) {
                setWeeklyGoal(userActivityData.weekly_goal || 1);
                setCurrentStreak(userActivityData.current_streak || 0);
                setLongestStreak(userActivityData.longest_streak || 0);
                setWeeklyLearningDays(userActivityData.weekly_learning_days || 0);
            }
    
            // Fetch learning data (this can still return multiple rows)
            const { data: learningData, error: learningError } = await supabase
                .from('porch')
                .select('created_at')
                .eq('email', userInfo.email)
                .order('created_at', { ascending: true });
    
            if (learningError) {
                console.error('Error fetching learning data:', learningError);
                return;
            }
    
            if (learningData) {

                calculateStreaks(learningData);
                calculateWeeklyLearningDays(learningData);
                setLearningDates(
                    learningData.map(entry => ({
                        date: new Date(entry.created_at).toISOString().split('T')[0],
                        count: 1,
                    })) // this returns [{data: yyyy-mm-dd, count: 1},{...}]
                );
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    

    // Calculate current streak and longest streak
    const calculateStreaks = (data: { created_at: string }[]) => {
        let currentStreak = 0;
        let longestStreak = 0;
        let lastDate: Date | null = null;
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Sort data by date in ascending order
        const sortedData = [...data].sort((a, b) => 
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );

        sortedData.forEach((entry) => {
            const currentDate = new Date(entry.created_at);
            currentDate.setHours(0, 0, 0, 0);

            if (!lastDate) {
                currentStreak = 1;
                lastDate = currentDate;
                return;
            }

            const differenceInDays = Math.floor((currentDate.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));

            if (differenceInDays === 1) {
                currentStreak += 1;
            } else if (differenceInDays > 1) {
                currentStreak = 1;
            }

            lastDate = currentDate;
            longestStreak = Math.max(longestStreak, currentStreak);
        });
        if (lastDate) {
            const differenceToToday = Math.floor((today.getTime() - (lastDate as Date).getTime()) / (1000 * 3600 * 24));
            if (differenceToToday > 1) {
                currentStreak = 0;
            }
        }

        setCurrentStreak(currentStreak);
        setLongestStreak(longestStreak);
    };
    // Steps:
    // First Entry (2025-01-01):
    
    // differenceInDays = 0 (first entry).
    // currentStreak = 1.
    // longestStreak = 1.
    // Second Entry (2025-01-02):
    
    // differenceInDays = 1 (consecutive day).
    // currentStreak = 2.
    // longestStreak = 2.
    // Third Entry (2025-01-04):
    
    // differenceInDays = 2 (gap of more than one day).
    // currentStreak = 1 (reset).
    // longestStreak = 2 (unchanged).
    // Fourth Entry (2025-01-05):
    
    // differenceInDays = 1 (consecutive day).
    // currentStreak = 2.
    // longestStreak = 2 (unchanged).



    // Calculate weekly learning days
    const calculateWeeklyLearningDays = (data: { created_at: string }[]) => {
        const today = new Date();
        const currentDayOfWeek = today.getDay();
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - currentDayOfWeek);

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
    const updateUserActivity = async (updatedData: Partial<Record<string, any>>) => {
        if (!userInfo?.email) {
            console.warn('No user email provided for update.');
            return;
        }

        try {
            // First check if the record exists
            const { data: existingData } = await supabase
                .from('user_activity')
                .select()
                .eq('user_email', userInfo.email);

            if (existingData && existingData.length > 0) {
                // Update existing record
                const { data, error } = await supabase
                    .from('user_activity')
                    .update({
                        current_streak: updatedData.currentStreak,
                        longest_streak: updatedData.longestStreak,
                        weekly_goal: updatedData.weeklyGoal,
                        weekly_learning_days: updatedData.weeklyLearningDays
                    })
                    .eq('user_email', userInfo.email);
                if (error) throw error;
            } else {
                // Insert new record
                const { data, error } = await supabase
                    .from('user_activity')
                    .insert({
                        user_email: userInfo.email,
                        current_streak: updatedData.currentStreak,
                        longest_streak: updatedData.longestStreak,
                        weekly_goal: updatedData.weeklyGoal,
                        weekly_learning_days: updatedData.weeklyLearningDays
                    });
                if (error) throw error;
            }
        } catch (err) {
            console.error('Error updating user activity:', err);
        }
    };
    
    
    
    

    // Debounce updates to user activity
    useEffect(() => {
        if (!isUpdating) {
            setIsUpdating(true);
            updateUserActivity({ currentStreak, longestStreak, weeklyGoal, weeklyLearningDays }).finally(() => {
                setIsUpdating(false);
            });
        }
    }, [currentStreak, longestStreak, weeklyGoal, weeklyLearningDays]);

 
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
                <h5>🔥 Current Streak</h5>
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
