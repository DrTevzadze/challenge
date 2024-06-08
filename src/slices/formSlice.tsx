import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FormState {
  id: number;
  title: string;
  settlementAmount: number;
  status: string;
  textArea: string; // Add this if comments are included in the form state
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
    updateFormAmount: (state, action: PayloadAction<{ id: number; amount: number }>) => {
      const form = state.forms.find((form) => form.id === action.payload.id);
      if (form) {
        form.settlementAmount = action.payload.amount;
      }
    },
  },
});

export const { addForm, updateFormsStatus, updateFormAmount } = formSlice.actions;
export default formSlice.reducer;
