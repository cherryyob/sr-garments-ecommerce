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
export const handelRemoveButton = async (id, dispatch) => {
  const response = await fetch("http://localhost:3000/removeItemById", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });
  const updatedBagCount = await response.json();
  dispatch(addingToBag(updatedBagCount));
  dispatch(removeFromFullDetails(id));
};
export default bagItemSlice;
export const { addingToBag, addItemFullDetails, removeFromFullDetails } =
  bagItemSlice.actions;
