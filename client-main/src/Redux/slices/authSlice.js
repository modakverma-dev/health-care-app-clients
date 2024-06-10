import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {},
  token: null,
  tempUserDetails: {
    token: null,
    email: '',
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setTempUserDetails: (state, action) => {
      const { email, token } = action.payload;
      state.tempUserDetails = { email, token };
    },
    clearTempUserDetails: (state, action) => {
      state.tempUserDetails.token = null;
      state.tempUserDetails.email = '';
    },
    setCreds: (state, action) => {
      state.token = action.payload.token;
    },
    setUser: (state, action) => {
      state.user = action.payload.user;
    },
    clearUser: (state, payload) => {
      state.token = '';
      state.phoneNumber = '';
      state.user = {};
      state.storeName = '';
      state.showFeedbackPopup = true;
    },
  },
});

export default authSlice.reducer;

export const {
  setCreds,
  setUser,
  clearUser,
  setTempUserDetails,
  clearTempUserDetails,
} = authSlice.actions;
