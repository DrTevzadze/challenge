import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { FormState, updateFormsStatus } from "../../slices/formSlice";

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
  const dispatch = useDispatch();

  if (!form) return null;

  const handleApprove = () => {
    dispatch(updateFormsStatus({ id: form.id, status: "Approved" }));
  };

  return (
    <div className="border p-4 md:p-6 m-2 md:m-4 rounded-lg shadow-md bg-purple-100">
      <h2 className="text-xl md:text-2xl font-bold text-blue-700 mb-2 md:mb-4">
        Form: {form.title}
      </h2>
      <div className="space-y-2">
        <div className="flex items-center">
          <span className="text-base md:text-lg font-semibold text-gray-700">
            Status:
          </span>
          <span className="ml-2 flex items-center text-base md:text-lg font-medium text-grey-800 relative">
            {form.status === "Approved" && (
              <span className="h-3 w-3 rounded-full bg-green-500 inline-block mr-2"></span>
            )}
            {form.status === "Rejected" && (
              <span className="h-3 w-3 rounded-full bg-red-500 inline-block mr-2"></span>
            )}
            {(form.status === "Pending" || form.status === "Disputed") && (
              <span className="relative flex h-3 w-3 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
              </span>
            )}
            {form.status}
          </span>
        </div>
        <div className="flex items-center">
          <span className="text-base md:text-lg font-semibold text-gray-700">
            Settlement Amount:
          </span>
          <span className="ml-2 text-base md:text-lg font-medium text-green-500">
            ${new Intl.NumberFormat().format(form.settlementAmount)}
          </span>
        </div>
        <div className="flex items-start">
          <span className="text-base md:text-lg font-semibold text-gray-700">
            Comments:
          </span>
          <p className="ml-2 text-base md:text-lg text-gray-700">
            {form.textArea}
          </p>
        </div>
      </div>
      {view === "PartyA" && form.status === "Pending" && (
        <button
          className="mt-4 bg-yellow-500 text-white px-3 md:px-4 py-2 font-bold rounded-md shadow-md hover:bg-yellow-600 transition-all duration-200"
          onClick={() => onEdit(form)}
        >
          Edit
        </button>
      )}
      {view === "PartyA" && form.status === "Disputed" && (
        <div className="mt-4 flex flex-col sm:flex-row sm:justify-start md:space-x-2 sm:space-x-2 justify-between">
          <button
            className="bg-blue-600 text-white font-bold px-3 md:px-4 py-2 mb-2 sm:mb-0 rounded-md shadow-md hover:bg-blue-700 transition-all duration-200"
            onClick={() => onResubmit(form)}
          >
            Resubmit
          </button>
          <button
            className="bg-green-600 text-white font-bold px-3 md:px-4 py-2 rounded-md shadow-md hover:bg-green-700 transition-all duration-200"
            onClick={handleApprove}
          >
            Agree
          </button>
        </div>
      )}
    </div>
  );
};

export default FormCard;
