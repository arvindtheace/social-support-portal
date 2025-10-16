import { configureStore } from '@reduxjs/toolkit'
import personalInfoReducer from './personalInfoSlice';
import financialInfoReducer from './financialInfoSlice';

export const store = configureStore({
  reducer: {
    personalInfo: personalInfoReducer,
    financialInfo: financialInfoReducer,
  },
})