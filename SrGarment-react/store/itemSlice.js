import { createSlice } from "@reduxjs/toolkit";
import { defaultItem } from "../data/items";
defaultItem;

const itemsSlice = createSlice({
  name: "home",
  initialState: [],
  reducers: {
    addInitialItems: (store, action) => {
      return (store = action.payload);
      console.log("fatchAll Reducer", action);
    },
  },
});
export default itemsSlice;
export const { addInitialItems } = itemsSlice.actions;
