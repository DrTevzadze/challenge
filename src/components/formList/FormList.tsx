import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import AddFormButton from "./AddFormButton";
import FormCard from "./FormCard";
import PartyAForm from "../forms/PartyAForm";
import Modal from "../Modal";
import { FormState } from "../../slices/formSlice";

interface FormListProps {
  view: "PartyA" | "PartyB";
  onAddForm: (title: string, settlementAmount: number, textArea: string) => void;
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

  const handleFormSubmit = (title: string, settlementAmount: number, textArea: string) => {
    if (editFormData) {
      onUpdateForm(editFormData.id, title, settlementAmount, textArea, "pending");
    } else {
      onAddForm(title, settlementAmount, textArea);
    }
    setShowForm(false);
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md my-4">
      {view === "PartyA" && (
        <>
          <AddFormButton onClick={handleAddFormClick} />
          <Modal isVisible={showForm} onClose={() => setShowForm(false)}>
            <PartyAForm onAddForm={handleFormSubmit} editFormData={editFormData} />
          </Modal>
        </>
      )}
      <div className="space-y-4">
        {forms.map((form) => (
          <FormCard
            key={form.id}
            id={form.id}
            isPartyB={view === "PartyB"} // Pass the prop correctly
            onEdit={() => {
              setEditFormData(form);
              setShowForm(true);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default FormList;
