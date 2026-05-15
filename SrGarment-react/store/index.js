import { configureStore } from "@reduxjs/toolkit";
import itemsSlice from "./itemSlice";
import fatchingStatusSlice from "./fatchingStatushSlice";
import bagItemSlice from "./bagItemSlice";
import productDetails from "./productDetails";
fatchingStatusSlice;

const srStore = configureStore({
  reducer: {
    store: itemsSlice.reducer,
    faatchStatus: fatchingStatusSlice.reducer,
    bagItemsState: bagItemSlice.reducer,
    productDetailsData: productDetails.reducer,
  },
});
export default srStore;
