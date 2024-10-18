import {useState, useEffect} from 'react';

const Calendar = () => {
    const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());

   const getDaysInMonth = (month: number, year: number) => {

   };

   const getFirstDayOfMonth = (month: number, year: number) => {

   };

   const generateCalendarDates = () => {

   };

   const handlePrevMonth = () => {
    
   };
   const handleNextMonth = () => {

   };

   const renderCalendar = () => {

   }; 

    return (
        <div>  
            {/* CALENDAR NAVIGATION */}
            <div>
                <button> {/* handlePrevMonth */}</button>
                <span>{/* Current month and year selected */}</span>
                <button> {/* handleNextMonth  */}</button>
            </div> 
            {/* CALENDAR TABLE */}
            <table>
                <thead>
                    <tr>
                        <th>Mon</th>
                        <th>Tue</th>
                        <th>Wed</th>
                        <th>Thur</th>
                        <th>Fri</th>
                        <th>Sat</th>
                        <th>Sun</th>
                    </tr>
                </thead>
                <tbody>
                       {/*  { renderCalendar() } */}
                </tbody>
            </table> 
        </div>
    );
}

export default Calendar;
