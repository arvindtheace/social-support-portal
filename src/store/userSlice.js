// src/store/userSlice.js
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

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUserData: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetUserData: () => initialState,
  },
});

export const { saveUserData, resetUserData } = userSlice.actions;
export default userSlice.reducer;
