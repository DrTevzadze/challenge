import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import AddFormButton from "./AddFormButton";
import FormCard from "./FormCard";
import PartyAForm from "../forms/PartyAForm";
import PartyBForm from "../forms/PartyBForm";
import Modal from "../Modal";

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

  const handleClose = () => {
    setShowForm(false);
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md my-4">
      {view === "PartyA" && (
        <>
          <AddFormButton onClick={handleAddFormClick} />
          <Modal isVisible={showForm} onClose={handleClose}>
            <PartyAForm onAddForm={handleFormSubmit} />
          </Modal>
        </>
      )}
      {view === "PartyB" && (
        <Modal isVisible={showForm} onClose={handleClose}>
          <PartyBForm onClose={handleClose} />
        </Modal>
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
