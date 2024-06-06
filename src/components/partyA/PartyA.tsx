import { useState } from "react";
import { addSettlement } from "../../slices/settlementSlice";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import PartyAForm from "./PartyAForm";
import { FormData } from "../../types";

function PartyA() {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    settlementAmount: "",
    textArea: "",
  });

  const dispatch = useDispatch();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
    const newSettlement = {
      id: uuidv4(),
      partyA: formData.title,
      partyB: "",
      amount: amount,
      status: "Pending",
    };
    dispatch(addSettlement(newSettlement));
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <h2 className="text-xl font-semibold text-blue-500 text-center">
        Party A View
      </h2>
      <PartyAForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default PartyA;
