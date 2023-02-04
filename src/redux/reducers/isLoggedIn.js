import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogedIn: false,
  userName: "",
  userID: "",
  userEmail: "",
};

const loggedSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_LOGGED_IN(state, action) {
      const { name, ID, email } = action.payload;
      state.isLogedIn = true;
      state.userName = name;
      state.userEmail = email;
      state.userID = ID;
    },
    REMOVE_LOGGED_IN(state) {
      state.isLogedIn = false;
      state.userName = "";
      state.userEmail = "";
      state.userID = "";
    },
  },
});
export const { SET_LOGGED_IN, REMOVE_LOGGED_IN } = loggedSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLogedIn;
export const selectEmail = (state) => state.auth.userEmail;
export const selectUserName = (state) => state.auth.userName;
export const selectUserID = (state) => state.auth.userID;

export default loggedSlice.reducer;
