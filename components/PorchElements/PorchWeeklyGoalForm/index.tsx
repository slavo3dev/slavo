import React, { ChangeEvent, useEffect, useState } from 'react';
import PorchUserDataForm from '../PorchUserDataForm';
import supabase from '@/lib/supabase'; // Adjust the import based on your project setup

const WeeklyGoalForm = ({setShowUserForm}: any) => {
    const [close, setClose] = useState<boolean>(false);
    const [weeklyGoal, setWeeklyGoal] = useState<number>(1); // Default to 1
    const [loading, setLoading] = useState<boolean>(true); // Track loading state
    const userEmail = "user@example.com"; // Replace with logic to get the logged-in user's email

    // Fetch the current weekly goal from Supabase
    useEffect(() => {
        const fetchWeeklyGoal = async () => {
            try {
                const { data, error } = await supabase
                    .from('user_activity')
                    .select('weekly_goal')
                    .eq('email', userEmail)
                    .single();

                if (error) {
                    console.error("Error fetching weekly goal:", error);
                    return;
                }

                if (data?.weekly_goal) {
                    setWeeklyGoal(data.weekly_goal);
                }
            } catch (err) {
                console.error("Error during fetch:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchWeeklyGoal();
    }, [userEmail]);

    // Update weekly goal in Supabase
    const handleNewGoal = async (e: ChangeEvent<HTMLSelectElement>) => {
        const newGoal = Number(e.target.value);
        setWeeklyGoal(newGoal);

        try {
            const { error } = await supabase
                .from('user_activity')
                .update({ weekly_goal: newGoal })
                .eq('email', userEmail);

            if (error) {
                console.error("Error updating weekly goal:", error);
            }
        } catch (err) {
            console.error("Error during update:", err);
        }
    };

    const committed = () => {
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
        <form className="border-2 p-4 m-2 flex flex-col overflow-hidden bg-white rounded-xl">
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
                    onClick={() => setClose(true)}
                    className="border border-black text-sm rounded-full px-2 py-1 hover:bg-gray-100"
                >
                    Close
                </button>
                <button
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
