import { useState } from "react";
import { Provider } from "react-redux";
import PartyA from "../components/PartyA";
import PartyB from "../components/PartyB";
import FormList from "../components/formList/FormList";
import Notification from "../components/Notification";
import { addForm, updateForm } from "../slices/formSlice";
import { store } from "../store";

function Homepage() {
  const [currentView, setCurrentView] = useState<"PartyA" | "PartyB">("PartyA");
  const [nextId, setNextId] = useState(1);
  const [notificationVisible, setNotificationVisible] = useState(false);

  const toggleView = () => {
    setCurrentView(currentView === "PartyA" ? "PartyB" : "PartyA");
  };

  const handleAddForm = (title: string, amount: number, textArea: string) => {
    store.dispatch(
      addForm({
        id: nextId,
        title,
        settlementAmount: amount,
        textArea,
        status: "Pending",
      })
    );
    setNextId((prev) => prev + 1);
  };

  const handleUpdateForm = (id: number, title: string, amount: number, textArea: string, status: string) => {
    store.dispatch(
      updateForm({
        id,
        title,
        settlementAmount: amount,
        textArea,
        status,
      })
    );
  };

  const handleFormSubmit = () => {
    setNotificationVisible(true);
    setTimeout(() => {
      setNotificationVisible(false);
    }, 5000); // Hide after 3 seconds
  };

  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-50 p-4">
        <Notification
          message="PartyB has made changes to your request. Please check the form!"
          visible={notificationVisible}
          onClose={() => setNotificationVisible(false)}
        />
        <header className="flex justify-between items-center bg-white shadow-md p-4 rounded-lg">
          <h1 className="text-lg font-bold text-blue-600 xl:text-4xl sm:text-2xl cursor-pointer">
            Settlement Demo
          </h1>
          <button
            onClick={toggleView}
            className="bg-blue-600 text-white px-4 py-2 font-bold rounded-md shadow-md hover:bg-blue-700 transition-all duration-200"
          >
            Switch to {currentView === "PartyA" ? "PartyB" : "PartyA"} View
          </button>
        </header>
        <main className="mt-6">
          {currentView === "PartyA" && <PartyA />}
          <FormList
            view={currentView}
            onAddForm={handleAddForm}
            onUpdateForm={handleUpdateForm}
          />
          {currentView === "PartyB" && <PartyB onFormSubmit={handleFormSubmit} />}
        </main>
      </div>
    </Provider>
  );
}

export default Homepage;
