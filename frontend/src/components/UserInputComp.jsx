import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedChoice, getInputData, setCity, setLatitude, setLongitude } from '../redux/Slices/InputSlice';
import './UserInputCompStyle.css'



export const UserInputComp = ({darkMode}) => {
  const dispatch = useDispatch();
  const { choices, selectedChoice, data, loading, error, latitude, longitude, city } = useSelector((state) => state.userInput);

  const handleSelectionChange = (event) => {
    const choice = event.target.value;
    dispatch(setSelectedChoice(choice));
    dispatch(setCity('')); // Reset city input
    dispatch(setLatitude('')); // Reset latitude input
    dispatch(setLongitude('')); // Reset longitude input
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedChoice === 'City Name' && city) {
      dispatch(getInputData({ choice: 'City Name', value: city }));
    } else if (selectedChoice === 'Coordinates' && latitude && longitude) {
      dispatch(getInputData({ choice: 'Coordinates', value: { latitude, longitude } }));
    } else if (selectedChoice === 'GeoLocation') {
      dispatch(getInputData({ choice: 'GeoLocation' }));
    } else {
      alert('Please fill in the required fields.');
    }
  };

  return (
    <div className={`input-container ${darkMode ? 'dark' : 'light'}`}>
    <h2 className={darkMode ? 'dark' : 'light'}>Select an Input Option</h2>
    <select 
      onChange={handleSelectionChange} 
      value={selectedChoice || ''} 
      className={darkMode ? 'dark' : 'light'}
    >
      <option value="" disabled>Select an option...</option>
      {choices.map((choice, index) => (
        <option key={index} value={choice}>
          {choice}
        </option>
      ))}
    </select>

    <form onSubmit={handleSubmit}>
      {selectedChoice === 'City Name' && (
        <div>
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => dispatch(setCity(e.target.value))}
            required
            className={darkMode ? 'dark' : 'light'}
          />
        </div>
      )}

      {selectedChoice === 'Coordinates' && (
        <div>
          <input
            type="text"
            placeholder="Enter latitude"
            value={latitude}
            onChange={(e) => dispatch(setLatitude(e.target.value))}
            required
            className={darkMode ? 'dark' : 'light'}
          />
          <input
            type="text"
            placeholder="Enter longitude"
            value={longitude}
            onChange={(e) => dispatch(setLongitude(e.target.value))}
            required
            className={darkMode ? 'dark' : 'light'}
          />
        </div>
      )}

      {selectedChoice && (
        <button type="submit" disabled={loading} className={darkMode ? 'dark' : 'light'}>
          {loading ? 'Loading...' : 'Search'}
        </button>
      )}
    </form>

    {error && <p style={{ color: 'red' }}>{error}</p>}
    {data && (
      <div className={`weather-card ${darkMode ? 'dark' : 'light'}`} style={{ marginTop: '20px', padding: '20px' }}>
        <h3 className={darkMode ? 'dark' : 'light'}>Weather Data:</h3>
        <p><strong>City:</strong> {data.city}</p>
        <p><strong>Temperature:</strong> {data.temperature}°C</p>
        <p><strong>Humidity:</strong> {data.humidity}%</p>
        <p><strong>Wind Speed:</strong> {data.wind_speed} m/s</p>
        <p><strong>Conditions:</strong> {data.weather_conditions}</p>
      </div>
    )}
  </div>
  );
};