import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isLoggedIn: false,
  user: JSON.parse(localStorage.getItem("user")) || null,
};

const authSlice = createSlice({
  name: "authIsLoggedIn",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});
export default authSlice;
export const { login, logout } = authSlice.actions;
