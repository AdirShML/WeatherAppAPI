import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedOption, ForecastData } from '../redux/Slices/WeatherSlice';
import './WeatherCompStyle.css';

export const WeatherComp = ({darkMode}) => {
    const dispatch = useDispatch();
    const { options, selectedOption, data, loading, error } = useSelector((state) => state.weather);
    const { selectedChoice, city, latitude, longitude } = useSelector((state) => state.userInput);

    // Handle the change of the selection in the dropdown
    const handleSelectionChange = (e) => {
        dispatch(setSelectedOption(e.target.value));
    };

    const handleButtonClick = () => {
        if (selectedChoice === 'City Name' && city) {
            dispatch(ForecastData({ choice: selectedChoice, value: city }));
        } else if (selectedChoice === 'Coordinates' && latitude && longitude) {
            dispatch(ForecastData({ choice: selectedChoice, value: { latitude, longitude } }));
        } else {
            dispatch(ForecastData({ choice: selectedChoice }));
        }
    };

    return (
        <div className={`weather-comp ${darkMode ? 'dark' : 'light'}`}>
            <label htmlFor="forecast-select" className={`forecast-label ${darkMode ? 'dark' : 'light'}`}>Choose a forecast:</label>
            <select 
                id="forecast-select" 
                onChange={handleSelectionChange} 
                value={selectedOption || ''}
                className={`${darkMode ? 'dark' : 'light'}`}
            >
                <option value="" disabled>Select an option...</option>
                {(options || []).map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>

            {selectedOption && (
            <div>
               <button onClick={handleButtonClick} disabled={loading} className={`button ${darkMode ? 'dark' : 'light'}`}>
               {selectedOption} Forecast
               </button>
            </div>
            )}

            {/* Display loading, error, or data */}
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {data && (
                <div className="weather-container">
                    {data.map((day, index) => (
                        <div key={index} className={`weather-card ${darkMode ? 'dark' : 'light'}`}>
                            <p><strong>Date:</strong> {new Date(day.date).toLocaleDateString()}</p>
                            <p><strong>Temperature:</strong> {day.temperature}°C</p>
                            <p><strong>Humidity:</strong> {day.humidity}%</p>
                            <p><strong>Wind Speed:</strong> {day.wind_speed} m/s</p>
                            <p><strong>Conditions:</strong> {day.weather_conditions}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};