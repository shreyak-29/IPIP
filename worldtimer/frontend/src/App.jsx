import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'

function App() {
  const [cities, setCities] = useState([]);
  const [times, setTimes] = useState({});

  // Fetch the cities from the backend
  useEffect(() => {
    axios.get('http://localhost:5000/api/cities')
      .then(response => setCities(response.data))
      .catch(err => console.error('Error fetching cities:', err));
  }, []);

  const now = new Date();  //to get local time

  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => {
      const newTimes = {};
      cities.forEach(city => {
        const time = new Intl.DateTimeFormat('en-US', {
          timeZone: city.timezone,   //specify time zone
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        }).format(new Date());         //to get local computer time
        newTimes[city.name] = time;
      });
      setTimes(newTimes);
    }, 1000);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [cities]);

  return (
    <div className='.time'>
      <h1>World Timer</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {cities.map(city => (
          <li key={city._id} style={{ fontSize: '24px', margin: '10px 0' }}>
            {city.name}: {times[city.name] || 'Loading...'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
