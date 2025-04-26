import { configureStore } from "@reduxjs/toolkit";
import managementSlice from "./managementSlice";

export const store = configureStore({
  reducer: {
    task: managementSlice,
  },
});
