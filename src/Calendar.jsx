// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import './Calendar.css';

function Calendar() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    Papa.parse('https://docs.google.com/spreadsheets/d/e/2PACX-1vR2ZxrRd2m4StGsM9UNvhPSfz8NknnzoOHfOlFEU8BsZHhZiZtvLR9dkvn6U5MhMd2Fg8K6-_-sRRqu/pub?gid=0&single=true&output=csv', {
      download: true,
      header: true,
      complete: function(results) {
        const sortedEvents = results.data.sort((a, b) => new Date(a.Date) - new Date(b.Date));
        setEvents(sortedEvents);
      },
      error: function(err) {
        console.error('Error reading CSV file:', err);
      }
    });
  }, []);

  return (
    <div className="calendar-container">
      {events.map((event, index) => (
        <div key={index} className="event">
          <img src={event.Image} alt={event.Name} />
          <div>
            <h2>{event.Name}</h2>
            <h3>Release date: {event.Date}</h3>
            <p>{event.Description}</p>
            <a href={event.Website}>Website</a>
            <a href={event.Twitter}>Twitter</a>
            <a href={event.Discord}>Discord</a>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Calendar;
