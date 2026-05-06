import { createSlice } from "@reduxjs/toolkit";

const bagItemSlice = createSlice({
  name: "bagItem",
  initialState: { bageItemId: [], bagItemFullDetails: [] },
  reducers: {
    addingToBag: (state, action) => {
      state.bageItemId = action.payload;
    },
    addItemFullDetails: (state, action) => {
      state.bagItemFullDetails = action.payload;
    },
  },
});
export default bagItemSlice;
export const { addingToBag, addItemFullDetails } = bagItemSlice.actions;
