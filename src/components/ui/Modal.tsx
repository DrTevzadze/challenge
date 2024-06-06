import { useDispatch } from "react-redux";
import { setIsFormOpen } from "../../slices/uiSlice";

interface ModalProps {
  children: React.ReactNode;
}

function Modal({ children }: ModalProps) {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setIsFormOpen(false));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col gap-2 relative w-1/2 h-4/5">
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
