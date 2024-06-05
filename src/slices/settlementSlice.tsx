import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Settlement {
  id: string;
  partyA: string;
  partyB: string;
  amount: number;
  status: string;
}

interface SettlementState {
  settlements: Settlement[];
}

const initialState: SettlementState = {
  settlements: [],
};

const settlementSlice = createSlice({
  name: "settlement",
  initialState,
  reducers: {
    addSettlement: (state, action: PayloadAction<Settlement>) => {
      state.settlements.push(action.payload);
    },
    updateSettlement: (
      state,
      action: PayloadAction<{ id: string; amount: number }>
    ) => {
      const settlement = state.settlements.find(
        (s) => s.id === action.payload.id
      );
      if (settlement) {
        settlement.amount = action.payload.amount;
      }
    },
  },
});

export const { addSettlement, updateSettlement } = settlementSlice.actions;
export default settlementSlice.reducer;
