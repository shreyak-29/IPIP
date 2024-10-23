import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';  // Ensure this is imported

const BMICalculator = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [records, setRecords] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/bmi/calculate', {
        height: parseFloat(height),
        weight: parseFloat(weight),
      });
      setBmi(response.data.bmi);
      fetchRecords(); // Refresh the records
    } catch (error) {
      console.error('Error calculating BMI:', error);
    }
  };

  const fetchRecords = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/bmi/records');
      setRecords(response.data);
    } catch (error) {
      console.error('Error fetching records:', error);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <div className="bmi-container">
      <h1>BMI Calculator</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Height (m)"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          required
        />
        <br />
        <input
          type="number"
          placeholder="Weight (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          required
        />
        <br />
        <button type="submit">Calculate BMI</button>
      </form>

      {bmi && <h2>Your BMI: {bmi}</h2>}

      <h3>Previous Records</h3>
      <ul>
        {records.map((record) => (
          <li key={record._id}>
            Height: {record.height} m, Weight: {record.weight} kg, BMI: {record.bmi}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BMICalculator;
