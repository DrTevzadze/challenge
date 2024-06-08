import React, { useState } from "react";

interface PartyAFormProps {
  onAddForm: (title: string, settlementAmount: number, textArea: string) => void;
}

const PartyAForm: React.FC<PartyAFormProps> = ({ onAddForm }) => {
  const [formData, setFormData] = useState({
    title: "",
    settlementAmount: "",
    textArea: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddForm(formData.title, Number(formData.settlementAmount), formData.textArea);
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <h2 className="text-xl font-semibold text-blue-500 text-center">
        Party A View
      </h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col gap-2">
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
            minLength={10}
            maxLength={30}
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
          <label className="block text-gray-700 text-xl font-bold mb-2" htmlFor="textArea">
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
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default PartyAForm;
