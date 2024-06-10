import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoriesData: [],
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categoriesData = action.payload;
    },
  },
});

export default categoriesSlice.reducer;

export const { setCategories } = categoriesSlice.actions;
