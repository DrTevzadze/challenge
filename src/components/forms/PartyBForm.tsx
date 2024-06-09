import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { updateFormsStatus, updateFormAmount } from "../../slices/formSlice";

interface PartyBFormProps {
  onClose: () => void;
}

const PartyBForm: React.FC<PartyBFormProps> = ({ onClose }) => {
  const forms = useSelector((state: RootState) => state.forms.forms);
  const dispatch = useDispatch();
  const [selectedFormId, setSelectedFormId] = useState<number | null>(null);
  const [action, setAction] = useState<string>("");
  const [updatedAmount, setUpdatedAmount] = useState<string>("");

  const handleApprove = () => {
    if (selectedFormId !== null) {
      dispatch(updateFormsStatus({ id: selectedFormId, status: "Approved" }));
      onClose();
    }
  };

  const handleDispute = () => {
    if (selectedFormId !== null) {
      dispatch(updateFormsStatus({ id: selectedFormId, status: "Disputed" }));
      onClose();
    }
  };

  const handleUpdate = () => {
    if (selectedFormId !== null && updatedAmount !== "") {
      const amount = parseFloat(updatedAmount);
      dispatch(updateFormAmount({ id: selectedFormId, amount }));
      dispatch(updateFormsStatus({ id: selectedFormId, status: "Updated" }));
      onClose();
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFormId(Number(e.target.value));
    setAction("");
    setUpdatedAmount("");
  };

  const handleActionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAction(e.target.value);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedAmount(e.target.value);
  };

  const handleSubmit = () => {
    if (action === "approve") {
      handleApprove();
    } else if (action === "dispute") {
      handleDispute();
    } else if (action === "update") {
      handleUpdate();
    }
  };

  const selectedForm = forms.find((form) => form.id === selectedFormId);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold">Party B - View and Respond to Forms</h1>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-lg font-bold mb-2"
          htmlFor="formSelect"
        >
          Select a Form
        </label>
        <select
          id="formSelect"
          onChange={handleSelectChange}
          className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={selectedFormId || ""}
        >
          <option value="" disabled>
            Select a form...
          </option>
          {forms.map((form) => (
            <option key={form.id} value={form.id}>
              Form: {form.title}
            </option>
          ))}
        </select>
      </div>
      {selectedForm && (
        <div className="mb-4">
          <h2 className="text-xl font-bold">Form Details</h2>
          <p><strong>Title:</strong> {selectedForm.title}</p>
          <p><strong>Settlement Amount:</strong> ${selectedForm.settlementAmount}</p>
          <p><strong>Comments:</strong> {selectedForm.textArea}</p>
        </div>
      )}
      {selectedFormId !== null && (
        <div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-lg font-bold mb-2"
              htmlFor="actionSelect"
            >
              Action
            </label>
            <select
              id="actionSelect"
              onChange={handleActionChange}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={action}
            >
              <option value="" disabled>
                Select an action...
              </option>
              <option value="approve">Approve</option>
              <option value="dispute">Dispute</option>
              <option value="update">Update</option>
            </select>
          </div>
          {action === "update" && (
            <div className="mb-4">
              <label
                className="block text-gray-700 text-lg font-bold mb-2"
                htmlFor="updatedAmount"
              >
                Update Settlement Amount
              </label>
              <input
                id="updatedAmount"
                type="number"
                placeholder="Enter new settlement amount"
                value={updatedAmount}
                onChange={handleAmountChange}
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          )}
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition-all duration-200"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default PartyBForm;
