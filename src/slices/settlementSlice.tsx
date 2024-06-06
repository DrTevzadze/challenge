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
      // Push the payload to the settlements array
      state.settlements.push(action.payload);
    },
    updateSettlement: (
      state,
      action: PayloadAction<{ id: string; amount?: number; status?: string }>
    ) => {
      const settlement = state.settlements.find(
        (s) => s.id === action.payload.id
      );
      if (settlement) {
        // Update current amount to the payload's amount (when partyB or partyA will modify the request)
        if (action.payload.amount) {
          settlement.amount = action.payload.amount;
        }
        // Update current status to the payload's status
        if (action.payload.status) {
          settlement.status = action.payload.status;
        }
      }
    },
  },
});

export const { addSettlement, updateSettlement } = settlementSlice.actions;
export default settlementSlice.reducer;
