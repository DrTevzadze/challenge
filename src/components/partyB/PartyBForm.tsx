import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateSettlement } from "../../slices/settlementSlice";
import { RootState } from "../../store";

export interface FormData {
  comment: string;
  settlementAmount: string;
  action: string;
  selectedSettlement: string;
}

function PartyBForm() {
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
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col gap-2"
    >
      <div className="mb-4">
        <label
          className="block text-gray-700 text-xl font-bold mb-2"
          htmlFor="action"
        >
          Action
        </label>
        <select
          id="action"
          value={formData.action}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="Update">Update</option>
          <option value="Approve">Approve</option>
        </select>
        <p className="text-gray-500 text-sm mt-1 italic">
          Make sure you select the correct action
        </p>
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-xl font-bold mb-2"
          htmlFor="settlementAmount"
        >
          Update Settlement Amount
        </label>
        <input
          id="settlementAmount"
          type="number"
          placeholder="Enter new settlement amount"
          value={formData.settlementAmount}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-xl font-bold mb-2"
          htmlFor="comment"
        >
          Comments
        </label>
        <textarea
          id="comment"
          placeholder="Enter any comment"
          value={formData.comment}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          rows={4}
          required
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default PartyBForm;
