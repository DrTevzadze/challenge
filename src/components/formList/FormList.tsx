import { useState } from "react";
import AddFormButton from "./AddFormButton";
import FormCard from "./FormCard";

interface FormListProps {
  view: "PartyA" | "PartyB";
}

function FormList({ view }: FormListProps) {
  const [forms, setForms] = useState<{ id: number; status: string }[]>([]);
  const [nextId, setNextId] = useState(1);

  const addForm = () => {
    setForms([...forms, { id: nextId, status: "pending" }]);
    setNextId((prev) => prev + 1);
  };

  const handleComplete = (id: number) => {
    setForms(
      forms.map((form) =>
        form.id === id ? { ...form, status: "finished" } : form
      )
    );
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md my-2">
      {view === "PartyA" ? <AddFormButton onClick={addForm} /> : null}
      <div className="space-y-4">
        {forms.map((form) => (
          <FormCard key={form.id} id={form.id} onComplete={handleComplete} />
        ))}
      </div>
    </div>
  );
}

export default FormList;
