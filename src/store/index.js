import { configureStore } from '@reduxjs/toolkit'
import userReducer from './personalInfoSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
})