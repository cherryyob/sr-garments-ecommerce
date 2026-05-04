import { createSlice } from "@reduxjs/toolkit";

const bagItemSlice = createSlice({
  name: "bagItem",
  initialState: [],
  reducers: {
    addingToBag: (state, action) => {
      return action.payload;
    },
  },
});
export default bagItemSlice;
export const { addingToBag } = bagItemSlice.actions;
