import { configureStore } from "@reduxjs/toolkit";
import headerReducer from "@/redux/slices/headerSlice";
import quotesReducer from "@/redux/slices/quotesSlice";

const store = configureStore({
  reducer: {
    headerSlice: headerReducer,
    quotesSlice: quotesReducer
  },
});

export default store;