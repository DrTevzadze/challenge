interface FormButtonProps {
  onClick: () => void;
}

function AddFormButton({ onClick }: FormButtonProps) {
  return (
    <button
      className="bg-blue-500 text-white p-4 m-4 rounded-full"
      onClick={onClick}
    >
      +
    </button>
  );
}

export default AddFormButton;
