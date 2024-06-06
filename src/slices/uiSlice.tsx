import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
    isFormOpen: boolean;
}

const initialState: UIState = {
    isFormOpen: false,
}

const uiSlice = createSlice ({
    name: "ui",
    initialState,
    reducers: {
        setIsFormOpen: (state, action: PayloadAction<boolean>) => {
            state.isFormOpen = action.payload;
        }
    }
});

export const { setIsFormOpen } = uiSlice.actions;
export default uiSlice.reducer;