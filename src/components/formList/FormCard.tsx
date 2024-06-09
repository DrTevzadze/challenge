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
    <div className="border p-6 m-4 rounded-lg shadow-md bg-purple-100">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">
        Form: {form.title}
      </h2>
      <div className="space-y-2">
        <div className="flex items-center">
          <span className="text-lg font-semibold text-gray-700">Status:</span>
          <span className="ml-2 flex items-center text-lg font-medium text-grey-800 relative">
            {form.status === "Approved" && (
              <span className="h-3 w-3 rounded-full bg-green-500 inline-block mr-2"></span>
            )}
            {form.status === "Disputed" && (
              <span className="h-3 w-3 rounded-full bg-red-500 inline-block mr-2"></span>
            )}
            {(form.status === "Pending" || form.status === "Updated") && (
              <span className="relative flex h-3 w-3 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
              </span>
            )}
            {form.status}
          </span>
        </div>
        <div className="flex items-center">
          <span className="text-lg font-semibold text-gray-700">
            Settlement Amount:
          </span>
          <span className="ml-2 text-lg font-medium text-green-500">
            ${new Intl.NumberFormat().format(form.settlementAmount)}
          </span>
        </div>
        <div className="flex items-center">
          <span className="text-lg font-semibold text-gray-700">Comments:</span>
          <p className="ml-2 text-lg text-gray-700">{form.textArea}</p>
        </div>
      </div>
      {view === "PartyA" && form.status === "Pending" && (
        <button
          className="mt-4 bg-yellow-500 text-white px-4 py-2 font-bold rounded-md shadow-md hover:bg-yellow-600 transition-all duration-200"
          onClick={() => onEdit(form)}
        >
          Edit
        </button>
      )}
      {view === "PartyA" && form.status === "Updated" && (
        <button
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition-all duration-200 ml-2"
          onClick={() => onResubmit(form)}
        >
          Resubmit
        </button>
      )}
    </div>
  );
};

export default FormCard;
