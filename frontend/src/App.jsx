import React from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './redux/store'; 
import { UserInputComp } from './components/UserInputComp';
import { WeatherComp } from './components/WeatherComp';
import './App.css';
import { toggleDarkmode } from './redux/Slices/AppSlice';

function App() {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.app.darkMode);

  const handleDarkLightChange = () => {
    dispatch(toggleDarkmode());
  };

  return (
    <Provider store={store}>
      <div className={`App ${darkMode ? 'dark' : 'light'}`}>
        <h1 className={darkMode ? 'green-text' : ''}>Weather App</h1>
        <button onClick={handleDarkLightChange}>
          Switch to {darkMode ? 'Light' : 'Dark'} Mode
        </button>
        <div className={`input-container ${darkMode ? 'dark' : 'light'}`}>
          <UserInputComp darkMode={darkMode} />
        </div>
        <div className={`weather-container ${darkMode ? 'dark' : 'light'}`}>
          <WeatherComp darkMode={darkMode} />
        </div>
        <footer className={`footer ${darkMode ? 'dark' : 'light'}`}>
          <p>Created by Adir</p>
          <p>Email: adirshmuel9@gmail.com</p>
          <p>Github Repo <a href="https://github.com/AdirShML" target="_blank" rel="noopener noreferrer">GitHub</a></p>
          <p>Linkedin <a href="https://www.linkedin.com/in/adir-shmuel9" target="_blank" rel="noopener noreferrer">Linkedin  Profile</a></p>

        </footer>
      </div>
    </Provider>
  );
}

export default App;