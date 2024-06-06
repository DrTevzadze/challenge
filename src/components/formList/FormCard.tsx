import { useState } from "react";

interface FormCardProps {
  id: number;
  onComplete: (id: number) => void;
}

function FormCard({ id, onComplete }: FormCardProps) {
  const [status, setStatus] = useState("pending");

  const handleComplete = () => {
    setStatus("finished");
    onComplete(id);
  };

  return (
    <div className="border p-4 m-2">
      <h2>Form {id}</h2>
      <p>Status: {status}</p>
      <button className="bg-green-500 text-white p-2" onClick={handleComplete}>
        Complete
      </button>
    </div>
  );
}

export default FormCard;
