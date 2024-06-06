import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { addForm } from "../../slices/formSlice";
import AddFormButton from "./AddFormButton";
import FormCard from "./FormCard";

interface FormListProps {
  view: "PartyA" | "PartyB";
}

const FormList: React.FC<FormListProps> = ({ view }) => {
  const [showForm, setShowForm] = useState(false);
  const [nextId, setNextId] = useState(1);
  const dispatch = useDispatch();
  const forms = useSelector((state: RootState) => state.forms.forms);

  const handleAddForm = () => {
    setShowForm(true);
    dispatch(addForm({ id: nextId, status: "pending" }));
    setNextId(nextId + 1);
  };

  const handleFormComplete = () => {
    setShowForm(false);
  };

  return (
    <div>
      {view === "PartyA" ? (
        <>
          <AddFormButton onClick={handleAddForm} />
          {showForm && (
            <FormCard id={nextId - 1} onComplete={handleFormComplete} />
          )}
        </>
      ) : null}
      <div className="space-y-4">
        {forms.map((form) => (
          <FormCard key={form.id} id={form.id} isPartyB={view === "PartyB"} />
        ))}
      </div>
    </div>
  );
};

export default FormList;
