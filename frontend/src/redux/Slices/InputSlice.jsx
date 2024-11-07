import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { hostName } from "../../utilities/api";

// Async thunk to fetch data based on user choice
export const getInputData = createAsyncThunk('weather/getInputData', async (query_data, { rejectWithValue }) => {
  try {

    const payload = { weather_type: 'weather', ...query_data }
    const response = await axios.post(`${hostName}/weather/`, { payload });
    return response.data; // Fulfilled payload

  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch data'); // Rejected payload
  }
});

const InputSlice = createSlice({
  name: 'Input',
  initialState: {
    choices: ['City Name', 'Coordinates', 'GeoLocation'],
    selectedChoice: null,
    latitude: null,
    longitude: null,
    city: '',
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedChoice: (state, action) => {
      state.selectedChoice = action.payload;
      state.data = null; // Reset data on new selection
      state.error = null; // Reset error on new selection
    },
    setCity: (state, action) => {
      state.city = action.payload;
    },
    setLatitude: (state, action) => {
      state.latitude = action.payload;
    },
    setLongitude: (state, action) => {
      state.longitude = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getInputData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getInputData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.city = action.payload.city;
      })
      .addCase(getInputData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch data';
      });
  },
});

export const { setSelectedChoice, setCity, setLatitude, setLongitude, setForecastDays } = InputSlice.actions;
export default InputSlice.reducer;