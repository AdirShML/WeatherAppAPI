import { createSlice } from '@reduxjs/toolkit';

const AppSlice = createSlice({
  name: 'App',
  initialState: {
    darkMode: false,
  },
  reducers: {
    setDarkmode: (state, action) => {
      state.darkMode = action.payload;
    },
    toggleDarkmode: (state) => {
      state.darkMode = !state.darkMode;
    },
  }
});

export const { setDarkmode, toggleDarkmode } = AppSlice.actions;
export const selectDarkMode = (state) => state.App.darkMode;
export default AppSlice.reducer;