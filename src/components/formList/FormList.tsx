import { useState, useEffect } from "react";
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

  useEffect(() => {
    if (showForm) {
      dispatch(
        addForm({
          id: nextId,
          status: "pending",
          title: "",
          settlementAmount: 0,
          textArea: "",
        })
      );
      setNextId((prev) => prev + 1);
      setShowForm(false);
    }
  }, [showForm, nextId, dispatch]);

  return (
    <div className="bg-white p-4 rounded-md shadow-md my-4">
      {view === "PartyA" ? (
        <>
          <AddFormButton />
          {showForm && <FormCard id={nextId - 1} />}
        </>
      ) : null}
      <div className="space-y-4">
        {forms.map((form) => (
          <FormCard key={form.id} id={form.id} />
        ))}
      </div>
    </div>
  );
};

export default FormList;
