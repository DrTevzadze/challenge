import { useDispatch, useSelector } from "react-redux";
import { updateFormsStatus } from "../../slices/formSlice";
import { RootState } from "../../store";

interface FormCardProps {
  id: number;
  isPartyB?: boolean;
  onComplete?: (id: number) => void;
}

function FormCard({ id, isPartyB, onComplete }: FormCardProps) {
  const dispatch = useDispatch();
  const form = useSelector((state: RootState) =>
    state.forms.forms.find((form) => form.id === id)
  );

  const handleApprove = () => {
    if (isPartyB) {
      dispatch(updateFormsStatus({ id, status: "Finished" }));
      if (onComplete) {
        onComplete(id);
      }
    }
  };

  if (!form) {
    return <p>Loading...</p>;
  }

  return (
    <div className="border p-4 m-2 rounded-md shadow-">
      <h2 className="text-xl">Form: {id}</h2>
      <p>Status: {form.status}</p>
      {isPartyB && (
        <button className="bg-green-500 text-white p-2" onClick={handleApprove}>
          Approve
        </button>
      )}
    </div>
  );
}

export default FormCard;
