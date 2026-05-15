import { createSlice } from "@reduxjs/toolkit";

const productDetails = createSlice({
  name: "productDetailsName",
  initialState: [],
  reducers: {
    productDetailsAction: (state, action) => {
      return action.payload;
    },
  },
});
export default productDetails;
export const { productDetailsAction } = productDetails.actions;
