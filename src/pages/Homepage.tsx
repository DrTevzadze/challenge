import { useState } from "react";
import { Provider } from "react-redux";
import PartyA from "../components/PartyA";
import PartyB from "../components/PartyB";
import FormList from "../components/formList/FormList";
import { addForm } from "../slices/formSlice";
import { store } from "../store";

function Homepage() {
  const [currentView, setCurrentView] = useState<"PartyA" | "PartyB">("PartyA");
  const [nextId, setNextId] = useState(1);

  const toggleView = () => {
    setCurrentView(currentView === "PartyA" ? "PartyB" : "PartyA");
  };

  const handleAddForm = (title: string, amount: number) => {
    store.dispatch(addForm({ id: nextId, title, settlementAmount: amount, status: "pending" }));
    setNextId((prev) => prev + 1);
  };

  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-100 p-4">
        <header className="flex justify-between items-center bg-white shadow-md p-4">
          <h1 className="text-lg font-bold text-blue-500 xl:text-4xl sm:text-2xl cursor-pointer">
            Settlement Demo
          </h1>
          <button
            onClick={toggleView}
            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition-all duration-200"
          >
            Switch to {currentView === "PartyA" ? "PartyB" : "PartyA"} View
          </button>
        </header>
        <main className="mt-4">
          <FormList view={currentView} />
          {currentView === "PartyA" ? <PartyA onAddForm={handleAddForm} /> : <PartyB />}
        </main>
      </div>
    </Provider>
  );
}

export default Homepage;
