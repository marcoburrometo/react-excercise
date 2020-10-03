import { createSlice } from '@reduxjs/toolkit';
import { UiState } from '../Interfaces/ui';

const UiSlice = createSlice({
  initialState: {
    showLoader: false,
    theme: 'light',
  } as UiState,
  name: 'ui',
  reducers: {
    showLoader: (state) => {
      state.showLoader = true;
    },
    hideLoader: (state) => {
      state.showLoader = false;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
    },
  },
});

export const { hideLoader, showLoader, toggleTheme } = UiSlice.actions;

export default UiSlice.reducer;
