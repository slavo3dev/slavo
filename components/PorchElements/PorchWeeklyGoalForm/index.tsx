import React, { ChangeEvent, useEffect, useState, FC } from 'react';
import PorchUserDataForm from '../PorchUserDataForm';

interface WeeklyGoalFormProps { 
    daysLeft: number; 
}

const WeeklyGoalForm: FC<WeeklyGoalFormProps> = ({daysLeft}) => {
    const [close, setClose] = useState<boolean>(false)
    const [weeklyGoal, setWeeklyGoal] = useState<number>(() => {
        const storedGoal = localStorage.getItem('weeklyGoal');
        return storedGoal ? Number(storedGoal) : 1
    })

    useEffect(() => {
        localStorage.setItem('weeklyGoal', String(weeklyGoal));
    }, [weeklyGoal])

    const committed = () => {
        setClose(true);
        console.log('Selected Weekly Goal:', weeklyGoal);
    }

    const handleNewGoal = (e: ChangeEvent<HTMLSelectElement>) => {
        setWeeklyGoal(Number(e.target.value));
    }

    if (close) {
        return (
            <PorchUserDataForm />
        )
    }


    return (
        <form className='border-2 p-4 m-2 flex flex-col overflow-hidden bg-white rounded-xl'>
            <h4 className='mb-2'>Set your goal</h4>
            <div className='border mb-6'></div>
            <label htmlFor="weekly-goal" className='font-semibold text-sm mb-2'>New Goal</label>
            <div className='flex flex-row'>
                <select name="weekly-goal" id="weekly-goal" className='border rounded p-2 w-fit' value={weeklyGoal} onChange={handleNewGoal}>
                    {Array.from({length: daysLeft}, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                            {i + 1}
                        </option>
                    ))}
                </select>
                <p className='pt-3 pl-2 text-xs'>days learned per week</p>
            </div>
            <div className='mt-8 flex flex-row justify-between space-x-20'>
                <button onClick={() => setClose(true)} className='border border-black text-sm rounded-full px-2 py-1 hover:bg-gray-100'>Close</button>
                <button onClick={committed} className='border bg-blue-200 text-sm rounded-full px-2 py-1 hover:bg-opacity-75'>I'm Committed</button>
            </div>
        </form>
    );
}

export default WeeklyGoalForm;
