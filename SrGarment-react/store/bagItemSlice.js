import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

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
    removeFromFullDetails: (state, action) => {
      state.bagItemFullDetails = state.bagItemFullDetails.filter(
        (item) => item.idName !== action.payload,
      );
    },
  },
});

export default bagItemSlice;
export const { addingToBag, addItemFullDetails, removeFromFullDetails } =
  bagItemSlice.actions;
