import { configureStore } from "@reduxjs/toolkit";
import settlementReducer from "./slices/settlementSlice.tsx";

export const store = configureStore({
  reducer: {
    settlement: settlementReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
