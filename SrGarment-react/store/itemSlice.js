import { createSlice } from "@reduxjs/toolkit";

const itemsSlice = createSlice({
  name: "home",
  initialState: [],
  reducers: {
    addInitialItems: (store, action) => {
      return action.payload;
    },
  },
});
export default itemsSlice;
export const { addInitialItems } = itemsSlice.actions;
