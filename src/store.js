import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./apiSlice";

export const store = configureStore({
  reducer: {
    apiReducer: weatherReducer,
  },
});
