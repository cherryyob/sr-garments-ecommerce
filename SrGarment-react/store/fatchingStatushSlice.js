import { createSlice } from "@reduxjs/toolkit";

const fatchingStatusSlice = createSlice({
  name: "fatchingStatus",
  initialState: { fatchgDone: false, currantlyFatching: false },
  reducers: {
    markFatchDone: (state) => {
      state.fatchgDone = true;
    },
    fatchingOnWay: (state) => {
      state.currantlyFatching = true;
    },
    fatchingFinished: (state) => {
      state.currantlyFatching = false;
    },
  },
});
export const { markFatchDone, fatchingOnWay, fatchingFinished } =
  fatchingStatusSlice.actions;
export default fatchingStatusSlice;
