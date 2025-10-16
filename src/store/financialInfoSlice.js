import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  maritalStatus: '',
  dependents: '',
  employmentStatus: '',
  monthlyIncome: '',
  housingStatus: '',
};

const financialInfo = createSlice({
  name: 'personalInfo',
  initialState,
  reducers: {
    saveFinancialInfo: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetFinancialInfo: () => initialState,
  },
});

export const { saveFinancialInfo, resetFinancialInfo } = financialInfo.actions;
export default financialInfo.reducer;