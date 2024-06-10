import { useState } from "react";
import PartyBForm from "./forms/PartyBForm";
import Modal from "./Modal";

interface PartyBProps {
  onFormSubmit: () => void;
}

function PartyB({ onFormSubmit }: PartyBProps) {
  const [showForm, setShowForm] = useState(false);

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    onFormSubmit();
  };

  return (
    <div className="container mx-auto flex flex-col items-center min-h-screen">
      <button
        onClick={handleShowForm}
        className="bg-blue-600 text-white font-bold px-6 py-3 rounded-md shadow-md hover:bg-blue-700 transition-all duration-200"
      >
        Select Form
      </button>
      <Modal isVisible={showForm} onClose={() => setShowForm(false)}>
        <PartyBForm onClose={handleCloseForm} />
      </Modal>
    </div>
  );
}

export default PartyB;
