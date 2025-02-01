import React, { ChangeEvent, useEffect, useState, useContext } from 'react';
import PorchUserDataForm from '../PorchUserDataForm';
import supabase from '@/lib/supabase'; // Adjust the import based on your project setup
import UserInfoContext from '@/context/UserInfoContext';

const WeeklyGoalForm = ({setShowUserForm}: { setShowUserForm: (value: boolean) => void }) => {
    const [close, setClose] = useState<boolean>(false);
    const [weeklyGoal, setWeeklyGoal] = useState<number>(1); // Default to 1
    const [loading, setLoading] = useState<boolean>(true); // Track loading state
    const { userInfo } = useContext(UserInfoContext)
    
    // Fetch the current weekly goal from Supabase
    useEffect(() => {
        const fetchWeeklyGoal = async () => {
            if (userInfo?.email) {
              try {
                const response = await fetch(`/api/getUserActivity?email=${encodeURIComponent(userInfo.email)}`);
                const { userActivityData } = await response.json();

                if (userActivityData?.weekly_goal) {
                    setWeeklyGoal(userActivityData.weekly_goal);
                }

                if (userActivityData?.weekly_goal) {
                    setWeeklyGoal(userActivityData.weekly_goal);
                }
            } catch (err) {
                console.error("Error during fetch:", err);
            } finally {
                setLoading(false);
            }
            }
         
        };

        fetchWeeklyGoal();
    }, [userInfo?.email]);

    // Update weekly goal in Supabase
    const handleNewGoal = async (e: ChangeEvent<HTMLSelectElement>) => {
        const newGoal = Number(e.target.value);
        setWeeklyGoal(newGoal);
        
        if (!userInfo?.email) return;

        try {
            // First check if the user record exists
            const response = await fetch(`/api/getUserActivity?email=${encodeURIComponent(userInfo.email)}`);
            const { userActivityData } = await response.json();

            if (userActivityData) {
                // Update existing record
                const response = await fetch('/api/updateUserActivity', {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: userInfo.email,
                        weekly_goal: newGoal,
                    }),
                }); 
           
                if (!response.ok) throw new Error('Failed to update weekly goal');
            } else {
                // Create new record
                const { error: insertError } = await supabase
                    .from('user_activity')
                    .insert([{ 
                        user_email: userInfo.email, 
                        weekly_goal: newGoal 
                    }]);

                if (insertError) throw insertError;
            }
        } catch (err) {
            console.error("Error updating weekly goal:", err);
        }
    };

    const committed = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault(); // Prevent form submission
        setClose(true);
        console.log('Selected Weekly Goal:', weeklyGoal);
    };

    if (close) {
        return <PorchUserDataForm setShowUserForm={setShowUserForm}/>;
    }

    if (loading) {
        return <p>Loading...</p>; // Show a loading state while fetching data
    }

    return (
        <form 
            className="border-2 p-4 m-2 flex flex-col overflow-hidden bg-white rounded-xl"
            onSubmit={(e) => e.preventDefault()}
        >
            <h4 className="mb-2">Set your goal</h4>
            <div className="border mb-6"></div>
            <label htmlFor="weekly-goal" className="font-semibold text-sm mb-2">New Goal</label>
            <div className="flex flex-row">
                <select
                    name="weekly-goal"
                    id="weekly-goal"
                    className="border rounded p-2 w-fit"
                    value={weeklyGoal}
                    onChange={handleNewGoal}
                >
                    {Array.from({ length: 7 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                            {i + 1}
                        </option>
                    ))}
                </select>
                <p className="pt-3 pl-2 text-xs">days learned per week</p>
            </div>
            <div className="mt-8 flex flex-row justify-between space-x-20">
                <button
                    type="button" // Explicitly set button type
                    onClick={() => setClose(true)}
                    className="border border-black text-sm rounded-full px-2 py-1 hover:bg-gray-100"
                >
                    Close
                </button>
                <button
                    type="submit" // Make this the submit button
                    onClick={committed}
                    className="border bg-blue-200 text-sm rounded-full px-2 py-1 hover:bg-opacity-75"
                >
                    I'm Committed
                </button>
            </div>
        </form>
    );
};

export default WeeklyGoalForm;
