import { configureStore } from '@reduxjs/toolkit';
import InputReducer from './Slices/InputSlice';
import WeatherReducer from './Slices/WeatherSlice';
import AppReducer from './Slices/AppSlice';



export const store = configureStore({
    reducer: {
        userInput: InputReducer,
        weather: WeatherReducer,
        app: AppReducer
    }
    
})

export default store;