import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [cities, setCities] = useState([]);
  const [name, setName] = useState('');
  const [temperature, setTemperature] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    const response = await axios.get('http://localhost:5000/cities');
    setCities(response.data);
  };

  const addCity = async (e) => {
    e.preventDefault();
    const newCity = { name, temperature, description };
    await axios.post('http://localhost:5000/cities', newCity);
    setName('');
    setTemperature('');
    setDescription('');
    fetchCities();
  };

  return (
    <div>
      <h1>Weather App</h1>
      <form onSubmit={addCity}>
        <input
          type="text"
          placeholder="City Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Temperature"
          value={temperature}
          onChange={(e) => setTemperature(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Weather Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit">Add City</button>
      </form>
      <ul>
        {cities.map((city) => (
          <li key={city._id}>
            {city.name}: {city.temperature}°C, {city.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
