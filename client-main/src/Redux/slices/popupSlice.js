import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  logoutPopup: false,
  openScanner: false,
};

const popupSlice = createSlice({
  name: "popup",
  initialState: initialState,
  reducers: {
    setLogout: (state, action) => {
      state.logoutPopup = action.payload.logoutPopup;
    },
    setOpenScanner: (state, action) => {
      console.log("inside afsdfa");
      state.openScanner = action.payload.openScanner;
    },
  },
});

export default popupSlice.reducer;

export const { setLogout, setOpenScanner } = popupSlice.actions;
