import { useState } from "react";
import { useDispatch } from "react-redux";
import { addSettlement } from "../../slices/settlementSlice";
import { v4 as uuidv4 } from "uuid";

interface PartyAFormProps {
  onAddForm: (title: string) => void;
}

const PartyAForm: React.FC<PartyAFormProps> = ({ onAddForm }) => {
  const [formData, setFormData] = useState({
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
    onAddForm(formData.title); // Call the onAddForm prop with the title
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <h2 className="text-xl font-semibold text-blue-500 text-center">
        Party A View
      </h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col gap-2"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-xl font-bold mb-2"
            htmlFor="title"
          >
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
            minLength={10}
            maxLength={30}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-xl font-bold mb-2"
            htmlFor="settlementAmount"
          >
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
          <label
            className="block text-gray-700 text-xl font-bold mb-2"
            htmlFor="textArea"
          >
            Comments
          </label>
          <textarea
            id="textArea"
            placeholder="Enter any comments"
            value={formData.textArea}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows={4}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default PartyAForm;