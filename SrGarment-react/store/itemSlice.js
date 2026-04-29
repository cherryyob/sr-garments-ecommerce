import { createSlice } from "@reduxjs/toolkit";
import { defaultItem } from "../data/items";
defaultItem;

const itemsSlice = createSlice({
  name: "home",
  initialState: [defaultItem],
  reducers: {
    addInitialItems: (store, action) => {
      console.log("fatchAll Reducer");
    },
  },
});
export default itemsSlice;
export const addInitialItems = itemsSlice.actions;
