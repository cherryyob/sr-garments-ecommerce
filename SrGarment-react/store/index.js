import { configureStore } from "@reduxjs/toolkit";
import itemsSlice from "./itemSlice";
import fatchingStatusSlice from "./fatchingStatushSlice";
import bagItemSlice from "./bagItemSlice";
fatchingStatusSlice;

const srStore = configureStore({
  reducer: {
    store: itemsSlice.reducer,
    faatchStatus: fatchingStatusSlice.reducer,
    bagItemsState: bagItemSlice.reducer,
  },
});
export default srStore;
