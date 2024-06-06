import { useState } from "react";
import PartyA from "../components/PartyA";
import PartyB from "../components/PartyB";

function Homepage() {
  const [currentView, setCurrentView] = useState<"PartyA" | "PartyB">("PartyA");

  const toggleView = () => {
    setCurrentView(currentView === "PartyA" ? "PartyB" : "PartyA");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="flex justify-between items-center bg-white shadow-md p-4">
        <h1 className="text-lg font-bold text-blue-500 xl:text-4xl sm:text-2xl">
          Settlement Demo
        </h1>
        <button
          onClick={toggleView}
          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition-all duration-200"
        >
          Switch to {currentView === "PartyA" ? "Party B" : "Party A"} View
        </button>
      </header>
      <main className="mt-4">
        {currentView === "PartyA" ? <PartyA /> : <PartyB />}
      </main>
    </div>
  );
}

export default Homepage;
