import { createSlice } from "@reduxjs/toolkit";

const fatchingStatusSlice = createSlice({
  name: "fatchingStatus",
  initialState: { fatchgDone: false, currantlyFatching: false },
  reducers: {
    markFatchDone: (state) => {
      return (state.fatchingDone = true);
    },
    fatchingOnWay: (state) => {
      return (state.currantlyFatching = true);
    },
    fatchingFinished: (state) => {
      return (state.currantlyFatching = false);
    },
  },
});
export const { markFatchDone, fatchingOnWay, fatchingFinished } =
  fatchingStatusSlice.actions;
export default fatchingStatusSlice;
