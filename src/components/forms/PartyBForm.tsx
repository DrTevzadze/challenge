import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { updateFormsStatus } from "../../slices/formSlice";

const PartyBForm: React.FC = () => {
  const forms = useSelector((state: RootState) => state.forms.forms);
  const dispatch = useDispatch();
  const [selectedFormId, setSelectedFormId] = useState<number | null>(null);

  const handleApprove = () => {
    if (selectedFormId !== null) {
      dispatch(updateFormsStatus({ id: selectedFormId, status: "Agreed" }));
    }
  };

  const handleDispute = () => {
    if (selectedFormId !== null) {
      dispatch(updateFormsStatus({ id: selectedFormId, status: "Disputed" }));
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFormId(Number(e.target.value));
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold">
        Party B - View and Respond to Forms
      </h1>
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
              Form {form.id} - {form.status}
            </option>
          ))}
        </select>
      </div>
      {selectedFormId !== null && (
        <div>
          <button
            onClick={handleApprove}
            className="bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600 transition-all duration-200 mr-2"
          >
            Approve
          </button>
          <button
            onClick={handleDispute}
            className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 transition-all duration-200"
          >
            Dispute
          </button>
        </div>
      )}
    </div>
  );
};

export default PartyBForm;
