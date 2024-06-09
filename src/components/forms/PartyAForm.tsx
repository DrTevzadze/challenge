import React, { useState, useEffect } from "react";

interface PartyAFormProps {
  onAddForm: (
    title: string,
    settlementAmount: number,
    textArea: string
  ) => void;
  editFormData?: {
    title: string;
    settlementAmount: number;
    textArea: string;
  } | null;
}

const PartyAForm: React.FC<PartyAFormProps> = ({ onAddForm, editFormData }) => {
  const [formData, setFormData] = useState({
    title: "",
    settlementAmount: "",
    textArea: "",
  });

  useEffect(() => {
    if (editFormData) {
      setFormData({
        title: editFormData.title,
        settlementAmount: String(editFormData.settlementAmount),
        textArea: editFormData.textArea,
      });
    }
  }, [editFormData]);

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
    onAddForm(
      formData.title,
      Number(formData.settlementAmount),
      formData.textArea
    );
  };

  return (
    <div className="bg-white p-4 rounded-lg max-w-lg mx-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded pt-6 flex flex-col gap-4"
      >
        <div className="mb-4">
          <label
            className="block text-blue-500 text-lg font-bold mb-2"
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
            minLength={6}
            maxLength={20}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-blue-500 text-lg font-bold mb-2"
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
            className="block text-blue-500 text-lg font-bold mb-2"
            htmlFor="textArea"
          >
            Comments
          </label>
          <textarea
            id="textArea"
            placeholder="Enter any comments"
            value={formData.textArea}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none"
            rows={4}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md transition-all duration-300"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default PartyAForm;
