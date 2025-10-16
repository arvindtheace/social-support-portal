// src/store/personalInfoSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  nationalId: '',
  dob: '',
  gender: '',
  address: '',
  city: '',
  state: '',
  country: '',
  phone: '',
  email: '',
};

const personalInfoSlice = createSlice({
  name: 'personalInfo',
  initialState,
  reducers: {
    savePersonalInfo: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetUserData: () => initialState,
  },
});

export const { savePersonalInfo, resetUserData } = personalInfoSlice.actions;
export default personalInfoSlice.reducer;
