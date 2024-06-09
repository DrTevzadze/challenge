import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { FormState } from "../../slices/formSlice";

interface FormCardProps {
  id: number;
  view: "PartyA" | "PartyB";
  onEdit: (form: FormState) => void;
  onResubmit: (form: FormState) => void;
}

const FormCard: React.FC<FormCardProps> = ({
  id,
  view,
  onEdit,
  onResubmit,
}) => {
  const form = useSelector((state: RootState) =>
    state.forms.forms.find((f) => f.id === id)
  );

  if (!form) return null;

  return (
    <div className="border p-6 m-4 rounded-lg shadow-md bg-gray-50">
      <h2 className="text-xl font-bold mb-2">Form: {form.title}</h2>
      <p className="mb-1"><strong>Status:</strong> {form.status}</p>
      <p className="mb-1"><strong>Settlement Amount:</strong> ${form.settlementAmount}</p>
      <p className="mb-4"><strong>Comments:</strong> {form.textArea}</p>
      {view === "PartyA" && form.status === "Pending" && (
        <button
          className="bg-yellow-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-yellow-600 transition-all duration-200"
          onClick={() => onEdit(form)}
        >
          Edit
        </button>
      )}
      {view === "PartyA" && form.status === "Updated" && (
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition-all duration-200 ml-2"
          onClick={() => onResubmit(form)}
        >
          Resubmit
        </button>
      )}
    </div>
  );
};

export default FormCard;
