import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './App.css'

function App() {
  const [time, setTime] = useState(0); // Time in milliseconds
  const [isRunning, setIsRunning] = useState(false);
  const [timings, setTimings] = useState([]);
  const intervalRef = useRef(null);

  // Fetch previous timings from the backend
  useEffect(() => {
    axios.get('http://localhost:5000/api/timings')
      .then(response => setTimings(response.data))
      .catch(err => console.error('Error fetching timings:', err));
  }, []);

  const start = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 10);
      }, 10);
    }
  };

  const stop = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setTime(0);
  };

  const saveTiming = () => {
    const elapsedTime = time;
    axios.post('http://localhost:5000/api/timings', { elapsedTime })
      .then(response => setTimings([response.data, ...timings]))
      .catch(err => console.error('Error saving timing:', err));
  };

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = (ms % 1000) / 10;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}.${milliseconds < 10 ? '0' : ''}${milliseconds}`;
  };

  return (
    <div className='.hi'>
      <h1>Stopwatch</h1>
      <div style={{ fontSize: '48px', margin: '20px' }}>{formatTime(time)}</div>
      <button onClick={start} disabled={isRunning}>Start</button>
      <button onClick={stop} disabled={!isRunning}>Stop</button>
      <button onClick={reset}>Reset</button>
      <button onClick={saveTiming} disabled={time === 0 || isRunning}>Save Timing</button>

      <h2>Previous Timings</h2>
      <ul>
        {timings.map(timing => (
          <li key={timing._id}>{formatTime(timing.elapsedTime)}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
