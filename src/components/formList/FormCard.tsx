import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface FormCardProps {
  id: number;
}

const FormCard: React.FC<FormCardProps> = ({ id }) => {
  const form = useSelector((state: RootState) =>
    state.forms.forms.find((form) => form.id === id)
  );

  if (!form) {
    return <p>Loading...</p>;
  }

  return (
    <div className="border p-4 m-2">
      <h2>Form: {form.title}</h2>
      <p>Status: {form.status}</p>
      <p>Settlement Amount: ${form.settlementAmount}</p>
    </div>
  );
};

export default FormCard;
