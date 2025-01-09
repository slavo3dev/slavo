import { useState, useEffect, useContext } from 'react';
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

    // Function to fetch user activity and set initial state
    const fetchUserActivity = async () => {
        if (userInfo?.email) {
            const { data, error } = await supabase
                .from('user_activity')
                .select('weekly_goal, current_streak, longest_streak, weekly_learning_days')
                .eq('user_email', userInfo.email)
                .single();

            if (error) {
                console.error('Error fetching user activity:', error);
            } else if (data) {
                setWeeklyGoal(data.weekly_goal || 1);
                setCurrentStreak(data.current_streak || 0);
                setLongestStreak(data.longest_streak || 0);
                setWeeklyLearningDays(data.weekly_learning_days || 0);
            }
        }
    };

    // Function to fetch learning data and calculate streaks and weekly learning days
    const fetchLearningData = async () => {
        if (userInfo?.email) {
            const { data, error } = await supabase
                .from('porch')
                .select('created_at')
                .eq('email', userInfo.email)
                .order('created_at', { ascending: true });

            if (error) {
                console.error('Error fetching learning data:', error);
                return;
            }

            calculateStreaks(data);
            calculateWeeklyLearningDays(data);
            setLearningDates(
                data.map((entry: { created_at: string }) => ({
                    date: new Date(entry.created_at).toISOString().split('T')[0],
                    count: 1,
                }))
            );
        }
    };

    // Calculate current streak and longest streak
    const calculateStreaks = (data: { created_at: string }[]) => {
        let currentStreak = 0;
        let longestStreak = 0;
        let lastDate: Date | null = data.length > 0 ? new Date(data[0].created_at) : null;

        data.forEach((entry: { created_at: string }, index) => {
            const currentDate = new Date(entry.created_at);
            const differenceInDays = lastDate ? (currentDate.getTime() - lastDate.getTime()) / (1000 * 3600 * 24) : 0;

            if (differenceInDays === 1 || index === 0) {
                currentStreak += 1;
            } else if (differenceInDays > 1) {
                currentStreak = 1;
            }

            lastDate = currentDate;
            longestStreak = Math.max(longestStreak, currentStreak);
        });

        setCurrentStreak(currentStreak);
        setLongestStreak(longestStreak);
    };

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
        if (userInfo?.email) {
            const { error } = await supabase
                .from('user_activity')
                .upsert({
                    user_email: userInfo.email,
                    ...updatedData,
                    updated_at: new Date().toISOString(),
                });

            if (error) {
                console.error('Error updating user activity:', error);
            }
        }
    };

    // Combine all updates into one effect
    useEffect(() => {
        if (userInfo?.email) {
            updateUserActivity({ currentStreak, longestStreak, weeklyGoal, weeklyLearningDays });
        }
    }, [currentStreak, longestStreak, weeklyGoal, weeklyLearningDays, userInfo?.email]);

    // Fetch user activity and learning data on mount or when user changes
    useEffect(() => {
        fetchUserActivity();
        fetchLearningData();
    }, [userInfo?.email]);

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
                <Calendar learningDates={learningDates} />
            </div>
        </div>
    );
};

export default PorchUserDataForm;
