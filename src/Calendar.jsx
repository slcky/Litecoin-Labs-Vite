// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import './Calendar.css';

function Calendar() {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [mintingEvents, setMintingEvents] = useState([]);
  const [releasedEvents, setReleasedEvents] = useState([]);
  const [featuredEvents, setFeaturedEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const normalEventsPromise = fetchCSV('https://docs.google.com/spreadsheets/d/e/2PACX-1vR2ZxrRd2m4StGsM9UNvhPSfz8NknnzoOHfOlFEU8BsZHhZiZtvLR9dkvn6U5MhMd2Fg8K6-_-sRRqu/pub?gid=0&single=true&output=csv');
      const featuredEventsPromise = fetchCSV('https://docs.google.com/spreadsheets/d/e/2PACX-1vR2ZxrRd2m4StGsM9UNvhPSfz8NknnzoOHfOlFEU8BsZHhZiZtvLR9dkvn6U5MhMd2Fg8K6-_-sRRqu/pub?gid=1102275214&single=true&output=csv');

      const [normalEvents, featuredEvents] = await Promise.all([normalEventsPromise, featuredEventsPromise]);

      const now = new Date();

      // separate featured, minting, upcoming and released events
      const minting = normalEvents.filter(event => new Date(event.Start) <= now && new Date(event.End) > now);
      const upcoming = normalEvents.filter(event => new Date(event.Start) > now);
      const released = normalEvents.filter(event => new Date(event.End) < now);

      const sortedUpcomingEvents = upcoming.sort((a, b) => new Date(a.Start) - new Date(b.Start));
      const sortedMintingEvents = minting.sort((a, b) => new Date(a.Start) - new Date(b.Start));
      const sortedReleasedEvents = released.sort((a, b) => new Date(a.Start) - new Date(b.Start));

      setUpcomingEvents(sortedUpcomingEvents);
      setMintingEvents(sortedMintingEvents);
      setReleasedEvents(sortedReleasedEvents);
      setFeaturedEvents(featuredEvents);
    };

    const fetchCSV = (url) => {
      return new Promise((resolve, reject) => {
        Papa.parse(url, {
          download: true,
          header: true,
          complete: function(results) {
            resolve(results.data);
          },
          error: function(err) {
            console.error('Error reading CSV file:', err);
            reject(err);
          }
        });
      });
    };

    fetchEvents();
  }, []);

  const handleClick = (url) => {
    window.open(url, '_blank');
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  }  

  const formatEventDates = (start, end) => {
    return `${formatDate(start)} - ${formatDate(end)}`;
  }  

  const isMinting = (event) => {
    const now = new Date();
    return new Date(event.Start) <= now && new Date(event.End) > now;
  };

  const renderEvents = (events, forceMinting = false) => {
    return events.map((event, index) => (
      <div key={index} className="event">
        <img src={event.Image} alt={event.Name} />
        <div>
          <h2>{event.Name}</h2>
          <h3>{formatEventDates(event.Start, event.End)}</h3>
          <h3>Size: {event.Amount}</h3>
          <p>{event.Description}</p>
          <div className="buttons">
            {event.Website && <button onClick={() => handleClick(event.Website)}>Website</button>}
            {event.Twitter && <button onClick={() => handleClick(event.Twitter)}>Twitter</button>}
            {event.Discord && <button onClick={() => handleClick(event.Discord)}>Discord</button>}
            {event.Mintpage && (forceMinting || isMinting(event)) && <button className='button-mint' onClick={() => handleClick(event.Mintpage)}>Mint</button>}
          </div>
        </div>
      </div>
    ));
  }
  
  return (
    <div className="calendar-container">
      <div className="featured-header">
        <h2>FEATURED</h2>
      </div>
      {renderEvents(featuredEvents)}
  
      <div className="minting-header">
        <h2>MINTING</h2>
      </div>
      {renderEvents(mintingEvents, true)}
      
      <div className="upcoming-header">
        <h2>UPCOMING</h2>
      </div>
      {renderEvents(upcomingEvents)}
  
      <div className="released-header">
        <h2>RELEASED</h2>
      </div>
      {renderEvents(releasedEvents)}
    </div>
  );  
}

export default Calendar;
