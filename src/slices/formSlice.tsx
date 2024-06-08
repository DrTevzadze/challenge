import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FormState {
  id: number;
  title: string;
  status: string;
}

interface FormsState {
  forms: FormState[];
}

const initialState: FormsState = {
  forms: [],
};

const formSlice = createSlice({
  name: "forms",
  initialState,
  reducers: {
    addForm: (state, action: PayloadAction<FormState>) => {
      state.forms.push(action.payload);
    },
    updateFormsStatus: (state, action: PayloadAction<{ id: number; status: string }>) => {
      const form = state.forms.find((form) => form.id === action.payload.id);
      if (form) {
        form.status = action.payload.status;
      }
    },
  },
});

export const { addForm, updateFormsStatus } = formSlice.actions;
export default formSlice.reducer;
