import { useState } from "react";
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
  onUpdateForm: (
    id: number,
    title: string,
    amount: number,
    textArea: string,
    status: string
  ) => void;
}

function FormList({ view, onAddForm, onUpdateForm }: FormListProps) {
  const [showForm, setShowForm] = useState(false);
  const [editFormData, setEditFormData] = useState<FormState | null>(null);

  // forms will take the information from redux and handle functions will use this information to either resubmit or edit the current form
  const forms = useSelector((state: RootState) => state.forms.forms);

  const handleAddFormClick = () => {
    setEditFormData(null);
    setShowForm(true);
  };

  const handleFormSubmit = (
    title: string,
    amount: number,
    textArea: string
  ) => {
    if (editFormData) {
      onUpdateForm(editFormData.id, title, amount, textArea, "Pending");
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
    <div className="bg-white p-6 rounded-lg shadow-lg my-6">
      {view === "PartyA" && (
        <>
          <AddFormButton onClick={handleAddFormClick} />
          {showForm && (
            <Modal onClose={() => setShowForm(false)} isVisible={showForm}>
              <PartyAForm
                onAddForm={handleFormSubmit}
                editFormData={editFormData}
              />
            </Modal>
          )}
        </>
      )}
      <div className="space-y-6">
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
}

export default FormList;
