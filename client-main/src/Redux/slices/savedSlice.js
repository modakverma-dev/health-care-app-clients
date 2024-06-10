import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  savedArticleArray: [],
};

const savedSlice = createSlice({
  name: 'saved',
  initialState: initialState,
  reducers: {
    setSavedArticles: (state, action) => {
      state.savedArticleArray = action.payload;
    },
  },
});

export default savedSlice.reducer;

export const { setSavedArticles } = savedSlice.actions;
