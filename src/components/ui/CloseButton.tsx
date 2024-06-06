import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setIsFormOpen } from "../../slices/uiSlice";

function CloseButton() {
  const isFormOpen = useSelector((state: RootState) => state.ui.isFormOpen);
  const dispatch = useDispatch();

  return (
    <div>
      <button
        onClick={() => dispatch(setIsFormOpen(!isFormOpen))}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Close
      </button>
    </div>
  );
}

export default CloseButton;
