import { useState } from "react";
import { useDispatch } from "react-redux";
import { addSettlement } from "../../slices/settlementSlice";
import { v4 as uuidv4 } from "uuid";

function PartyAForm() {
  const [formData, setFormData] = useState({
    title: "",
    settlementAmount: "",
    comments: "",
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
      comments: formData.comments,
    };
    dispatch(addSettlement(newSettlement));
    console.log("Form Data Submitted:", formData);
  };

  return (
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div className="mb-4">
          <label className="block text-gray-700 text-xl font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="Enter form title"
            value={formData.title}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-xl font-bold mb-2" htmlFor="settlementAmount">
            Settlement Amount
          </label>
          <input
            id="settlementAmount"
            type="number"
            placeholder="Enter settlement amount"
            value={formData.settlementAmount}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-xl font-bold mb-2" htmlFor="comments">
            Comments
          </label>
          <textarea
            id="comments"
            placeholder="Enter any comments"
            value={formData.comments}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows={4}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md">
            Submit
          </button>
        </div>
      </form>
  );
}

export default PartyAForm;
