import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  refreshing: false,
};

const commonSlice = createSlice({
  name: 'common',
  initialState: initialState,
  reducers: {
    setRefreshing: (state, action) => {
      return {
        ...state,
        refreshing: action.payload,
      };
    },
  },
});

export default commonSlice.reducer;

export const { setRefreshing } = commonSlice.actions;
