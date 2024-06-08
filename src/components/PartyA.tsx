import React from "react";
import PartyAForm from "./forms/PartyAForm";

interface PartyAProps {
  onAddForm: (title: string) => void;
}

const PartyA: React.FC<PartyAProps> = ({ onAddForm }) => {
  return (
    <div className="container mx-auto">
      <PartyAForm onAddForm={onAddForm} />
    </div>
  );
};

export default PartyA;
