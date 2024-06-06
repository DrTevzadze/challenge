import { configureStore } from "@reduxjs/toolkit";
import settlementReducer from "./slices/settlementSlice.tsx";
import formReducer from "./slices/formSlice.tsx";
import uiReducer from "./slices/uiSlice.tsx";

export const store = configureStore({
  reducer: {
    settlement: settlementReducer,
    forms: formReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
