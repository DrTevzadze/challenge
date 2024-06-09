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
    <div className="border p-4 m-2">
      <h2>Form: {form.title}</h2>
      <p>Status: {form.status}</p>
      <p>Settlement Amount: ${form.settlementAmount}</p>
      <p>Comments: {form.textArea}</p>
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
          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition-all duration-200 ml-2"
          onClick={() => onResubmit(form)}
        >
          Resubmit
        </button>
      )}
    </div>
  );
};

export default FormCard;
