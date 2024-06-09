import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import AddFormButton from "./AddFormButton";
import FormCard from "./FormCard";
import Modal from "../Modal";
import PartyAForm from "../forms/PartyAForm";
import { FormState } from "../../slices/formSlice";

interface FormListProps {
  view: "PartyA" | "PartyB";
  onAddForm: (title: string, amount: number, textArea: string) => void;
  onUpdateForm: (id: number, title: string, amount: number, textArea: string, status: string) => void;
}

const FormList: React.FC<FormListProps> = ({ view, onAddForm, onUpdateForm }) => {
  const [showForm, setShowForm] = useState(false);
  const [editFormData, setEditFormData] = useState<FormState | null>(null);
  const forms = useSelector((state: RootState) => state.forms.forms);

  const handleAddFormClick = () => {
    setEditFormData(null);
    setShowForm(true);
  };

  const handleFormSubmit = (title: string, amount: number, textArea: string) => {
    if (editFormData) {
      onUpdateForm(editFormData.id, title, amount, textArea, "pending");
    } else {
      onAddForm(title, amount, textArea);
    }
    setShowForm(false);
  };

  const handleEditForm = (form: FormState) => {
    setEditFormData(form);
    setShowForm(true);
  };

  const handleResubmitForm = (form: FormState) => {
    setEditFormData(form);
    setShowForm(true);
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md my-4">
      {view === "PartyA" && (
        <>
          <AddFormButton onClick={handleAddFormClick} />
          {showForm && (
            <Modal onClose={() => setShowForm(false)} isVisible={showForm}>
              <PartyAForm onAddForm={handleFormSubmit} editFormData={editFormData} />
            </Modal>
          )}
        </>
      )}
      <div className="space-y-4">
        {forms.map((form) => (
          <FormCard
            key={form.id}
            id={form.id}
            view={view}
            onEdit={handleEditForm}
            onResubmit={handleResubmitForm}
          />
        ))}
      </div>
    </div>
  );
};

export default FormList;
