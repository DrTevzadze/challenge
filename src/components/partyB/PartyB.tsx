import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateSettlement } from "../../slices/settlementSlice";
import { RootState } from "../../store";
import PartyBForm from "./PartyBForm";

export interface FormData {
  comment: string;
  settlementAmount: string;
  action: string;
  selectedSettlement: string;
}

function PartyB() {
  const settlements = useSelector(
    (state: RootState) => state.settlement.settlements
  );
  const [formData, setFormData] = useState<FormData>({
    comment: "",
    settlementAmount: "",
    action: "Update",
    selectedSettlement: settlements.length > 0 ? settlements[0].id : "",
  });

  const dispatch = useDispatch();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = Number(formData.settlementAmount);

    dispatch(updateSettlement({ id: formData.selectedSettlement, amount }));

    const status = formData.action === "Approve" ? "Finished" : "Pending";

    dispatch(updateSettlement({ id: formData.selectedSettlement, status }));
    console.log("PartyB Submitting Response Form:", formData);
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <h2 className="text-xl font-semibold text-blue-500 text-center">
        Party B View
      </h2>
      <PartyBForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default PartyB;
