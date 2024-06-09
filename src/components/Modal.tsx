interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isVisible, onClose, children }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl relative">
        <button
          onClick={onClose}
          className="text-blue-500 text-2xl font-bold hover:text-blue-700 transition-all duration-200 absolute top-4 right-4"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
