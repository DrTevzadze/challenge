import React, { useState } from "react";
import PartyBForm from "./forms/PartyBForm";
import Modal from "./Modal";

const PartyB: React.FC = () => {
  const [showForm, setShowForm] = useState(false);

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <div className="container mx-auto flex flex-col items-center  min-h-screen">
      <h2 className="text-xl font-semibold text-blue-500 text-center mb-4">
        Party B View
      </h2>
      <button
        onClick={handleShowForm}
        className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition-all duration-200"
      >
        Select Form
      </button>
      <Modal isVisible={showForm} onClose={handleCloseForm}>
        <PartyBForm onClose={handleCloseForm} />
      </Modal>
    </div>
  );
};

export default PartyB;
