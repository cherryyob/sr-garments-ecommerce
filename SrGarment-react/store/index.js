import { configureStore } from "@reduxjs/toolkit";
import itemsSlice from "./itemSlice";
import fatchingStatusSlice from "./fatchingStatushSlice";
import bagItemSlice from "./bagItemSlice";
import productDetails from "./productDetails";
import authSlice from "./authSlice";
fatchingStatusSlice;

const srStore = configureStore({
  reducer: {
    store: itemsSlice.reducer,
    faatchStatus: fatchingStatusSlice.reducer,
    bagItemsState: bagItemSlice.reducer,
    productDetailsData: productDetails.reducer,
    auth: authSlice.reducer,
  },
});
export default srStore;
