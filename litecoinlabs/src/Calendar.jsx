// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import './Calendar.css'; 

function Calendar() {
    const [date, setDate] = useState(new Date());

    const daysInMonth = (date) => {
        return 32 - new Date(date.getFullYear(), date.getMonth(), 32).getDate();
    };

    const firstDayOfMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const getMonthName = (date) => {
        return date.toLocaleString('default', { month: 'long' });
    };

    const generateCalendar = (date) => {
        const days = daysInMonth(date);
        const prevMonthDays = daysInMonth(new Date(date.getFullYear(), date.getMonth()-1));
        const month = getMonthName(date);
        const firstDay = firstDayOfMonth(date);

        let calendar = [];
        for (let i = 0; i < firstDay; i++) {
            calendar.unshift({day: prevMonthDays-i, inMonth: false});
        }
        for (let i = 1; i <= days; i++) {
            calendar.push({day: i, inMonth: true});
        }

        // Fill the remaining days with the start days of the next month
        let nextMonthDay = 1;
        while (calendar.length < 42) {
            calendar.push({day: nextMonthDay++, inMonth: false});
        }

        return { month, year: date.getFullYear(), days: calendar };
    };

    const [calendar, setCalendar] = useState(generateCalendar(date));

    useEffect(() => {
        setCalendar(generateCalendar(date));
    }, [date]);

    const nextMonth = () => {
        setDate(new Date(date.setMonth(date.getMonth() + 1)));
    };

    const prevMonth = () => {
        setDate(new Date(date.setMonth(date.getMonth() - 1)));
    };

    return (
        <div className="calendar-container">
            <div className="calendar-grid">
                {calendar.days.map((day, index) => (
                    <div key={index} className={`calendar-day ${day.inMonth ? 'in-month' : ''}`}>{day.day}</div>
                ))}
            </div>
            <div className="calendar-footer">
                <button onClick={prevMonth}>&lt;</button>
                <span>{calendar.month} {calendar.year}</span>
                <button onClick={nextMonth}>&gt;</button>
            </div>
        </div>
    );
}

export default Calendar;
