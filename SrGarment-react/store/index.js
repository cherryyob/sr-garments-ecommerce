import { configureStore } from "@reduxjs/toolkit";
import itemsSlice from "./itemSlice";
import fatchingStatusSlice from "./fatchingStatushSlice";
fatchingStatusSlice;

const srStore = configureStore({
  reducer: {
    store: itemsSlice.reducer,
    faatchStatus: fatchingStatusSlice.reducer,
  },
});
export default srStore;
