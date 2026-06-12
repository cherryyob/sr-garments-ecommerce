import { createSlice } from "@reduxjs/toolkit";

const wishList = createSlice({
  name: "wishList",
  initialState: [],
  reducers: {
    addToWishList: (state, action) => {
      return action.payload;
    },
  },
});
export default wishList;
export const { addToWishList } = wishList.actions;
