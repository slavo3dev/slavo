import React from 'react';
import Image from 'next/image';

const PorchUserDataForm = () => {
    
    // !!!
    // WEEKLY LEARNING GOALS 
        // Need edit goal functionality with separate form to adjust learning goal 
        // need to update weekly learning days when edit goal is changed or when user submits daily update
        // need to create functionality for off/track button 
            // when goal is completed turn green -> Good Job (or something)
            // when goal is halfway turn yellow -> almost there / on track
            // otherwise less than halfway towards goal still offtrack
        // need to update text in hit goal to learn the goal amount of time
    // CURRENT STREAK 
        // need to update {count} with number of consecutive days user has learned/updated on porch
        // longest streak{count} is equal to current streak 
            // unless streak is broken than curr streak resets to 0 and long streak is set to prev curr streak 
            // or prev streak is greater than curr streak so long streak = prev streak 
            // or curr streak is greater than prev-streak and long streak = curr streak again.
    // HEATMAP
        // need to implement and create heatmap 
            // need to use user data 
                // update the day they submitted the update with the corresponding day in heatmap 


    return (
        <div className='h-fit w-fit bg-blue-100 p-2 flex flex-col rounded-md'>
            <div className='border-2 p-4 m-2 flex flex-col overflow-hidden bg-white shadow-lg group rounded-xl'>
                <div className='flex flex-row justify-between align-baseline space-x-20'>
                    <h5 className='flex'>Weekly Learning Goals </h5>
                    <a href=""><p className='text-sm font-normal flex hover:underline'>Edit Goal ➡️</p></a>
                </div>
                <p className='font-bold text-4xl mt-4 flex justify-center'>0/4</p>
                <p className='font-bold flex justify-center'>days</p>
                <div className='flex justify-center'>
                    <p className='text-sm text-center border rounded-full px-2 bg-red-300 w-fit mt-2'>Off Track</p>
                </div>
                <p className='flex justify-center text-xs mt-2'>To hit your goal this week, learn<span className='font-bold pl-1'>goal-4 times!</span></p>
            </div>
            <div className='border-2 p-4 m-2 flex flex-col overflow-hidden bg-white shadow-lg group rounded-xl'>
                <h5>🔥 Current Streak</h5>
                <p className='font-bold text-2xl mt-4'>{"{count}"}<span className='font-normal text-sm uppercase pl-2 text-slate-800'>days</span></p>
                <div className='border mt-3 mb-1'></div>
                <div className='flex flex-row justify-between'>
                    <h4 className=''>✅ Longest Streak</h4>
                    <p className='font-bold'>{"{count}"}</p>
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
