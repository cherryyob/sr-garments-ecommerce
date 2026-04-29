import { configureStore } from "@reduxjs/toolkit";
import itemsSlice from "./itemSlice";

const srStore = configureStore({
  reducer: { state: itemsSlice.reducer },
});
export default srStore;
