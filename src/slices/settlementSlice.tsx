// settlementSlice.tsx
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { database, FormData } from "../database/database";

interface SettlementState {
  settlements: FormData[];
}

const initialState: SettlementState = {
  settlements: database,
};

const settlementSlice = createSlice({
  name: "settlement",
  initialState,
  reducers: {
    addSettlement: (state, action: PayloadAction<FormData>) => {
      state.settlements.push(action.payload);
      database.push(action.payload); // Update the in-memory database
    },
    updateSettlement: (
      state,
      action: PayloadAction<{ id: string; amount?: number; status?: string }>
    ) => {
      const settlement = state.settlements.find(
        (s) => s.id === action.payload.id
      );
      if (settlement) {
        if (action.payload.amount !== undefined) {
          settlement.amount = action.payload.amount;
        }
        if (action.payload.status) {
          settlement.status = action.payload.status;
        }
      }

      // Update the in-memory database
      const dbSettlement = database.find((s) => s.id === action.payload.id);
      if (dbSettlement) {
        if (action.payload.amount !== undefined) {
          dbSettlement.amount = action.payload.amount;
        }
        if (action.payload.status) {
          dbSettlement.status = action.payload.status;
        }
      }
    },
  },
});

export const { addSettlement, updateSettlement } = settlementSlice.actions;
export default settlementSlice.reducer;
