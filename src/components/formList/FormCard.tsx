import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface FormCardProps {
  id: number;
  isPartyB: boolean; // Add this line
  onEdit: () => void;
}

const FormCard: React.FC<FormCardProps> = ({ id, isPartyB, onEdit }) => {
  const form = useSelector((state: RootState) =>
    state.forms.forms.find((form) => form.id === id)
  );

  if (!form) {
    return <p>Loading...</p>;
  }

  return (
    <div className="border p-4 m-2">
      <h2>Form: {form.title}</h2>
      <p>Status: {form.status}</p>
      <p>Settlement Amount: ${form.settlementAmount}</p>
      <p>Comments: {form.textArea}</p>
      {!isPartyB && form.status === "Updated" && (
        <button
          onClick={onEdit}
          className="bg-yellow-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-yellow-600 transition-all duration-200"
        >
          Resubmit
        </button>
      )}
    </div>
  );
};

export default FormCard;
