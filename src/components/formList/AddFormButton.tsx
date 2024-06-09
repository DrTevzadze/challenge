import AddFormSVGIcon from "./AddFormSVGIcon";

interface FormButtonProps {
  onClick: () => void;
}

const AddFormButton: React.FC<FormButtonProps> = ({ onClick }) => {
  return (
    <div
      className="inline-flex items-center font-bold bg-blue-500 w-auto text-white py-4 px-6 m-2 md:m-4 rounded-md cursor-pointer hover:bg-blue-600 transition-all duration-200"
      onClick={onClick}
    >
      <AddFormSVGIcon />
      <span>Create New Form</span>
    </div>
  );
};

export default AddFormButton;
