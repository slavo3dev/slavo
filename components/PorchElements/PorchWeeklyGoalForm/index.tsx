import React, { ChangeEvent, useEffect, useState, FC} from 'react';
import PorchUserDataForm from '../PorchUserDataForm';

interface WeeklyGoalFormProps { 
    weeklyGoal: number;
    onUpdateGoals: (newGoal: number) => void;

}
const WeeklyGoalForm: FC<WeeklyGoalFormProps> = ({ weeklyGoal, onUpdateGoals }) => {
    const [close, setClose] = useState<boolean>(false)
    const [newGoal, setNewGoal] = useState<number>(weeklyGoal); 

    useEffect(() => {
        localStorage.setItem('weeklyGoal', String(newGoal));
    }, [newGoal])

    const committed = () => {
        setClose(true);
        console.log('Selected Weekly Goal:', newGoal);
        onUpdateGoals(newGoal); 
    }

    const handleNewGoal = (e: ChangeEvent<HTMLSelectElement>) => {
        setNewGoal(Number(e.target.value));
    }

    if (close) {
        return (
            <>
            <PorchUserDataForm />
            </>
        )
    }


    return (
        <form className='border-2 p-4 m-2 flex flex-col overflow-hidden bg-white rounded-xl'>
            <h4 className='mb-2'>Set your goal</h4>
            <div className='border mb-6'></div>
            <label htmlFor="weekly-goal" className='font-semibold text-sm mb-2'>New Goal</label>
            <div className='flex flex-row'>
                <select name="weekly-goal" id="weekly-goal" className='border rounded p-2 w-fit' value={newGoal} onChange={handleNewGoal}>
                    {Array.from({length: 7}, (_, i) => (
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
