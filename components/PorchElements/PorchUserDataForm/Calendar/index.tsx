import {useState, useEffect, useContext, FC, ChangeEvent} from 'react';
import { IoMdArrowDown } from "react-icons/io";
import { MdArrowUpward } from "react-icons/md";

// COOL ADD ONS:    
    // On Click for calendar date learned user can get redirected to learning date post

interface CalendarProps {
    learningDates: { date: string; count: number; }[];
}

const Calendar: FC<CalendarProps> = ({ learningDates }) => {
    const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
    const [calendarDates, setCalendarDates] = useState<number[][]>([]);

    const months = [
        "January", 
        "February", 
        "March", 
        "April", 
        "May", 
        "June", 
        "July", 
        "August", 
        "September", 
        "October", 
        "November", 
        "December"
    ];


   const getDaysInMonth = (month: number, year: number) => {
       return new Date(year, month + 1, 0).getDate(); 
   };

   const getFirstDayOfMonth = (month: number, year: number) => {
        return new Date(year, month, 1).getDay();
   };

   const generateCalendarDates = () => {
        const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
        const firstDay = getFirstDayOfMonth(selectedMonth, selectedYear);
        
        // Empty array to hold calendar weeks
        const calendar: number[][] = [];
        let week: number[] = [];

        for (let i = 0; i < firstDay; i += 1) {
            week.push(0); // 0 represents empty days
        }

        // add days of current month 
        for (let day = 1; day <= daysInMonth; day += 1) {
            week.push(day)
            if (week.length === 7) {
                calendar.push(week);
                week = [];
            }
        }

        // if last week is not complete pad with 0s
        if (week.length > 0) {
            while (week.length < 7) {
                week.push(0)
            }
            calendar.push(week)
        }

        setCalendarDates(calendar)
   };

   // update state for prev month
   const handlePrevMonth = () => {
    if (selectedMonth === 0) {
        setSelectedMonth(11);
        setSelectedYear((prev) => prev - 1);
    } else {
        setSelectedMonth((prev) => prev - 1);
    }
    
   };

   // update state for next month
   const handleNextMonth = () => {
    if (selectedMonth === 11) {
        setSelectedMonth(0);
        setSelectedYear((prev => prev + 1));
    } else {
        setSelectedMonth((prev) => prev + 1);
    }
   };

   const handleMonthChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(parseInt(e.target.value))
   }

   const handleYearChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(parseInt(e.target.value))
   }

   /* learningDates = [
        {
            date: Date(),
            count: 0 || 1;
        }
   ] */

   // regenerate calendar dates whenever new selectedMonth or selectedYear
   useEffect(() => {
    generateCalendarDates();
   }, [selectedMonth, selectedYear]);

    // render the actual calendar in html 
   const renderCalendar = () => {
    return calendarDates.map((week, weekIndex) => (
        <tr key={weekIndex} >
            {week.map((day, dayIndex) => {

                const learningDate = learningDates.find((ld) => Number(ld.date.split("-")[2]) === day && Number(ld.date.split("-")[1]) === selectedMonth + 1 && Number(ld.date.split("-")[0]) === selectedYear)
                
                const className = day === 0
                ? 'empty'
                : learningDate
                ? learningDate.count === 1
                    ? 'text-center bg-green-300 pl-2 pr-2 rounded-full'
                    : 'text-center bg-white'
                : 'text-center bg-white'
                return (

                    <td key={dayIndex} className={className}>
                        {day !== 0 ? day : ''}
                    </td>
                )
   })}
        </tr>
    ))
   }; 

    return (
        <div className='flex flex-col'>  
            {/* CALENDAR NAVIGATION */}
            <div className='flex items-center justify-between mb-4'>
                {/* Select date manually -- Need to change to separate component and pop up when clicked*/}
                {/* !!! */}
                <div className='flex flex-col'>
                    <select value={selectedMonth} onChange={handleMonthChange} className=' appearance-none font-semibold'>
                        {months.map((month, index) => (
                            <option key={index} value={index}>{month}</option>
                        ))}
                    </select>
                    <select value={selectedYear} onChange={handleYearChange} className='text-sm font-extralight italic'>
                        {Array.from({ length: 10 }, (_, i) => selectedYear - 5 + i).map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <button onClick={handlePrevMonth} className='border rounded-md px-2 py-1 text-sm hover:bg-slate-200 hover:bg-opacity-50 mr-2'><IoMdArrowDown /></button>
                    <button onClick={handleNextMonth} className='border rounded-md px-2 py-1 text-sm hover:bg-slate-200 hover:bg-opacity-50'><MdArrowUpward /></button>
                </div>
            </div> 
            {/* CALENDAR TABLE */}
            <table className='border-y-2'>
                <thead>
                    <tr className='border-b bg-blue-100'>
                        <th className='text-sm w-[50px]'>S</th>
                        <th className='text-sm w-[50px]'>M</th>
                        <th className='text-sm w-[50px]'>T</th>
                        <th className='text-sm w-[50px]'>W</th>
                        <th className='text-sm w-[50px]'>T</th>
                        <th className='text-sm w-[50px]'>F</th>
                        <th className='text-sm w-[50px]'>S</th>
                    </tr>
                </thead>
                <tbody>
                       {renderCalendar()}
                </tbody>
            </table> 
        </div>
    );
}

export default Calendar;
