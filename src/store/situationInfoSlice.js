import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  financial: '',
  employment: '',
  reason: '',
};

const situationInfo = createSlice({
  name: 'situationInfo',
  initialState,
  reducers: {
    saveSituationInfo: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetSituationInfo: () => initialState,
  },
});

export const { saveSituationInfo, resetSituationInfo } = situationInfo.actions;
export default situationInfo.reducer;