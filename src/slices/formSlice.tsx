import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FormState {
  id: number;
  title: string;
  settlementAmount: number;
  status: string;
  textArea: string;
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
    updateForm: (state, action: PayloadAction<FormState>) => {
      const index = state.forms.findIndex((form) => form.id === action.payload.id);
      if (index !== -1) {
        state.forms[index] = action.payload;
      }
    },
  },
});

export const { addForm, updateFormsStatus, updateFormAmount, updateForm } = formSlice.actions;
export default formSlice.reducer;
