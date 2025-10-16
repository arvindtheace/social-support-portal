import { configureStore } from '@reduxjs/toolkit'
import personalInfoReducer from './personalInfoSlice';
import financialInfoReducer from './financialInfoSlice';
import situationInfoReducer from './situationInfoSlice';

export const store = configureStore({
  reducer: {
    personalInfo: personalInfoReducer,
    financialInfo: financialInfoReducer,
    situationInfo: situationInfoReducer,
  },
})