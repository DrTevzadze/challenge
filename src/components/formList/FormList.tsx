import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import AddFormButton from "./AddFormButton";
import FormCard from "./FormCard";
import PartyAForm from "../forms/PartyAForm";

interface FormListProps {
  view: "PartyA" | "PartyB";
  onAddForm: (title: string, settlementAmount: number, textArea: string) => void;
}

const FormList: React.FC<FormListProps> = ({ view, onAddForm }) => {
  const [showForm, setShowForm] = useState(false);
  const forms = useSelector((state: RootState) => state.forms.forms);

  const handleAddFormClick = () => {
    setShowForm(true);
  };

  const handleFormSubmit = (title: string, settlementAmount: number, textArea: string) => {
    onAddForm(title, settlementAmount, textArea);
    setShowForm(false);
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md my-4">
      {view === "PartyA" && (
        <>
          <AddFormButton onClick={handleAddFormClick} />
          {showForm && <PartyAForm onAddForm={handleFormSubmit} />}
        </>
      )}
      <div className="space-y-4">
        {forms.map((form) => (
          <FormCard key={form.id} id={form.id} />
        ))}
      </div>
    </div>
  );
};

export default FormList;
