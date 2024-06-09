import React from "react";

interface FormButtonProps {
  onClick: () => void;
}

const AddFormButton: React.FC<FormButtonProps> = ({ onClick }) => {
  return (
    <div
      className="inline-flex items-center bg-blue-600 w-auto text-white p-4 m-4 rounded-full cursor-pointer hover:bg-blue-700 transition-all duration-200"
      onClick={onClick}
    >
      <span className="text-xl font-bold mr-2">+</span>
      <span>Create New Form</span>
    </div>
  );
};

export default AddFormButton;
