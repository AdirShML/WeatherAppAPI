import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { hostName } from "../../utilities/api";

export const ForecastData = createAsyncThunk('weather/fetchForecastData', async (query_data, { rejectWithValue }) => {
  try {
    
    // Send a POST request with both the city and choosen_option in the request body
    const payload = { weather_type: 'forecast', ...query_data }
    const response = await axios.post(`${hostName}/weather/`, { payload });

    return response.data; // Fulfilled payload
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch data'); // Rejected payload
  }
});
const WeatherSlice = createSlice({
  name: 'forecast',
  initialState: {
    options: ['3-Days', '7-Days'],
    selectedOption: null,
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedOption: (state, action) => {
      state.selectedOption = action.payload;
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(ForecastData.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.data = null;
      })
      .addCase(ForecastData.fulfilled, (state, action) => {
        state.loading = false;
        const forecasted = state.selectedOption === '3-Days' ? 3 : 7;
        state.data = action.payload.slice(0, forecasted)
        //state.data = action.payload;
      })
      .addCase(ForecastData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch data';
      });
  },
});

export const { setSelectedOption } = WeatherSlice.actions;
export default WeatherSlice.reducer;